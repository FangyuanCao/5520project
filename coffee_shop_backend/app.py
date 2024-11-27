from functools import wraps
import secrets
import bcrypt
from flask import Flask, jsonify, render_template
from flask import request
from flask_cors import CORS, cross_origin
import stripe
from db_manager import *
app = Flask(__name__)
app.secret_key = "123"

CORS(app)

fake_product_list=[
    {"id":1, "name":"coffee","type": "beverage", "price":[1,2,3], "options":["S","M","L"], "status":True}, #type can be food or beverage or combo
    {"id":2, "name":"Tea","type": "beverage", "price":[1], "options":["S"], "status":True},
    {"id":3, "name":"cookie","type": "food", "price":[5], "options":["pack"], "status":False},
    {"id":4, "name":"NukaCola","type": "beverage", "price":[1,2,3,5,6], "options":["S","M","L","EXL","ABSL"], "status":True},
    {"id":5, "name":"This_shop","type": "special", "price":[999999], "options":["combo"], "status":True},
    {"id":23, "name":"chocolate","type": "food", "price":[2], "options":["pack"], "status":True},
    {"id":452, "name":"candy","type": "food", "price":[1,2], "options":["small pack","large pack"], "status":True},
    {"id":2168, "name":"chicken wrap","type": "food", "price":[3.14], "options":["unit"], "status":True},
    {"id":500, "name":"car","type": "special", "price":[999999], "options":["unit"], "status":False},
]

DBM = DBManager(Base)
DBM.create_all_tables()

@app.route('/')
def index():
    return 'welcome'

@app.route('/registration', methods = ["POST"])
def handle_registration():
    uid = request.json.get('user_name')
    password = request.json.get('password')
    user_type = request.json.get('user_type')

    if uid and password:
        password = str(password)
        print(f"received registration from {uid} with password {password}")

        if DBM.find_user_by_uid(uid=uid):
            return jsonify({'status':'duplicate user name'})

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        DBM.add_user(uid = uid, password= hashed_password, type=user_type)

        return jsonify({'status':'complete'})
    else:
        return jsonify({'status':'insufficient information'}), 403
    
@app.route('/delete_user', methods = ["POST"])
def handle_delete_user():
    uid = request.json.get('user_name')
    password = request.json.get('password')

    if uid and password:
        password = str(password)
        print(f"delete {uid}")
        user = DBM.find_user_by_uid(uid=uid)
        if user:
            stored_hashed_password = user.password
            if stored_hashed_password and bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password):
                flag = DBM.remove_user(uid=uid)
                # print(flag)
                if flag:
                    return jsonify({'status':'complete'}) 
                else:
                    return jsonify({'status':'deletion fail'}), 401
            else:
                return jsonify({'status':'password incorrect'}), 401
        else:
            return jsonify({'status':'no user'}), 401
    else:
        return jsonify({'status':'insufficient information'}), 403

@app.route("/login", methods=["POST"])
def handle_user_login():
    uid = request.json.get('user_name')
    password = request.json.get('password')

    user_type = request.json.get('user_type')

    print(f"received login request from {uid} with password {password}")

    # authentication process
    # 
    if uid and password:

        password = str(password)
        print(f"login request {uid}")
        user = DBM.find_user_by_uid_and_type(uid=uid,user_type=user_type)
        print(user)
        if user:
            stored_hashed_password = user.password
            if stored_hashed_password and bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password):
                server_auth = secrets.token_urlsafe(16)

                DBM.delete_login_session_uid(uid=uid)
                DBM.add_login_session(token=server_auth,uid=uid)

                return jsonify({'status':'complete','authentication':server_auth,'user_type':user.user_type})
        
    ##########################

    return jsonify({'status':'unauthorized'}), 401 
    

    
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        print(request.headers)
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        if not token:
            return jsonify({'status':'no authorization token!'}), 403
        
        # verify with DB
        uid = DBM.verify_login_session(token)
        # valid_token = 'test_toke_1234'
        if uid:
            pass
        #
        else:
            return jsonify({'status':'authorization token incorrect!'}), 403
        
        return f(uid, *args, **kwargs)
    return decorated

@app.route("/all_customers", methods=["POST"])
def get_all_customers_email():
    users = DBM.find_users_by_type()
    u_emails=[]
    for u in users:
        u_emails.append(u.uid)

    return jsonify({"user_emails":u_emails})

@app.route("/fetch_products", methods=["POST"])
def get_products():
    type = request.json.get('type')
    number = request.json.get('number')

    if not type or type is None:
        return jsonify({'status':'no type specified'}), 400

    if not number or number<0:
        number = 1

    print(f"received fetch product request with product type {type} with number {number}")

    products = DBM.fetch_product_by_type(type)

    product_list=[]
    for p in products:
        product_list.append(
            {
                'id':p.product_id,
                'name':p.product_name,
                'type':p.product_type,
                'price':p.product_prices,
                'options':p.product_options,
                'status':p.product_status,
            }
        )

    # product=[]
    # for item in fake_product_list:
    #     if item['type'] == type:
    #         product.append(item)

    return jsonify({
        "product_list": product_list[:number]
    })
# @app.route("/fetch_product_by_name", methods=["POST"])
# def get_product_by_name():
@app.route("/update_products", methods=["POST"])
def update_products():

    # id = request.json.get('id')
    name = request.json.get('name')
    type = request.json.get('type')
    price = request.json.get('price')
    options = request.json.get('options')
    status = request.json.get('status')

    print(f"received to update a product with product name {name} type {type} price {str(price)} options {str(options)} status {str(status)}")
    update_status = DBM.add_product(product_name=name, product_type=type, product_prices=price, product_options=options,product_status=status)

    
    #perform update based on id

    return jsonify({'status':update_status})

@app.route("/delete_product",methods=["POST"])
def delete_product():
    name = request.json.get('name')

    DBM.delete_product_by_name(name)
    
    return jsonify({'status':'complete'})


@app.route("/customer_purchasing", methods=["POST"])
@token_required
def purchase(uid):

    products = request.json.get('products')  
    # options = request.json.get('options')    
    subtotal = request.json.get('subtotal') 

    q = subtotal*100
    

    if not subtotal:
        return jsonify({'status':'no subtotal'}), 400
    
    print(f"customer {uid} requests to purchase for subtotal of {subtotal}")
    print(f"{products}")
    #execute
    DBM.add_transaction_for_user(uid=uid,product_names=products,subtotal=subtotal,transaction_status=False)

    try:
        checkout_session = stripe.checkout.Session.create(
            api_key='sk_test_51QPpwWDusVrbylQcvRVdYCxPecSQovNUui5sVf3LfrJltNiCPh7BgvpldBiAbKQv8KkVnscm3WV3mb3ulXynb3MN000xaFtJ7P',
            success_url=f"http://localhost:3000/Transfer",
            cancel_url=f"http://localhost:3000/Transfer",
            mode = "payment",
            line_items=[{"price":'price_1QPpxZDusVrbylQcAvyq6PFl',"adjustable_quantity": {"enabled": False, },"quantity":q}], #"minimum": 1, "maximum": 10
            # customer_email=uid,
            metadata={"uid":uid},
            # customer_email=uid,
        )
    except:
        jsonify({'url':'http://localhost:3000/Transfer'})

    return jsonify({'url':checkout_session.url})


@app.route("/all_transactions", methods=["POST"])
@token_required
def all_transactions(uid):
    purchase_hist=DBM.all_transactions()

    PH=[]
    for ph in purchase_hist:
        PH.append(
            {
                'id':ph.id,
                'uid':ph.uid,
                'products':ph.purchase_product,
                # 'options':ph.purchase_options,
                'transaction_status':ph.transaction_status,
                'cooking_process':str(ph.cooking_process),
                'price':ph.price,
            }
        )
    # print(PH)
    return jsonify({'transactions':PH})

@app.route("/update_transaction_cooking_process",methods=['POST'])
@token_required
def update_cooking_progress(uid):
    id = request.json.get('order_id')  
    cooking_progress = request.json.get('cooking_progress')  

    print(id, cooking_progress)
    DBM.update_cooking_process(id , cooking_progress)

    return jsonify({'status':'complete'})

@app.route("/fetch_transaction_for_user",methods=['POST'])
@token_required
def fetch_user_transaction(uid):
    transactions = DBM.transaction_for_user(uid)

    t_list=[]
    for t in transactions:
        t_list.append(
            {
                'id':t.id,
                'uid':t.uid,
                'products':t.purchase_product,
                # 'options':t.purchase_options,
                'transaction_status':t.transaction_status,
                'cooking_process':str(t.cooking_process),
                'price':t.price,
            }
        )
    print(t_list)
    return jsonify({'transactions':t_list}) 

if __name__ == "__main__":
    
    app.run(host='0.0.0.0', port=5000)


    
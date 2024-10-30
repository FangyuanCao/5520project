from functools import wraps
import secrets
from flask import Flask, jsonify, render_template
from flask import request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.secret_key = "123"


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

@app.route('/')
def index():
    return 'welcome'

@app.route('/registration', methods = ["POST"])
def handle_registration():
    uid = request.json.get('user_name')
    password = request.json.get('password')

    if uid and password:
        print(f"received registration from {uid} with password {password}")

        return jsonify({'status':'complete'})
    else:
        return jsonify({'status':'insufficient information'}), 403

@app.route("/login", methods=["POST"])
def handle_user_login():
    uid = request.json.get('user_name')
    password = request.json.get('password')

    print(f"received login request from {uid} with password {password}")

    # authentication process
    # fake process
    if uid and password:
        fetch_password_for_uid = 123
        
        # if autherized
        if password == fetch_password_for_uid:
            server_auth = secrets.token_urlsafe(16)

            return jsonify({'status':'complete','authentication':server_auth})
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
        valid_token = 'test_toke_1234'
        if token == valid_token:
            uid = 'test'
        #
        else:
            return jsonify({'status':'authorization token incorrect!'}), 403
        
        return f(uid, *args, **kwargs)
    return decorated


@app.route("/fetch_products", methods=["POST"])
def get_products():
    type = request.json.get('type')
    number = request.json.get('number')

    if not type or type is None:
        return jsonify({'status':'no type specified'}), 400

    if not number or number<0:
        number = 1

    print(f"received fetch product request with product type {type} with number {number}")

    product=[]
    for item in fake_product_list:
        if item['type'] == type:
            product.append(item)

    return jsonify({
        "product_list": product[:number]
    })

@app.route("/update_products", methods=["POST"])
def update_products():

    id = request.json.get('id')
    name = request.json.get('name')
    type = request.json.get('type')
    price = request.json.get('price')
    options = request.json.get('options')
    status = request.json.get('status')


    print(f"received to update a product with product id {id} name {name} type {type} price {str(price)} options {str(options)} status {str(status)}")


    #perform update based on id

    return jsonify({'status':'complete'})

@app.route("/customer_purchasing", methods=["POST"])
@token_required
def purchase(uid):
    subtotal = request.json.get('subtotal')    

    if not subtotal:
        return jsonify({'status':'no subtotal'}), 400
    
    print(f"customer {uid} requests to purchase for subtotal of {subtotal}")
    #execute

    return jsonify({'url':'test_url'})

if __name__ == "__main__":

    app.run(host='0.0.0.0',port=3000)

    
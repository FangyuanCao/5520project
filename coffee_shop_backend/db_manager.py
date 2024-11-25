import enum
import uuid
# from xmlrpc.client import Boolean
from sqlalchemy import JSON, UUID, Float, create_engine, ForeignKey, Column, String, Integer, CHAR, Boolean, PickleType, Enum
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql.expression import func
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship

Base = declarative_base()

class CookingProcess(enum.Enum):
    ORDER_PLACED = "order_placed"
    ORDER_PREPARING = "order_preparing"
    ORDER_COMPLETE = "order_complete"
    ORDER_DELIVERED = "order_delivered"

class User(Base):
    __tablename__ = "Users"

    uid = Column("uid", String, primary_key=True)
    password = Column("password", String)
    user_type = Column("user_type", String)
    

    def __init__(self, uid, password, type):
        self.uid = uid
        self.password = password
        self.user_type=type
    
    def return_user_info(self):
        return {"uid":self.uid}

    def __repr__(self):
        return str(self.return_user_info())#f"({self.uid}), {self.prefer_model}, {self.msg_id_counter}"
    

# Define the Product model
class Product(Base):
    __tablename__ = 'product'
    
    product_id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    product_name = Column(String(50), nullable=False)
    product_type = Column(String(50), nullable=False)
    product_status = Column(Boolean, default=True)  # True = available, False = not available
    product_prices = Column(JSON, nullable=False)   # List of prices (up to 3 options)
    product_options = Column(JSON, nullable=False)  # List of options (up to 3, like sizes or flavors)

    def __init__(self, product_name,product_type ,product_status, product_prices, product_options):
        # self.product_id =  uuid.
        self.product_name=product_name
        self.product_type=product_type
        self.product_status=product_status
        self.product_prices=product_prices
        self.product_options=product_options

    def __repr__(self):
        return (f"<Product(product_name={self.product_name}, "
                f"product_status={'Available' if self.product_status else 'Not Available'}, "
                f"product_prices={self.product_prices}, product_options={self.product_options})>")


class PurchaseHistory(Base):
    __tablename__ = 'purchase_history'
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    purchase_product = Column(JSON, nullable=False)  # Name of the purchased product
    # purchase_options = Column(JSON, nullable=True)   # Options like size or alternative flavor
    price = Column(Float, nullable=False)                  # Price to be paid
    transaction_status = Column(Boolean, default=False)    # Payment received or not
    cooking_process = Column(Enum(CookingProcess), default=CookingProcess.ORDER_PLACED)  # Cooking process stage
    uid = Column(String, ForeignKey('Users.uid'), nullable=False)  # Foreign key to user

    # Relationship to User
    # user = relationship("Users", back_populates="purchases")
    def __init__(self,purchase_product,price,uid,transaction_status):
        self.purchase_product=purchase_product
        # self.purchase_options=purchase_options
        self.price=price
        self.uid = uid
        self.transaction_status=transaction_status


    def __repr__(self):
        return (f"<PurchaseHistory(purchase_product={self.purchase_product}, "
                # f"purchase_options={self.purchase_options}, ""
                f"price={self.price}, "
                f"transaction_status={'Received' if self.transaction_status else 'Pending'}, "
                f"cooking_process={self.cooking_process}, uid={self.uid})>")
    
class LoginSession(Base):
    __tablename__ = 'login_session'
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    session_token = Column(String, nullable=False)
    uid = Column(String, ForeignKey('Users.uid'), nullable=False)  # Foreign key to user

    def __init__(self, session_token, uid):
        self.session_token=session_token
        self.uid=uid

    def __repr__(self):
        return f"<LoginSession(session_token={self.session_token})>"
    
class DBManager():
    def __init__(self, base, addr="sqlite:///serverdb.db") -> None:
        self.Base = base #declarative_base()
        self.engine = create_engine(addr,echo=False) #echo=True
        # self.Base.metadata.create_all(bind=self.engine)
        self.Session = sessionmaker(bind=self.engine)
        
    def create_all_tables(self):
        self.Base.metadata.create_all(bind=self.engine)
    
    def add_user(self, uid, password, type='customer'):
        try:
            session = self.Session()
        
            session.add(User(uid, password, type))
            session.commit()
            session.close()
            print('successfully added')
            return True
        except:
            print('there has same uid')
            return False
    
    def remove_user(self, uid):
        flag=False
        session = self.Session()
        try:
            user = self.find_user_by_uid(uid)
            print(user)
            if user:
                session.delete(user)
                session.commit()
                flag = True

        except:
            session.rollback()
        finally:
            session.close()
        
        return flag

    def find_user_by_uid(self, uid): #'admin'
        
        session = self.Session()
        
        user = session.query(User).filter(User.uid==uid).first()

        session.close()
        return user
    
    def find_users_by_type(self, type='customer'):
        session = self.Session()

        users = session.query(User).filter(User.user_type == type).all()

        session.close()
        return users
    
    def find_user_by_uid_and_type(self, uid, user_type='customer'): #'admin'
        
        session = self.Session()
        
        user = session.query(User).filter((User.uid==uid) & (User.user_type==user_type)).first()

        session.close()
        return user
    
    def add_login_session(self, token,uid):
        session = self.Session()
        session.add(LoginSession(session_token=token,uid=uid))
        session.commit()
        session.close()
    
    def delete_login_session(self, token):
        session = self.Session()
        loginsession = session.query(LoginSession).filter(LoginSession.session_token==token).first()
        if loginsession:
            session.delete(loginsession)
        session.commit()
        session.close()
    def delete_login_session_uid(self, uid):
        session = self.Session()
        loginsession = session.query(LoginSession).filter(LoginSession.uid==uid).first()
        if loginsession:
            session.delete(loginsession)
        session.commit()
        session.close()
    def verify_login_session(self,token):
        session = self.Session()
        loginsession = session.query(LoginSession).filter(LoginSession.session_token==token).first()
        session.close()
        if loginsession:
            return loginsession.uid
        else:
            return None

    def add_product(self, product_name, product_type, product_prices, product_options, product_status = True):
        # product_id = Column(Integer, primary_key=True, autoincrement=True)
        # product_name = Column(String(50), nullable=False)
        # product_status = Column(Boolean, default=True)  # True = available, False = not available
        # product_prices = Column(JSON, nullable=False)   # List of prices (up to 3 options)
        # product_options
        session = self.Session()
        try:
            
            session.add(Product( product_name, product_type, product_status, product_prices, product_options))
            session.commit()
            session.close()
            print('successfully added')
            return True
        except:
            session.rollback()
            return False
    def fetch_product_by_type(self, type):
        session = self.Session()

        products = session.query(Product).filter(Product.product_type == type).all()

        session.close()
        return products
    
    
    def fetch_product_by_name(self, name):

        session = self.Session()
        products = session.query(Product).filter(Product.product_name == name).all()

        session.close()
        return products
    def delete_product_by_name(self, name):
        session = self.Session()
        product = session.query(Product).filter(Product.product_name == name).first()
        if product:
            session.delete(product)

        session.commit()
        session.close()
        pass
    # def update_product_by_name(self, name, product_status):
    #     pass

    def add_transaction_for_user(self, uid, product_names, subtotal, transaction_status):
        session = self.Session()

        user = session.query(User).filter(User.uid==uid).first()

        session.add(PurchaseHistory(
            purchase_product=product_names,
            # purchase_options=purchase_options,
            price=subtotal,
            uid = uid,#user.uid,
            transaction_status=transaction_status
        ))
        session.commit()
        session.close()


        pass

    def all_transactions(self):
        session = self.Session()
        ph = session.query(PurchaseHistory).all()
        session.close()

        return ph
    
    def transaction_for_user(self,uid):
        session = self.Session()
        ph = session.query(PurchaseHistory).filter(PurchaseHistory.uid==uid).all()
        session.close()

        return ph
    
    def update_transaction(self, history_id, status):
        session = self.Session()
        session.query(PurchaseHistory).filter(PurchaseHistory.id==history_id).update({"transaction_status":status})
        session.commit()
        session.close()

    def update_cooking_process(self, history_id, cooking_process):
        session = self.Session()
        session.query(PurchaseHistory).filter(PurchaseHistory.id==history_id).update({"cooking_process":cooking_process})
        session.commit()
        session.close()


# DBM = DBManager(base=Base)
# DBM.add_user(uid='abc@a.cn',password='123',type='customer')



# session = DBM.Session()
# users= session.query(User).all()
# session.close()
# print(users[0].user_type)

# uu=DBM.find_user_by_uid_and_type(uid='abc@a.cn', user_type='customer')
# print(uu)


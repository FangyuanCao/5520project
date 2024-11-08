import enum
import uuid
# from xmlrpc.client import Boolean
from sqlalchemy import JSON, Float, create_engine, ForeignKey, Column, String, Integer, CHAR, Boolean, PickleType, Enum
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
        self.type=type
    
    def return_user_info(self):
        return {"uid":self.uid}

    def __repr__(self):
        return str(self.return_user_info())#f"({self.uid}), {self.prefer_model}, {self.msg_id_counter}"
    

# Define the Product model
class Product(Base):
    __tablename__ = 'product'
    
    product_id = Column(String, primary_key=True, default=str(uuid.uuid4))
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
    
    id = Column(Integer, primary_key=True)
    purchase_product = Column(String(50), nullable=False)  # Name of the purchased product
    purchase_options = Column(String(50), nullable=True)   # Options like size or alternative flavor
    price = Column(Float, nullable=False)                  # Price to be paid
    transaction_status = Column(Boolean, default=False)    # Payment received or not
    cooking_process = Column(Enum(CookingProcess), default=CookingProcess.ORDER_PLACED)  # Cooking process stage
    uid = Column(Integer, ForeignKey('Users.uid'), nullable=False)  # Foreign key to user

    # Relationship to User
    # user = relationship("Users", back_populates="purchases")

    def __repr__(self):
        return (f"<PurchaseHistory(purchase_product={self.purchase_product}, "
                f"purchase_options={self.purchase_options}, price={self.price}, "
                f"transaction_status={'Received' if self.transaction_status else 'Pending'}, "
                f"cooking_process={self.cooking_process}, uid={self.uid})>")

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
    
    def update_product_by_name(self, name, product_status):
        pass
# DBM = DBManager(base=Base)
# session = DBM.Session()
# users= session.query(User).all()
# session.close()

# print(users)
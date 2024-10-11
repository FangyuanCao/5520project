import sqlalchemy
from sqlalchemy import ext 
# from User import Account,Column,String # type: ignore
sqlalchemy.__version__ 
from sqlalchemy import Column,String,Integer,create_engine
from sqlalchemy.orm import sessionmaker,declarative_base

base = declarative_base()
class User(base):
    __tablename__= "users"

    uid = Column('uid' , String, primary_key=True)
    Password = Column('password' , String)
    def __init__(self, uid, Password):
        self.uid=uid
        self.Password=Password

class Shop(base):
    __tablename__= "franchise"

    fid = Column('fid' , String, primary_key=True)
    sell = Column('sell' , Integer)
    def __init__(self, fid, sell):
        self.fid = fid
        self.sell= sell

engine = create_engine('sqlite:///coff.db')
session1 = sessionmaker(bind=engine)
base.metadata.create_all(bind=engine)
new_user = User(uid = 'john2', Password = 123)
'''session=session1 ()
session.add(new_user)
session.commit()
session.close()'''

session = session1()
users = session.query(User).filter(User.uid == 'john2').all()
session.close()
print(users[0].uid,users[0].Password)



session = session1()
for i in range(5):
    new_franchise = Shop(fid = f'tim{i+3}', sell= 40000+i*4)
    session.add(new_franchise)
session.commit()
session.close()

session = session1()
franchise_info = session.query(Shop).all()
session.close()
for item in franchise_info:
    print(item.fid, item.sell)

#
'''
tablename: product
product_id : primary
product_name: string
product_status:True or False (available or not)
product_prices: 3 possible options, 3 prices
product_options: max 3 size options or 3 max altnertive flavors
'''

'''
tablename: purchase_history
id: primary key
purchase_product: product name user purchased
purchase_options: size, or available altnerative
price: how many user should pay
transaction_status: if payment is received. True/ False
cooking_process: order_placed, order_preparing, order_complete, order_delivered. 
uid: forign key
'''
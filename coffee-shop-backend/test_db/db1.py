import sqlalchemy
from sqlalchemy import ext 
from sqlalchemy import Column,String,Integer,create_engine
from sqlalchemy.orm import sessionmaker,declarative_base


base = declarative_base()
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
new_franchise = Shop(fid = 'tim2', sell= 40000)
new_franchise1 = Shop(fid = 'ontario', sell= 50000)


session=session1 ()
session.commit()
session.close()

session = session1()
franchise_info = session.query(Shop).all()
session.close()
def safe_run():
    try:
        session = session1()
        session.add(new_franchise1)
        session.commit()
        session.close()
        # print(item.fid, item.sell)
        return True

    
    except:
        print("there has same fid")
        return False
    
result = safe_run()
print(result)
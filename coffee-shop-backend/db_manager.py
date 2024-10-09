import uuid
# from xmlrpc.client import Boolean
from sqlalchemy import create_engine, ForeignKey, Column, String, Integer, CHAR, Boolean, PickleType
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql.expression import func
from sqlalchemy.dialects.postgresql import ARRAY

Base = declarative_base()


class User(Base):
    __tablename__ = "Users"

    uid = Column("uid", String, primary_key=True)
    password = Column("password", String)
    

    def __init__(self, uid, password):
        self.uid = uid
        self.password = password
        
    
    def return_user_info(self):
        return {"uid":self.uid}

    def __repr__(self):
        return str(self.return_user_info())#f"({self.uid}), {self.prefer_model}, {self.msg_id_counter}"
    
    
class DBManager():
    def __init__(self, base, addr="sqlite:///serverdb.db") -> None:
        self.Base = base #declarative_base()
        self.engine = create_engine(addr,echo=False) #echo=True
        # self.Base.metadata.create_all(bind=self.engine)
        self.Session = sessionmaker(bind=self.engine)
        
    def create_all_tables(self):
        self.Base.metadata.create_all(bind=self.engine)

    def add_user(self, uid, password):

        session = self.Session()
    
        session.add(User(uid, password))
        session.commit()

        session.close()
    def find_user_by_uid(self, uid):
        
        session = self.Session()
        
        user = session.query(User).filter(User.uid==uid).all()

        session.close()
        return user

from flask_security import SQLAlchemyUserDatastore
from flask_security.utils import hash_password
from application.extensions import db



def create_admin(user_datastore : SQLAlchemyUserDatastore):
    user_datastore.find_or_create_role(name="admin",description="Administrator")
    user_datastore.find_or_create_role(name='user',description="User")

    #creating data
    if not user_datastore.find_user(email="admin@gmail.com"):
        user_datastore.create_user(name="admin",email="admin@gmail.com",password=hash_password('admin'),active=True,roles=['admin'],usertype='admin')
  
    db.session.commit()
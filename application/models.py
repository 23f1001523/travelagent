from flask_security import UserMixin,RoleMixin
from flask_security.models import fsqla_v3 as fsq
from application.extensions import db,security
from datetime import datetime


class User(db.Model,UserMixin):
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    name=db.Column(db.String,nullable=False)
    email=db.Column(db.String, nullable=False,unique=True)
    password=db.Column(db.String,nullable=False)
    active=db.Column(db.Boolean)
    fs_uniquifier=db.Column(db.String(),nullable=False)
    roles=db.relationship('Role',secondary='user_roles')
    usertype=db.Column(db.String,nullable=False)
    # preferences=db.relationship('Preference',secondary='user_preferences')
    # profiles=db.relationship('UserProfile', uselist=False,backref='user')
    created_at=db.Column(db.DateTime,default=datetime.now())
    

class Role(db.Model,RoleMixin):
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    name=db.Column(db.String(80), nullable=False,unique=True)
    description=db.Column(db.String)

class UserRoles(db.Model):
    __tablename__='user_roles'
    id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'))
    role_id=db.Column(db.Integer, db.ForeignKey('role.id'))
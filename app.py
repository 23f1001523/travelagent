from flask import Flask,render_template,request,jsonify
from application.extensions import db,security,cache
from flask_sqlalchemy import SQLAlchemy
from application.config import LocalDevelopmentConfig
from flask_cors import CORS
from application import views
from application.createdata import create_admin
from application.models import User,Role
from flask_security import SQLAlchemyUserDatastore


def create_app():
    app=Flask(__name__)
    app.config.from_object(LocalDevelopmentConfig)
    cache.init_app(app)
    db.init_app(app)
  
    with app.app_context():
        db.create_all()
        user_datastore=SQLAlchemyUserDatastore(db,User,Role)

        security.init_app(app,user_datastore)
        create_admin(user_datastore)
       
    CORS(app,supports_credentials=True)
    views.create_view(app,user_datastore,cache)

    return app

app=create_app()

@app.route('/')
def home():
    return render_template('index.html')


if __name__=='__main__':
    app.run(debug=True)
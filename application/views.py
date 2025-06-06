
from flask import jsonify,request,render_template
import re,csv
from flask_security import auth_token_required, auth_required,current_user,roles_required,roles_accepted,SQLAlchemyUserDatastore,logout_user
from flask_security.utils import hash_password,verify_password
from flask_login import login_user

from application.models import User
from application.extensions import db

from application.agent import generate_trip_plan


def create_view(app,user_datastore:SQLAlchemyUserDatastore,cache):
    
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def index(path):
        return render_template('index.html')

    @app.route('/plantour', methods=['POST'])
    def plan_trip():
        data = request.json
        source = data.get('source')
        destination = data.get('destination')
        preferences = data.get('preferences')

        try:
            plan = generate_trip_plan(source, destination, preferences)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

        return jsonify({
            'source': source,
            'destination': destination,
            'preferences': preferences,
            'plan': plan
        })
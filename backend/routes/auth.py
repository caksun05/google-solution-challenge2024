# backend/routes/auth.py
from flask import Blueprint, request, jsonify
from app import bcrypt, db
from backend.models import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully!'})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({'message': 'User logged in successfully!'})
    else:
        return jsonify({'message': 'Invalid username or password!'})

@auth_bp.route('/logout', methods=['POST'])
def logout():
    return jsonify({'message': 'User logged out successfully!'})

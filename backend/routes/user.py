# backend/routes/user.py
from flask import Blueprint, jsonify
from app import bcrypt, db
from backend.models import User, db

user_bp = Blueprint('user', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_data = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]
    return jsonify({'users': users_data})


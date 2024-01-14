# backend/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config.from_object('backend.config.Config')
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

from backend.routes.auth import auth_bp
from backend.routes.user import user_bp

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(user_bp, url_prefix='/user')

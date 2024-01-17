# app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__, template_folder='templates')
app.config.from_object('backend.config.Config')
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Blueprints
from backend.routes.auth import auth_bp
from backend.routes.user import user_bp
from backend.routes.admin import admin_bp

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(admin_bp, url_prefix='/admin')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

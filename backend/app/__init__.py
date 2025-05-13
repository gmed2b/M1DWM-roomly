from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Charger les variables d'environnement
load_dotenv()

# Initialiser l'ORM
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev_key')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///roomly.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialiser CORS
    CORS(app)
    
    # Initialiser les extensions
    db.init_app(app)
    
    # Enregistrer les blueprints
    from app.api.rooms import rooms_bp
    from app.api.bookings import bookings_bp
    from app.api.auth import auth_bp
    
    app.register_blueprint(rooms_bp, url_prefix='/api/rooms')
    app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    # Créer les tables de la base de données
    with app.app_context():
        db.create_all()
    
    return app
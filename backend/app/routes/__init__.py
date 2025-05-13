from flask import Flask
from app.routes.auth import auth_bp
from app.routes.rooms import rooms_bp
from app.routes.bookings import bookings_bp

def register_blueprints(app: Flask):
    """Enregistre tous les blueprints de l'application."""
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(rooms_bp, url_prefix='/api/rooms')
    app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
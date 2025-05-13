from app import db
from sqlalchemy.dialects.postgresql import JSON
import uuid

class Room(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    short_description = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # Premium, Standard, Haut de Gamme
    type = db.Column(db.String(50), nullable=False)  # Petite, Moyenne, Grande, etc.
    capacity_min = db.Column(db.Integer, nullable=False)
    capacity_max = db.Column(db.Integer, nullable=False)
    capacity_optimal = db.Column(db.Integer, nullable=False)
    size = db.Column(db.Float, nullable=False)  # in square meters
    price_per_hour = db.Column(db.Float, nullable=False)
    price_per_day = db.Column(db.Float, nullable=False)
    location_address = db.Column(db.String(200), nullable=False)
    location_city = db.Column(db.String(100), nullable=False)
    location_postal_code = db.Column(db.String(20), nullable=False)
    location_country = db.Column(db.String(100), nullable=False)
    location_lat = db.Column(db.Float, nullable=False)
    location_lng = db.Column(db.Float, nullable=False)
    amenities = db.Column(JSON, nullable=False, default=list)
    services = db.Column(JSON, nullable=False, default=list)
    images = db.Column(JSON, nullable=False, default=list)
    availability_confirmation_required = db.Column(db.Boolean, default=False)
    rating = db.Column(db.Float, nullable=True)
    reviews = db.Column(db.Integer, nullable=True)
    
    # Relations
    bookings = db.relationship('Booking', backref='room', lazy=True)
from flask import Blueprint, jsonify, request, abort
from app.models.room import Room
from app.schemas.room import RoomResponse, RoomCreate
from app import db
from pydantic import ValidationError
from sqlalchemy.exc import IntegrityError

rooms_bp = Blueprint('rooms', __name__)

@rooms_bp.route('/', methods=['GET'])
def get_all_rooms():
    """Récupérer toutes les salles."""
    rooms = Room.query.all()
    result = []
    
    for room in rooms:
        # Convertir chaque salle au format attendu par le frontend
        room_data = {
            "id": room.id,
            "name": room.name,
            "slug": room.slug,
            "description": room.description,
            "shortDescription": room.short_description,
            "category": room.category,
            "type": room.type,
            "capacity": {
                "min": room.capacity_min,
                "max": room.capacity_max,
                "optimal": room.capacity_optimal
            },
            "size": room.size,
            "pricePerHour": room.price_per_hour,
            "pricePerDay": room.price_per_day,
            "location": {
                "address": room.location_address,
                "city": room.location_city,
                "postalCode": room.location_postal_code,
                "country": room.location_country,
                "coordinates": {
                    "lat": room.location_lat,
                    "lng": room.location_lng
                }
            },
            "amenities": room.amenities,
            "services": room.services,
            "images": room.images,
            "availabilityConfirmationRequired": room.availability_confirmation_required,
            "rating": room.rating,
            "reviews": room.reviews
        }
        result.append(room_data)
    
    return jsonify(result)

@rooms_bp.route('/<slug>', methods=['GET'])
def get_room_by_slug(slug):
    """Récupérer une salle par son slug."""
    room = Room.query.filter_by(slug=slug).first_or_404()
    
    # Convertir la salle au format attendu par le frontend
    room_data = {
        "id": room.id,
        "name": room.name,
        "slug": room.slug,
        "description": room.description,
        "shortDescription": room.short_description,
        "category": room.category,
        "type": room.type,
        "capacity": {
            "min": room.capacity_min,
            "max": room.capacity_max,
            "optimal": room.capacity_optimal
        },
        "size": room.size,
        "pricePerHour": room.price_per_hour,
        "pricePerDay": room.price_per_day,
        "location": {
            "address": room.location_address,
            "city": room.location_city,
            "postalCode": room.location_postal_code,
            "country": room.location_country,
            "coordinates": {
                "lat": room.location_lat,
                "lng": room.location_lng
            }
        },
        "amenities": room.amenities,
        "services": room.services,
        "images": room.images,
        "availabilityConfirmationRequired": room.availability_confirmation_required,
        "rating": room.rating,
        "reviews": room.reviews
    }
    
    return jsonify(room_data)

@rooms_bp.route('/', methods=['POST'])
def create_room():
    """Créer une nouvelle salle."""
    try:
        data = request.json
        room_data = RoomCreate(**data)
        
        new_room = Room(
            name=room_data.name,
            slug=room_data.slug,
            description=room_data.description,
            short_description=room_data.shortDescription,
            category=room_data.category,
            type=room_data.type,
            capacity_min=room_data.capacity.min,
            capacity_max=room_data.capacity.max,
            capacity_optimal=room_data.capacity.optimal,
            size=room_data.size,
            price_per_hour=room_data.pricePerHour,
            price_per_day=room_data.pricePerDay,
            location_address=room_data.location.address,
            location_city=room_data.location.city,
            location_postal_code=room_data.location.postalCode,
            location_country=room_data.location.country,
            location_lat=room_data.location.coordinates['lat'],
            location_lng=room_data.location.coordinates['lng'],
            amenities=[amenity.dict() for amenity in room_data.amenities],
            services=[service.dict() for service in room_data.services],
            images=[image.dict() for image in room_data.images],
            availability_confirmation_required=room_data.availabilityConfirmationRequired,
            rating=room_data.rating,
            reviews=room_data.reviews
        )
        
        db.session.add(new_room)
        db.session.commit()
        
        return jsonify({"id": new_room.id, "message": "Salle créée avec succès"}), 201
        
    except ValidationError as e:
        return jsonify({"error": "Données invalides", "details": str(e)}), 400
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Une salle avec ce slug existe déjà"}), 400
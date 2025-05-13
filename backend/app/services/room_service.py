from app.models.room import Room
from app.schemas.room import RoomCreate
from app import db
from sqlalchemy.exc import IntegrityError


class RoomService:
    @staticmethod
    def get_all_rooms():
        """Récupère toutes les salles et les formate pour le frontend."""
        rooms = Room.query.all()
        result = []
        
        for room in rooms:
            result.append(RoomService._format_room_data(room))
        
        return result
    
    @staticmethod
    def get_room_by_slug(slug):
        """Récupère une salle par son slug et la formate pour le frontend."""
        room = Room.query.filter_by(slug=slug).first_or_404()
        return RoomService._format_room_data(room)
    
    @staticmethod
    def create_room(room_data: RoomCreate):
        """Crée une nouvelle salle."""
        try:
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
            
            return {"id": new_room.id, "message": "Salle créée avec succès"}, 201
            
        except IntegrityError:
            db.session.rollback()
            return {"error": "Une salle avec ce slug existe déjà"}, 400
    
    @staticmethod
    def _format_room_data(room):
        """Formate les données d'une salle pour le frontend."""
        return {
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
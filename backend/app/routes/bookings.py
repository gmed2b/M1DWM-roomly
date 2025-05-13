from flask import Blueprint, jsonify, request
from app.schemas.booking import BookingCreate
from app.services.booking_service import BookingService
from pydantic import ValidationError

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/', methods=['POST'])
def create_booking():
    """Créer une nouvelle réservation."""
    try:
        data = request.json
        booking_data = BookingCreate(**data)
        
        response, status_code = BookingService.create_booking(booking_data)
        return jsonify(response), status_code
    
    except ValidationError as e:
        return jsonify({"error": "Données invalides", "details": str(e)}), 400
    
@bookings_bp.route('/user/<user_id>', methods=['GET'])
def get_user_bookings(user_id):
    """Récupérer toutes les réservations d'un utilisateur."""
    bookings = BookingService.get_user_bookings(user_id)
    return jsonify(bookings)
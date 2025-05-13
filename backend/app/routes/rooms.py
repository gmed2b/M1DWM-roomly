from flask import Blueprint, jsonify, request
from app.schemas.room import RoomCreate
from app.services.room_service import RoomService
from pydantic import ValidationError

rooms_bp = Blueprint('rooms', __name__)

@rooms_bp.route('', methods=['GET'])
def get_all_rooms():
    """Récupérer toutes les salles."""
    rooms = RoomService.get_all_rooms()
    return jsonify(rooms)

@rooms_bp.route('/<slug>', methods=['GET'])
def get_room_by_slug(slug):
    """Récupérer une salle par son slug."""
    room = RoomService.get_room_by_slug(slug)
    return jsonify(room)

@rooms_bp.route('', methods=['POST'])
def create_room():
    """Créer une nouvelle salle."""
    try:
        data = request.json
        room_data = RoomCreate(**data)
        
        response, status_code = RoomService.create_room(room_data)
        return jsonify(response), status_code
        
    except ValidationError as e:
        return jsonify({"error": "Données invalides", "details": str(e)}), 400
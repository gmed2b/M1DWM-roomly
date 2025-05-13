from flask import Blueprint, request, jsonify
from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import AuthService
from pydantic import ValidationError

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Enregistrer un nouvel utilisateur."""
    try:
        data = request.json
        user_data = UserCreate(**data)
        
        response, status_code = AuthService.register_user(user_data)
        return jsonify(response), status_code
    
    except ValidationError as e:
        return jsonify({"error": "Données invalides", "details": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Erreur serveur", "details": str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Connecter un utilisateur et générer un token."""
    try:
        data = request.json
        user_data = UserLogin(**data)
        
        response, status_code = AuthService.login_user(user_data)
        return jsonify(response), status_code
    
    except ValidationError as e:
        return jsonify({"error": "Données invalides", "details": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Erreur serveur", "details": str(e)}), 500
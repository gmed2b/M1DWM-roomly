from flask import Blueprint, request, jsonify
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app import db
import jwt
import datetime
import os
from pydantic import ValidationError

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Enregistrer un nouvel utilisateur."""
    try:
        data = request.json
        user_data = UserCreate(**data)
        
        # Vérifier si l'email existe déjà
        if User.query.filter_by(email=user_data.email).first():
            return jsonify({'error': 'Cet email est déjà utilisé'}), 400
        
        # Créer un nouvel utilisateur
        user = User(
            email=user_data.email,
            first_name=user_data.first_name,
            last_name=user_data.last_name
        )
        user.set_password(user_data.password)
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify({'message': 'Compte créé avec succès'}), 201
    
    except ValidationError as e:
        return jsonify({"error": "Données invalides", "details": str(e)}), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    """Connecter un utilisateur et générer un token."""
    try:
        data = request.json
        user_data = UserLogin(**data)
        
        # Trouver l'utilisateur par email
        user = User.query.filter_by(email=user_data.email).first()
        
        # Vérifier que l'utilisateur existe et que le mot de passe est correct
        if not user or not user.check_password(user_data.password):
            return jsonify({'error': 'Email ou mot de passe incorrect'}), 401
        
        # Générer un token JWT
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, os.getenv('SECRET_KEY', 'dev_key'), algorithm='HS256')
        
        return jsonify({
            'token': token,
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            }
        })
    
    except ValidationError as e:
        return jsonify({"error": "Données invalides", "details": str(e)}), 400
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app import db
import jwt
import datetime
import os


class AuthService:
    @staticmethod
    def register_user(user_data):
        """Enregistre un nouvel utilisateur dans la base de données."""
        # Vérifier si l'email existe déjà
        if User.query.filter_by(email=user_data.email).first():
            return {'error': 'Cet email est déjà utilisé'}, 400
        
        # Créer un nouvel utilisateur
        user = User(
            email=user_data.email,
            first_name=user_data.first_name,
            last_name=user_data.last_name
        )
        user.set_password(user_data.password)
        
        db.session.add(user)
        db.session.commit()
        
        return {'message': 'Compte créé avec succès'}, 201
    
    @staticmethod
    def login_user(user_data):
        """Authentifie un utilisateur et génère un token JWT."""
        # Trouver l'utilisateur par email
        user = User.query.filter_by(email=user_data.email).first()
        
        # Vérifier que l'utilisateur existe et que le mot de passe est correct
        if not user or not user.check_password(user_data.password):
            return {'error': 'Email ou mot de passe incorrect'}, 401
        
        # Générer un token JWT
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, os.getenv('SECRET_KEY', 'dev_key'), algorithm='HS256')
        
        # Si le token est un objet bytes (dépend de la version de PyJWT), le convertir en string
        if isinstance(token, bytes):
            token = token.decode('utf-8')
            
        return {
            'token': token,
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            }
        }, 200
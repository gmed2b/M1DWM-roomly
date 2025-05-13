import unittest
from unittest.mock import patch, MagicMock
from app import create_app, db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import AuthService
import os
import uuid


class TestAuthService(unittest.TestCase):
    """Tests unitaires pour le service d'authentification."""

    def setUp(self):
        """Initialiser l'environnement de test."""
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        
        # Générer un email unique pour chaque test
        self.test_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        
        # Créer un utilisateur de test
        self.test_user = User(
            email=self.test_email,
            first_name="Test",
            last_name="User"
        )
        self.test_user.set_password("password123")
        db.session.add(self.test_user)
        db.session.commit()
        
        # Créer des objets de schéma pour les tests
        self.valid_register_data = UserCreate(
            email=f"new_{uuid.uuid4().hex[:8]}@example.com",
            password="newpassword",
            first_name="New",
            last_name="User"
        )
        
        self.existing_email_data = UserCreate(
            email=self.test_email,  # Email déjà existant
            password="password123",
            first_name="Existing",
            last_name="User"
        )
        
        self.valid_login_data = UserLogin(
            email=self.test_email,
            password="password123"
        )
        
        self.invalid_login_data = UserLogin(
            email=self.test_email,
            password="wrongpassword"
        )
    
    def tearDown(self):
        """Nettoyer l'environnement après les tests."""
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
    
    def test_register_user_success(self):
        """Test d'enregistrement d'un nouvel utilisateur avec succès."""
        response, status_code = AuthService.register_user(self.valid_register_data)
        
        # Vérifier la réponse
        self.assertEqual(status_code, 201)
        self.assertEqual(response, {'message': 'Compte créé avec succès'})
        
        # Vérifier que l'utilisateur a été créé dans la base de données
        user = User.query.filter_by(email=self.valid_register_data.email).first()
        self.assertIsNotNone(user)
        self.assertEqual(user.email, self.valid_register_data.email)
        self.assertEqual(user.first_name, "New")
        self.assertEqual(user.last_name, "User")
        self.assertTrue(user.check_password("newpassword"))
    
    def test_register_user_existing_email(self):
        """Test d'enregistrement avec un email déjà existant."""
        response, status_code = AuthService.register_user(self.existing_email_data)
        
        # Vérifier la réponse d'erreur
        self.assertEqual(status_code, 400)
        self.assertEqual(response, {'error': 'Cet email est déjà utilisé'})
        
        # Vérifier qu'un nouvel utilisateur n'a pas été créé
        users_count = User.query.count()
        self.assertEqual(users_count, 1)  # Toujours seulement l'utilisateur de test
    
    @patch('app.services.auth_service.jwt.encode')
    def test_login_user_success(self, mock_jwt_encode):
        """Test de connexion avec des identifiants valides."""
        # Configurer le mock pour jwt.encode
        mock_jwt_encode.return_value = "fake_token"
        
        response, status_code = AuthService.login_user(self.valid_login_data)
        
        # Vérifier la réponse
        self.assertEqual(status_code, 200)
        self.assertIn('token', response)
        self.assertEqual(response['token'], "fake_token")
        self.assertIn('user', response)
        self.assertEqual(response['user']['email'], self.test_email)
        
        # Vérifier que jwt.encode a été appelé avec les bons arguments
        mock_jwt_encode.assert_called_once()
        args, kwargs = mock_jwt_encode.call_args
        self.assertIn('user_id', args[0])
        self.assertIn('exp', args[0])
        self.assertEqual(kwargs['algorithm'], 'HS256')
    
    def test_login_user_invalid_password(self):
        """Test de connexion avec un mot de passe invalide."""
        response, status_code = AuthService.login_user(self.invalid_login_data)
        
        # Vérifier la réponse d'erreur
        self.assertEqual(status_code, 401)
        self.assertEqual(response, {'error': 'Email ou mot de passe incorrect'})
    
    def test_login_user_nonexistent_email(self):
        """Test de connexion avec un email qui n'existe pas."""
        nonexistent_login = UserLogin(
            email=f"nonexistent_{uuid.uuid4().hex[:8]}@example.com",
            password="password123"
        )
        
        response, status_code = AuthService.login_user(nonexistent_login)
        
        # Vérifier la réponse d'erreur
        self.assertEqual(status_code, 401)
        self.assertEqual(response, {'error': 'Email ou mot de passe incorrect'})


if __name__ == '__main__':
    unittest.main()
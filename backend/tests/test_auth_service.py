import pytest
from unittest.mock import patch, MagicMock
from app.services.auth_service import AuthService
from app.schemas.user import UserCreate, UserLogin
from app.models.user import User

# Setup de données utilisateur
@pytest.fixture
def user_data_create():
    return UserCreate(
        email="test@example.com",
        password="password123",
        first_name="John",
        last_name="Doe"
    )

@pytest.fixture
def user_data_login():
    return UserLogin(
        email="test@example.com",
        password="password123"
    )


# Test: email déjà utilisé
@patch('app.services.auth_service.User')
def test_register_user_email_exists(mock_user_class, user_data_create):
    mock_user_class.query.filter_by.return_value.first.return_value = True

    response, status = AuthService.register_user(user_data_create)
    
    assert status == 400
    assert response['error'] == 'Cet email est déjà utilisé'


# Test: création d'un utilisateur avec succès
@patch('app.services.auth_service.db')
@patch('app.services.auth_service.User')
def test_register_user_success(mock_user_class, mock_db, user_data_create):
    mock_user_instance = MagicMock()
    mock_user_class.return_value = mock_user_instance
    mock_user_class.query.filter_by.return_value.first.return_value = None

    response, status = AuthService.register_user(user_data_create)

    assert status == 201
    assert response['message'] == 'Compte créé avec succès'
    mock_db.session.add.assert_called_once()
    mock_db.session.commit.assert_called_once()
    mock_user_instance.set_password.assert_called_once_with(user_data_create.password)


# Test: connexion avec mauvais mot de passe
@patch('app.services.auth_service.User')
def test_login_user_wrong_credentials(mock_user_class, user_data_login):
    user_mock = MagicMock()
    user_mock.check_password.return_value = False
    mock_user_class.query.filter_by.return_value.first.return_value = user_mock

    response, status = AuthService.login_user(user_data_login)

    assert status == 401
    assert response['error'] == 'Email ou mot de passe incorrect'


# Test: connexion avec succès
@patch('app.services.auth_service.jwt.encode', return_value='fake.jwt.token')
@patch('app.services.auth_service.os.getenv', return_value='secret_key')
@patch('app.services.auth_service.User')
def test_login_user_success(mock_user_class, mock_getenv, mock_jwt, user_data_login):
    user_mock = MagicMock()
    user_mock.id = 1
    user_mock.email = "test@example.com"
    user_mock.first_name = "John"
    user_mock.last_name = "Doe"
    user_mock.check_password.return_value = True
    mock_user_class.query.filter_by.return_value.first.return_value = user_mock

    response, status = AuthService.login_user(user_data_login)

    assert status == 200
    assert response['token'] == 'fake.jwt.token'
    assert response['user']['email'] == user_mock.email
    assert response['user']['first_name'] == user_mock.first_name
    assert response['user']['id'] == user_mock.id

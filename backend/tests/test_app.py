import pytest
from app import create_app
import os


@pytest.fixture
def client():
    """Create a test client for the app."""
    app = create_app()
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_root_endpoint_development(client):
    """Test the / endpoint in development environment."""
    # Set environment to development
    os.environ["FLASK_ENV"] = "development"

    response = client.get("/api/hello")
    assert response.status_code == 200

    data = response.get_json()
    assert data["message"] == "Hello from Local Development!"
    assert data["environment"] == "development"
    assert data["url"] == "http://127.0.0.1:8080"


def test_hello_endpoint_production(client):
    """Test the /api/hello endpoint in production environment."""
    # Set environment to production
    os.environ["FLASK_ENV"] = "production"

    response = client.get("/api/hello")
    assert response.status_code == 200

    data = response.get_json()
    assert data["message"] == "Hello from Production!"
    assert data["environment"] == "production"
    assert data["url"] == "https://roomly-backend-178182914223.europe-west1.run.app"


def test_hello_endpoint_method_not_allowed(client):
    """Test that POST method is not allowed on /api/hello endpoint."""
    response = client.post("/api/hello")
    assert response.status_code == 405  # Method Not Allowed


def test_nonexistent_endpoint(client):
    """Test that nonexistent endpoints return 404."""
    response = client.get("/nonexistent")
    assert response.status_code == 404

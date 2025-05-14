import unittest
from unittest.mock import patch, Mock
from sqlalchemy.exc import IntegrityError


class TestRoomService(unittest.TestCase):
    """Tests unitaires pour le service RoomService."""

    def setUp(self):
        """Configuration initiale pour les tests."""
        # Patcher les modules problématiques
        self.room_patcher = patch("app.services.room_service.Room")
        self.db_patcher = patch("app.services.room_service.db")

        # Démarrer les patchers
        self.mock_room = self.room_patcher.start()
        self.mock_db = self.db_patcher.start()

        # Importer RoomService après les mocks
        from app.services.room_service import RoomService

        self.RoomService = RoomService

        # Créer un mock d'objet Room pour les tests
        self.room_obj = Mock()
        self.room_obj.id = 1
        self.room_obj.name = "Salle Test"
        self.room_obj.slug = "salle-test"
        # Autres attributs nécessaires à l'objet Room

    def tearDown(self):
        """Nettoyage après les tests."""
        self.room_patcher.stop()
        self.db_patcher.stop()

    def test_get_all_rooms(self):
        """Teste la récupération de toutes les salles."""
        # Configurer les mocks
        mock_query = Mock()
        self.mock_room.query = mock_query
        mock_query.all.return_value = [self.room_obj]

        # Patcher la méthode de formatage
        with patch.object(
            self.RoomService, "_format_room_data", return_value={"name": "Salle Test"}
        ):
            # Exécuter et vérifier
            result = self.RoomService.get_all_rooms()
            self.assertEqual(len(result), 1)
            self.assertEqual(result[0]["name"], "Salle Test")
            mock_query.all.assert_called_once()

    def test_get_room_by_slug(self):
        """Teste la récupération d'une salle par son slug."""
        # Configurer les mocks
        mock_query = Mock()
        self.mock_room.query = mock_query
        mock_filter = Mock()
        mock_query.filter_by.return_value = mock_filter
        mock_filter.first_or_404.return_value = self.room_obj

        # Patcher la méthode de formatage
        with patch.object(
            self.RoomService, "_format_room_data", return_value={"name": "Salle Test"}
        ):
            # Exécuter et vérifier
            result = self.RoomService.get_room_by_slug("salle-test")
            self.assertEqual(result["name"], "Salle Test")
            mock_query.filter_by.assert_called_once_with(slug="salle-test")

    def test_create_room_success(self):
        """Teste la création réussie d'une salle."""
        # Créer un mock complet pour RoomCreate
        room_create = Mock()
        room_create.name = "Nouvelle Salle"
        room_create.slug = "nouvelle-salle"
        room_create.description = "Description"
        room_create.shortDescription = "Courte description"
        room_create.category = "Meeting"
        room_create.type = "Conference"

        # Configurer les sous-objets
        room_create.capacity = Mock()
        room_create.capacity.min = 5
        room_create.capacity.max = 20
        room_create.capacity.optimal = 15

        room_create.size = 50
        room_create.pricePerHour = 75
        room_create.pricePerDay = 300

        room_create.location = Mock()
        room_create.location.address = "456 Avenue"
        room_create.location.city = "Lyon"
        room_create.location.postalCode = "69001"
        room_create.location.country = "France"
        room_create.location.coordinates = {"lat": 45.7578, "lng": 4.8320}

        # Listes vides pour éviter l'erreur d'itération
        room_create.amenities = []
        room_create.services = []
        room_create.images = []

        room_create.availabilityConfirmationRequired = False
        room_create.rating = 0
        room_create.reviews = []

        new_room = Mock(id=2)
        self.mock_room.return_value = new_room

        # Exécuter et vérifier
        response, status_code = self.RoomService.create_room(room_create)
        self.assertEqual(status_code, 201)
        self.assertEqual(response["id"], 2)
        self.mock_db.session.add.assert_called_once()
        self.mock_db.session.commit.assert_called_once()

    def test_create_room_integrity_error(self):
        """Teste la gestion d'une erreur d'intégrité."""
        room_create = Mock()
        room_create.name = "Nouvelle Salle"
        room_create.slug = "nouvelle-salle"
        room_create.description = "Description"
        room_create.shortDescription = "Courte description"
        room_create.category = "Meeting"
        room_create.type = "Conference"

        # Configurer les sous-objets
        room_create.capacity = Mock()
        room_create.capacity.min = 5
        room_create.capacity.max = 20
        room_create.capacity.optimal = 15

        room_create.size = 50
        room_create.pricePerHour = 75
        room_create.pricePerDay = 300

        room_create.location = Mock()
        room_create.location.address = "456 Avenue"
        room_create.location.city = "Lyon"
        room_create.location.postalCode = "69001"
        room_create.location.country = "France"
        room_create.location.coordinates = {"lat": 45.7578, "lng": 4.8320}

        # Listes vides pour éviter l'erreur d'itération
        room_create.amenities = []
        room_create.services = []
        room_create.images = []

        room_create.availabilityConfirmationRequired = False
        room_create.rating = 0
        room_create.reviews = []

        # Configurer le mock pour simuler une erreur d'intégrité
        self.mock_db.session.commit.side_effect = IntegrityError(
            "Duplicate slug", None, None
        )

        # Exécuter et vérifier
        response, status_code = self.RoomService.create_room(room_create)
        self.assertEqual(status_code, 400)
        self.assertEqual(response["error"], "Une salle avec ce slug existe déjà")
        self.mock_db.session.rollback.assert_called_once()


if __name__ == "__main__":
    unittest.main()

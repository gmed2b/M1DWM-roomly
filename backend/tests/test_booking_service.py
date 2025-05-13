import unittest
from unittest.mock import patch, MagicMock
from datetime import datetime, time
from app import create_app, db
from app.models.room import Room
from app.models.booking import Booking
from app.models.user import User
from app.schemas.booking import BookingCreate
from app.services.booking_service import BookingService


class TestBookingService(unittest.TestCase):
    """Tests unitaires pour le service de gestion des réservations."""

    def setUp(self):
        """Initialiser l'environnement de test."""
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        
        # Créer un utilisateur de test
        self.test_user = User(
            email="test@example.com",
            first_name="Test",
            last_name="User"
        )
        self.test_user.set_password("password123")
        db.session.add(self.test_user)
        db.session.commit()
        
        # Créer une salle de test
        self.test_room = Room(
            name="Salle de Test",
            slug="salle-test",
            description="Description complète de la salle de test",
            short_description="Description courte",
            category="Standard",
            type="Moyenne",
            capacity_min=5,
            capacity_max=20,
            capacity_optimal=10,
            size=50,
            price_per_hour=30,
            price_per_day=200,
            location_address="123 rue Test",
            location_city="Ville Test",
            location_postal_code="75000",
            location_country="France",
            location_lat=48.8566,
            location_lng=2.3522,
            amenities=[],
            services=[],
            images=[],
            availability_confirmation_required=False,
            rating=4.5,
            reviews=0
        )
        db.session.add(self.test_room)
        db.session.commit()
        
        # Créer une réservation de test
        self.test_booking = Booking(
            room_id=self.test_room.id,
            user_id=self.test_user.id,
            date=datetime.strptime("2025-06-01", "%Y-%m-%d").date(),
            is_full_day=False,
            start_time=time(9, 0),
            end_time=time(12, 0),
            attendees=5,
            services=[],
            total_price=90,
            status="confirmed"
        )
        db.session.add(self.test_booking)
        db.session.commit()
        
        # Créer des objets de schéma pour les tests
        self.valid_booking_data = MagicMock(spec=BookingCreate)
        self.valid_booking_data.room_id = self.test_room.id
        self.valid_booking_data.user_id = self.test_user.id
        self.valid_booking_data.date = datetime.strptime("2025-06-02", "%Y-%m-%d").date()
        self.valid_booking_data.is_full_day = False
        self.valid_booking_data.start_time = time(13, 0)
        self.valid_booking_data.end_time = time(17, 0)
        self.valid_booking_data.attendees = 10
        self.valid_booking_data.services = []
        self.valid_booking_data.total_price = 120
    
    def tearDown(self):
        """Nettoyer l'environnement après les tests."""
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
    
    def test_create_booking_success_auto_confirm(self):
        """Test de création d'une réservation avec confirmation automatique."""
        # La salle de test a availability_confirmation_required=False
        result, status_code = BookingService.create_booking(self.valid_booking_data)
        
        # Vérifier la réponse
        self.assertEqual(status_code, 201)
        self.assertIn('id', result)
        self.assertEqual(result['status'], 'confirmed')
        self.assertIn('message', result)
        
        # Vérifier que la réservation a été créée dans la base de données
        booking = Booking.query.get(result['id'])
        self.assertIsNotNone(booking)
        self.assertEqual(booking.room_id, self.test_room.id)
        self.assertEqual(booking.user_id, self.test_user.id)
        self.assertEqual(booking.attendees, 10)
        self.assertEqual(booking.status, 'confirmed')
    
    def test_create_booking_success_pending(self):
        """Test de création d'une réservation avec statut en attente."""
        # Modifier la salle pour qu'elle nécessite une confirmation
        self.test_room.availability_confirmation_required = True
        db.session.commit()
        
        result, status_code = BookingService.create_booking(self.valid_booking_data)
        
        # Vérifier la réponse
        self.assertEqual(status_code, 201)
        self.assertIn('id', result)
        self.assertEqual(result['status'], 'pending')
        self.assertIn('message', result)
        
        # Vérifier que la réservation a été créée dans la base de données
        booking = Booking.query.get(result['id'])
        self.assertIsNotNone(booking)
        self.assertEqual(booking.status, 'pending')
    
    def test_create_booking_fullday(self):
        """Test de création d'une réservation pour une journée complète."""
        self.valid_booking_data.is_full_day = True
        self.valid_booking_data.start_time = None
        self.valid_booking_data.end_time = None
        
        result, status_code = BookingService.create_booking(self.valid_booking_data)
        
        # Vérifier la réponse
        self.assertEqual(status_code, 201)
        
        # Vérifier que la réservation a été créée dans la base de données
        booking = Booking.query.get(result['id'])
        self.assertIsNotNone(booking)
        self.assertTrue(booking.is_full_day)
        self.assertIsNone(booking.start_time)
        self.assertIsNone(booking.end_time)
    
    def test_create_booking_nonexistent_room(self):
        """Test de création d'une réservation pour une salle inexistante."""
        # Configurer la requête pour utiliser un room_id inexistant
        self.valid_booking_data.room_id = 999
        
        # Utiliser assertRaises pour vérifier que l'exception 404 est levée
        with self.assertRaises(Exception):
            BookingService.create_booking(self.valid_booking_data)
    
    def test_get_user_bookings(self):
        """Test de récupération des réservations d'un utilisateur."""
        bookings = BookingService.get_user_bookings(self.test_user.id)
        
        # Vérifier qu'on a bien récupéré la réservation de test
        self.assertEqual(len(bookings), 1)
        self.assertEqual(bookings[0]['room_id'], self.test_room.id)
        self.assertEqual(bookings[0]['user_id'], self.test_user.id)
        
        # Vérifier le format de la réponse
        self.assertIn('date', bookings[0])
        self.assertIn('status', bookings[0])
        self.assertEqual(bookings[0]['status'], 'confirmed')
    
    def test_get_user_bookings_no_bookings(self):
        """Test de récupération des réservations pour un utilisateur sans réservations."""
        # Créer un nouvel utilisateur sans réservations
        new_user = User(
            email="new@example.com",
            first_name="New",
            last_name="User"
        )
        new_user.set_password("password123")
        db.session.add(new_user)
        db.session.commit()
        
        bookings = BookingService.get_user_bookings(new_user.id)
        
        # Vérifier qu'on a bien une liste vide
        self.assertEqual(len(bookings), 0)
        self.assertIsInstance(bookings, list)


if __name__ == '__main__':
    unittest.main()
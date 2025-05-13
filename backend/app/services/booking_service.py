from app.models.booking import Booking
from app.models.room import Room
from app.schemas.booking import BookingCreate
from app import db


class BookingService:
    @staticmethod
    def create_booking(booking_data: BookingCreate):
        """Crée une nouvelle réservation."""
        # Vérifier que la salle existe
        room = Room.query.get_or_404(booking_data.room_id)
        
        # Créer la réservation
        booking = Booking(
            room_id=booking_data.room_id,
            user_id=booking_data.user_id,
            date=booking_data.date,
            is_full_day=booking_data.is_full_day,
            attendees=booking_data.attendees,
            services=booking_data.services,
            total_price=booking_data.total_price,
            status='pending' if room.availability_confirmation_required else 'confirmed'
        )
        
        # Ajouter les heures si ce n'est pas une journée complète
        if not booking.is_full_day and booking_data.start_time and booking_data.end_time:
            booking.start_time = booking_data.start_time
            booking.end_time = booking_data.end_time
        
        db.session.add(booking)
        db.session.commit()
        
        return {
            'id': booking.id,
            'status': booking.status,
            'message': 'Votre réservation a été enregistrée avec succès'
        }, 201
    
    @staticmethod
    def get_user_bookings(user_id):
        """Récupère toutes les réservations d'un utilisateur."""
        bookings = Booking.query.filter_by(user_id=user_id).all()
        result = []
        
        for booking in bookings:
            result.append(BookingService._format_booking_data(booking))
        
        return result
    
    @staticmethod
    def _format_booking_data(booking):
        """Formate les données d'une réservation pour le frontend."""
        return {
            "id": booking.id,
            "room_id": booking.room_id,
            "date": booking.date.isoformat(),
            "is_full_day": booking.is_full_day,
            "start_time": booking.start_time.isoformat() if booking.start_time else None,
            "end_time": booking.end_time.isoformat() if booking.end_time else None,
            "attendees": booking.attendees,
            "services": booking.services,
            "total_price": booking.total_price,
            "status": booking.status,
            "created_at": booking.created_at.isoformat(),
            "updated_at": booking.updated_at.isoformat()
        }
import pytest
from unittest.mock import patch, MagicMock
from app.services.booking_service import BookingService
from app.schemas.booking import BookingCreate
from datetime import date, time, datetime


@pytest.fixture
def booking_data_full_day():
    return BookingCreate(
        room_id="1",  # <- chaîne ici
        user_id="2",  # <- chaîne ici
        date=date(2025, 5, 20),
        is_full_day=True,
        start_time=None,
        end_time=None,
        attendees=10,
        services=["wifi", "café"],
        total_price=100.0,
    )


@pytest.fixture
def booking_data_half_day():
    return BookingCreate(
        room_id="1",
        user_id="2",
        date=date(2025, 5, 21),
        is_full_day=False,
        start_time=time(9, 0),
        end_time=time(12, 0),
        attendees=5,
        services=["wifi"],
        total_price=50.0,
    )


# Test: création d'une réservation - salle sans confirmation requise
@patch("app.services.booking_service.db")
@patch("app.services.booking_service.Room")
@patch("app.services.booking_service.Booking")
def test_create_booking_without_confirmation(
    mock_booking_class, mock_room_class, mock_db, booking_data_full_day
):
    mock_room = MagicMock()
    mock_room.availability_confirmation_required = False
    mock_room_class.query.get_or_404.return_value = mock_room

    mock_booking = MagicMock()
    mock_booking.id = 1
    mock_booking.status = "confirmed"
    mock_booking_class.return_value = mock_booking

    response, status = BookingService.create_booking(booking_data_full_day)

    assert status == 201
    assert response["status"] == "confirmed"
    assert response["message"] == "Votre réservation a été enregistrée avec succès"
    mock_db.session.add.assert_called_once()
    mock_db.session.commit.assert_called_once()


# Test: création d'une réservation - salle avec confirmation requise
@patch("app.services.booking_service.db")
@patch("app.services.booking_service.Room")
@patch("app.services.booking_service.Booking")
def test_create_booking_with_confirmation(
    mock_booking_class, mock_room_class, mock_db, booking_data_half_day
):
    mock_room = MagicMock()
    mock_room.availability_confirmation_required = True
    mock_room_class.query.get_or_404.return_value = mock_room

    mock_booking = MagicMock()
    mock_booking.id = 2
    mock_booking.status = "pending"
    mock_booking_class.return_value = mock_booking

    response, status = BookingService.create_booking(booking_data_half_day)

    assert status == 201
    assert response["status"] == "pending"
    assert response["message"] == "Votre réservation a été enregistrée avec succès"
    mock_db.session.add.assert_called_once()
    mock_db.session.commit.assert_called_once()


# Test: récupération des réservations utilisateur
@patch("app.services.booking_service.BookingService._format_booking_data")
@patch("app.services.booking_service.Booking")
def test_get_user_bookings(mock_booking_class, mock_format_booking):
    booking1 = MagicMock()
    booking2 = MagicMock()
    mock_booking_class.query.filter_by.return_value.all.return_value = [
        booking1,
        booking2,
    ]

    mock_format_booking.side_effect = [
        {"id": 1, "status": "confirmed"},
        {"id": 2, "status": "pending"},
    ]

    bookings = BookingService.get_user_bookings(user_id=2)

    assert len(bookings) == 2
    assert bookings[0]["id"] == 1
    assert bookings[1]["status"] == "pending"

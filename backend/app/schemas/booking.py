from pydantic import BaseModel, Field
from typing import List, Optional, Any, Literal
from datetime import date, time

BookingStatus = Literal['pending', 'confirmed', 'cancelled']

class BookingCreate(BaseModel):
    room_id: str
    user_id: Optional[str] = None
    date: date
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    is_full_day: bool = False
    attendees: int
    services: List[Any] = []
    total_price: float

class BookingResponse(BookingCreate):
    id: str
    status: BookingStatus
    created_at: str
    updated_at: str
from solar import Table, ColumnDetails
from typing import Optional, Dict
from datetime import datetime
import uuid

class UserProfile(Table):
    __tablename__ = "user_profiles"
    
    id: uuid.UUID = ColumnDetails(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID  # Reference to User from auth system
    full_name: str
    phone: str
    email: str
    address: Dict  # JSON with detailed address
    subscription_status: str  # 활성, 비활성, 해지
    joined_date: datetime = ColumnDetails(default_factory=datetime.now)
    last_login: Optional[datetime] = None  # For backwards compatibility
    created_at: datetime = ColumnDetails(default_factory=datetime.now)
    updated_at: datetime = ColumnDetails(default_factory=datetime.now)
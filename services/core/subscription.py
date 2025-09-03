from solar import Table, ColumnDetails
from typing import Optional, Dict
from datetime import datetime
import uuid

class Subscription(Table):
    __tablename__ = "subscriptions"
    
    id: uuid.UUID = ColumnDetails(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID  # Reference to User
    status: str  # 활성, 일시정지, 해지
    start_date: datetime = ColumnDetails(default_factory=datetime.now)
    end_date: Optional[datetime] = None  # For backwards compatibility
    monthly_fee: float  # 월 구독료 (기본 40000)
    payment_info: Dict  # JSON with payment details
    created_at: datetime = ColumnDetails(default_factory=datetime.now)
    updated_at: datetime = ColumnDetails(default_factory=datetime.now)
from solar import Table, ColumnDetails
from typing import Optional, List, Dict
from datetime import datetime
import uuid

class Delivery(Table):
    __tablename__ = "deliveries"
    
    id: uuid.UUID = ColumnDetails(default_factory=uuid.uuid4, primary_key=True)
    subscription_id: uuid.UUID  # Reference to Subscription
    status: str  # 준비중, 발송, 배송중, 완료
    delivery_address: Dict  # JSON with address details
    sent_date: Optional[datetime] = None  # For backwards compatibility
    delivered_date: Optional[datetime] = None  # For backwards compatibility
    product_list: List[Dict]  # Array of product details
    tracking_number: Optional[str] = None  # For backwards compatibility
    created_at: datetime = ColumnDetails(default_factory=datetime.now)
    updated_at: datetime = ColumnDetails(default_factory=datetime.now)
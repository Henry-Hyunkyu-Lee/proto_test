from solar import Table, ColumnDetails
from typing import Optional
from datetime import datetime
import uuid

class WeightRecord(Table):
    __tablename__ = "weight_records"
    
    id: uuid.UUID = ColumnDetails(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID  # Reference to User
    weight: float  # 체중 (kg)
    measurement_date: datetime = ColumnDetails(default_factory=datetime.now)
    memo: Optional[str] = None  # For backwards compatibility
    created_at: datetime = ColumnDetails(default_factory=datetime.now)
from solar import Table, ColumnDetails
from typing import Optional
from datetime import datetime
import uuid

class Feedback(Table):
    __tablename__ = "feedbacks"
    
    id: uuid.UUID = ColumnDetails(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID  # Reference to User
    supplement_id: uuid.UUID  # Reference to Supplement
    effectiveness_score: int  # 효과 점수 (1-10)
    has_side_effects: bool  # 부작용 여부
    detailed_review: Optional[str] = None  # For backwards compatibility
    created_at: datetime = ColumnDetails(default_factory=datetime.now)
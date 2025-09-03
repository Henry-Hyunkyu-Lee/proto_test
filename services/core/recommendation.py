from solar import Table, ColumnDetails
from typing import List, Dict
from datetime import datetime
import uuid

class Recommendation(Table):
    __tablename__ = "recommendations"
    
    id: uuid.UUID = ColumnDetails(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID  # Reference to User
    top3_supplements: List[uuid.UUID]  # Array of supplement IDs
    recommendation_reasons: Dict  # JSON with detailed explanations
    predicted_weight_loss: float  # 예측 체중감량 (kg)
    confidence_score: float  # 신뢰도 점수 (0-100)
    generated_at: datetime = ColumnDetails(default_factory=datetime.now)
    created_at: datetime = ColumnDetails(default_factory=datetime.now)
from solar import Table, ColumnDetails
from typing import Optional
from datetime import datetime
import uuid

class TestResult(Table):
    __tablename__ = "test_results"
    
    id: uuid.UUID = ColumnDetails(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID  # Reference to User
    ingredient_id: uuid.UUID  # Reference to Ingredient
    test_score: float  # 시험 점수
    predicted_effect: float  # 예측 효과
    test_date: datetime = ColumnDetails(default_factory=datetime.now)
    created_at: datetime = ColumnDetails(default_factory=datetime.now)
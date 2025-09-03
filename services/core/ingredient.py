from solar import Table, ColumnDetails
from typing import Optional, List
from datetime import datetime
import uuid

class Ingredient(Table):
    __tablename__ = "ingredients"
    
    id: uuid.UUID = ColumnDetails(default_factory=uuid.uuid4, primary_key=True)
    name: str
    fda_notification_info: str  # 식약처 고시 정보
    efficacy_description: str  # 효능 설명
    recommended_dosage: str  # 권장 섭취량
    side_effects: List[str]  # Array of potential side effects
    created_at: datetime = ColumnDetails(default_factory=datetime.now)
    updated_at: datetime = ColumnDetails(default_factory=datetime.now)
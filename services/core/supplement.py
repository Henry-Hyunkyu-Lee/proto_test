from solar import Table, ColumnDetails
from typing import Optional, List
from datetime import datetime
import uuid

class Supplement(Table):
    __tablename__ = "supplements"
    
    id: uuid.UUID = ColumnDetails(default_factory=uuid.uuid4, primary_key=True)
    name: str
    brand: str
    main_ingredients: List[str]  # Array of main ingredient names
    is_fda_approved: bool  # 식약처 인정 여부
    description: str
    efficacy: str  # 효능 설명
    price: float
    created_at: datetime = ColumnDetails(default_factory=datetime.now)
    updated_at: datetime = ColumnDetails(default_factory=datetime.now)
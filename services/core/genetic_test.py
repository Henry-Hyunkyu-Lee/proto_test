from solar import Table, ColumnDetails
from typing import Optional, Dict
from datetime import datetime
import uuid

class GeneticTest(Table):
    __tablename__ = "genetic_tests"
    
    id: uuid.UUID = ColumnDetails(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID  # Reference to User
    status: str  # 신청, 키트발송, 샘플접수, 분석중, 완료
    application_date: datetime = ColumnDetails(default_factory=datetime.now)
    kit_sent_date: Optional[datetime] = None  # For backwards compatibility
    sample_received_date: Optional[datetime] = None  # For backwards compatibility
    analysis_completed_date: Optional[datetime] = None  # For backwards compatibility
    test_results: Optional[Dict] = None  # For backwards compatibility - JSON data with genetic analysis
    created_at: datetime = ColumnDetails(default_factory=datetime.now)
    updated_at: datetime = ColumnDetails(default_factory=datetime.now)
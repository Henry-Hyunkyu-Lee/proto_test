from typing import List, Dict, Optional
from uuid import UUID
from core.weight_record import WeightRecord
from core.feedback import Feedback
from core.test_result import TestResult
from solar.access import public
from datetime import datetime, timedelta

@public
def record_weight(user_id: UUID, weight: float, memo: Optional[str] = None) -> Dict:
    """Record user's weight measurement."""
    record = WeightRecord(
        user_id=user_id,
        weight=weight,
        memo=memo
    )
    record.sync()
    
    return {
        "record_id": str(record.id),
        "weight": weight,
        "measurement_date": record.measurement_date.isoformat(),
        "message": "체중이 기록되었습니다."
    }

@public
def get_weight_history(user_id: UUID, days: int = 90) -> List[Dict]:
    """Get user's weight history for the specified number of days."""
    start_date = datetime.now() - timedelta(days=days)
    
    results = WeightRecord.sql(
        """
        SELECT * FROM weight_records 
        WHERE user_id = %(user_id)s AND measurement_date >= %(start_date)s
        ORDER BY measurement_date DESC
        """,
        {"user_id": str(user_id), "start_date": start_date}
    )
    
    return [{
        "weight": result["weight"],
        "measurement_date": result["measurement_date"],
        "memo": result.get("memo")
    } for result in results]

@public
def submit_feedback(user_id: UUID, supplement_id: UUID, effectiveness_score: int, 
                   has_side_effects: bool, detailed_review: Optional[str] = None) -> Dict:
    """Submit user feedback for a supplement."""
    feedback = Feedback(
        user_id=user_id,
        supplement_id=supplement_id,
        effectiveness_score=effectiveness_score,
        has_side_effects=has_side_effects,
        detailed_review=detailed_review
    )
    feedback.sync()
    
    return {
        "feedback_id": str(feedback.id),
        "message": "피드백이 제출되었습니다. 소중한 의견 감사합니다."
    }

@public
def get_user_progress_report(user_id: UUID) -> Dict:
    """Generate a progress report for the user."""
    # Get weight history
    weight_results = WeightRecord.sql(
        """
        SELECT weight, measurement_date FROM weight_records 
        WHERE user_id = %(user_id)s 
        ORDER BY measurement_date DESC LIMIT 10
        """,
        {"user_id": str(user_id)}
    )
    
    # Get feedback summary
    feedback_results = Feedback.sql(
        """
        SELECT AVG(effectiveness_score) as avg_score, COUNT(*) as total_feedback
        FROM feedbacks WHERE user_id = %(user_id)s
        """,
        {"user_id": str(user_id)}
    )
    
    weight_data = [{
        "weight": result["weight"],
        "date": result["measurement_date"]
    } for result in weight_results]
    
    # Calculate weight change
    weight_change = 0
    if len(weight_data) >= 2:
        weight_change = weight_data[0]["weight"] - weight_data[-1]["weight"]
    
    feedback_summary = {
        "average_effectiveness": feedback_results[0]["avg_score"] if feedback_results[0]["avg_score"] else 0,
        "total_reviews": feedback_results[0]["total_feedback"]
    }
    
    return {
        "weight_progress": {
            "current_weight": weight_data[0]["weight"] if weight_data else None,
            "weight_change": weight_change,
            "history": weight_data
        },
        "supplement_feedback": feedback_summary,
        "progress_summary": {
            "total_days": len(weight_data),
            "trend": "감소" if weight_change < 0 else "증가" if weight_change > 0 else "유지"
        }
    }

@public
def get_testimonials() -> List[Dict]:
    """Get customer testimonials for the landing page."""
    return [
        {
            "name": "김○○",
            "age": "30대",
            "review": "설문만으로 추천하는 서비스와 달리, 실험 데이터 기반 추천이라 훨씬 믿음이 갔습니다.",
            "rating": 5,
            "weight_loss": "3.2kg (3개월)"
        },
        {
            "name": "이○○",
            "age": "40대", 
            "review": "20종 원료를 다 먹어볼 필요 없이, 나에게 맞는 TOP3와 체중감량 예측치를 받아보니 안심이 됐어요.",
            "rating": 5,
            "weight_loss": "2.8kg (2개월)"
        },
        {
            "name": "박○○",
            "age": "20대",
            "review": "내 유전자와 맞춤 분석 결과라서, 꾸준히 먹을 자신이 생겼습니다.",
            "rating": 5,
            "weight_loss": "4.1kg (4개월)"
        }
    ]
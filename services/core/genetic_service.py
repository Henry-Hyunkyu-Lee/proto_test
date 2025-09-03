from typing import List, Dict, Optional
from uuid import UUID
from core.genetic_test import GeneticTest
from core.test_result import TestResult
from core.recommendation import Recommendation
from core.supplement import Supplement
from core.ingredient import Ingredient
from core.user_profile import UserProfile
from solar.access import public
import uuid
from datetime import datetime
import random

@public
def create_genetic_test(user_id: UUID, full_name: str, phone: str, email: str, address: Dict) -> Dict:
    """Create a new genetic test request and user profile."""
    # Create user profile
    profile = UserProfile(
        user_id=user_id,
        full_name=full_name,
        phone=phone,
        email=email,
        address=address,
        subscription_status="활성"
    )
    profile.sync()
    
    # Create genetic test
    test = GeneticTest(
        user_id=user_id,
        status="신청"
    )
    test.sync()
    
    return {
        "test_id": str(test.id),
        "profile_id": str(profile.id),
        "status": "신청완료",
        "message": "유전자 검사가 신청되었습니다. 검사 키트가 곧 발송됩니다."
    }

@public
def get_sample_report() -> Dict:
    """Get a sample genetic analysis report for demonstration."""
    return {
        "user_info": {
            "name": "김○○",
            "test_date": "2024-08-15",
            "report_date": "2024-08-22"
        },
        "genetic_analysis": {
            "metabolism_type": "중간형",
            "fat_burning_efficiency": 7.2,
            "carb_sensitivity": "높음",
            "genetic_risk_factors": [
                "복부 비만 위험도: 중간",
                "당분 대사 능력: 보통",
                "지방 대사 능력: 우수"
            ]
        },
        "ingredient_test_results": [
            {"name": "가르시니아 캄보지아", "score": 8.5, "predicted_effect": "높음"},
            {"name": "녹차 추출물", "score": 8.2, "predicted_effect": "높음"},
            {"name": "L-카르니틴", "score": 7.8, "predicted_effect": "중간-높음"},
            {"name": "공액리놀레산(CLA)", "score": 7.5, "predicted_effect": "중간-높음"},
            {"name": "키토산", "score": 6.9, "predicted_effect": "중간"},
            {"name": "화이트빈 추출물", "score": 6.7, "predicted_effect": "중간"},
            {"name": "크롬", "score": 6.4, "predicted_effect": "중간"},
            {"name": "히비스커스", "score": 6.1, "predicted_effect": "중간"},
            {"name": "콜레우스 포스콜리", "score": 5.8, "predicted_effect": "중간-낮음"},
            {"name": "라즈베리 케톤", "score": 5.5, "predicted_effect": "중간-낮음"}
        ],
        "top3_recommendations": [
            {
                "rank": 1,
                "supplement": "가르시니아 + 녹차 복합체",
                "ingredients": ["가르시니아 캄보지아", "녹차 추출물", "비타민 B군"],
                "predicted_weight_loss": "2.3-3.1kg (3개월 기준)",
                "confidence": 89,
                "reason": "귀하의 지방 대사 유전자 특성과 가장 높은 호환성을 보입니다."
            },
            {
                "rank": 2,
                "supplement": "L-카르니틴 프리미엄",
                "ingredients": ["L-카르니틴", "공액리놀레산", "마그네슘"],
                "predicted_weight_loss": "2.0-2.7kg (3개월 기준)",
                "confidence": 84,
                "reason": "운동 시 지방 연소 효과를 극대화할 수 있는 조합입니다."
            },
            {
                "rank": 3,
                "supplement": "멀티 다이어트 컴플렉스",
                "ingredients": ["키토산", "화이트빈 추출물", "크롬"],
                "predicted_weight_loss": "1.8-2.4kg (3개월 기준)",
                "confidence": 78,
                "reason": "탄수화물과 지방 흡수를 동시에 관리하는 균형 잡힌 조합입니다."
            }
        ],
        "lifestyle_recommendations": [
            "하루 30분 이상의 유산소 운동 권장",
            "탄수화물 섭취량을 현재의 70% 수준으로 조절",
            "식사 30분 전 추천 보조제 복용",
            "충분한 수분 섭취 (하루 2L 이상)"
        ],
        "scientific_basis": {
            "test_method": "개인 유전자 정보 기반 생체모델 시험",
            "reference_studies": 127,
            "ai_analysis_accuracy": "94.7%",
            "fda_approved_ingredients": "100%"
        }
    }

@public
def get_user_genetic_test(user_id: UUID) -> Optional[Dict]:
    """Get user's genetic test status and results."""
    results = GeneticTest.sql(
        "SELECT * FROM genetic_tests WHERE user_id = %(user_id)s ORDER BY created_at DESC LIMIT 1",
        {"user_id": str(user_id)}
    )
    
    if not results:
        return None
    
    test_data = results[0]
    return {
        "id": test_data["id"],
        "status": test_data["status"],
        "application_date": test_data["application_date"],
        "results": test_data.get("test_results")
    }

@public
def get_all_supplements() -> List[Dict]:
    """Get all available supplements."""
    results = Supplement.sql("SELECT * FROM supplements ORDER BY name")
    return [{
        "id": result["id"],
        "name": result["name"],
        "brand": result["brand"],
        "main_ingredients": result["main_ingredients"],
        "description": result["description"],
        "price": result["price"]
    } for result in results]

@public
def get_user_recommendations(user_id: UUID) -> Optional[Dict]:
    """Get user's personalized supplement recommendations."""
    results = Recommendation.sql(
        "SELECT * FROM recommendations WHERE user_id = %(user_id)s ORDER BY generated_at DESC LIMIT 1",
        {"user_id": str(user_id)}
    )
    
    if not results:
        return None
    
    rec_data = results[0]
    return {
        "top3_supplements": rec_data["top3_supplements"],
        "reasons": rec_data["recommendation_reasons"],
        "predicted_weight_loss": rec_data["predicted_weight_loss"],
        "confidence_score": rec_data["confidence_score"],
        "generated_at": rec_data["generated_at"]
    }
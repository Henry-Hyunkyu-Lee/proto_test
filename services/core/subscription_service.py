from typing import List, Dict, Optional
from uuid import UUID
from core.subscription import Subscription
from core.delivery import Delivery
from core.user_profile import UserProfile
from solar.access import public
import uuid
from datetime import datetime, timedelta

@public
def create_subscription(user_id: UUID, payment_info: Dict) -> Dict:
    """Create a new subscription for a user."""
    subscription = Subscription(
        user_id=user_id,
        status="활성",
        monthly_fee=40000.0,
        payment_info=payment_info
    )
    subscription.sync()
    
    # Update user profile subscription status
    profiles = UserProfile.sql(
        "SELECT * FROM user_profiles WHERE user_id = %(user_id)s",
        {"user_id": str(user_id)}
    )
    
    if profiles:
        profile = UserProfile(**profiles[0])
        profile.subscription_status = "활성"
        profile.updated_at = datetime.now()
        profile.sync()
    
    return {
        "subscription_id": str(subscription.id),
        "status": "활성",
        "monthly_fee": 40000.0,
        "next_billing_date": (datetime.now() + timedelta(days=30)).isoformat(),
        "message": "구독이 성공적으로 시작되었습니다."
    }

@public
def get_user_subscription(user_id: UUID) -> Optional[Dict]:
    """Get user's current subscription status."""
    results = Subscription.sql(
        "SELECT * FROM subscriptions WHERE user_id = %(user_id)s AND status = '활성' ORDER BY created_at DESC LIMIT 1",
        {"user_id": str(user_id)}
    )
    
    if not results:
        return None
    
    sub_data = results[0]
    return {
        "id": sub_data["id"],
        "status": sub_data["status"],
        "monthly_fee": sub_data["monthly_fee"],
        "start_date": sub_data["start_date"],
        "payment_info": sub_data["payment_info"]
    }

@public
def update_subscription_status(subscription_id: UUID, new_status: str) -> Dict:
    """Update subscription status (활성, 일시정지, 해지)."""
    results = Subscription.sql(
        "SELECT * FROM subscriptions WHERE id = %(id)s",
        {"id": str(subscription_id)}
    )
    
    if not results:
        return {"error": "구독을 찾을 수 없습니다."}
    
    subscription = Subscription(**results[0])
    subscription.status = new_status
    subscription.updated_at = datetime.now()
    
    if new_status == "해지":
        subscription.end_date = datetime.now()
    
    subscription.sync()
    
    return {
        "subscription_id": str(subscription.id),
        "status": new_status,
        "message": f"구독 상태가 '{new_status}'로 변경되었습니다."
    }

@public
def create_delivery(subscription_id: UUID, delivery_address: Dict, product_list: List[Dict]) -> Dict:
    """Create a new delivery for a subscription."""
    delivery = Delivery(
        subscription_id=subscription_id,
        status="준비중",
        delivery_address=delivery_address,
        product_list=product_list
    )
    delivery.sync()
    
    return {
        "delivery_id": str(delivery.id),
        "status": "준비중",
        "estimated_delivery": (datetime.now() + timedelta(days=2)).isoformat(),
        "message": "배송이 준비되었습니다."
    }

@public
def get_user_deliveries(user_id: UUID) -> List[Dict]:
    """Get all deliveries for a user's subscriptions."""
    results = Delivery.sql(
        """
        SELECT d.* FROM deliveries d
        JOIN subscriptions s ON d.subscription_id = s.id
        WHERE s.user_id = %(user_id)s
        ORDER BY d.created_at DESC
        """,
        {"user_id": str(user_id)}
    )
    
    return [{
        "id": result["id"],
        "status": result["status"],
        "product_list": result["product_list"],
        "sent_date": result.get("sent_date"),
        "delivery_address": result["delivery_address"],
        "tracking_number": result.get("tracking_number")
    } for result in results]

@public
def get_pricing_info() -> Dict:
    """Get current pricing information."""
    return {
        "monthly_subscription": {
            "price": 40000,
            "currency": "KRW",
            "includes": [
                "유전자 검사 (첫 달)",
                "맞춤 보조제 조합 추천",
                "맞춤 보조제 매월 배송",
                "개인화된 리포트",
                "지속적인 모니터링"
            ]
        },
        "first_month_bonus": [
            "유전자 검사 키트",
            "상세 분석 리포트",
            "개인 맞춤 상담"
        ]
    }
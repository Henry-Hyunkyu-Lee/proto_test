import { X, Star, Beaker, Shield, TrendingDown, CircleCheck } from "lucide-react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/ui/Logo';

import { analyticsServiceGetTestimonials, subscriptionServiceGetPricingInfo } from '@/lib/sdk';

interface Testimonial {
  name: string;
  age: string;
  review: string;
  rating: number;
  weight_loss: string;
}

interface PricingInfo {
  monthly_subscription: {
    price: number;
    currency: string;
    includes: string[];
  };
  first_month_bonus: string[];
}

function LandingPage() {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pricingInfo, setPricingInfo] = useState<PricingInfo | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const testimonialsResponse = await analyticsServiceGetTestimonials();
        setTestimonials(testimonialsResponse.data || []);
        
        const pricingResponse = await subscriptionServiceGetPricingInfo();
        setPricingInfo(pricingResponse.data || null);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      }
    };
    
    loadData();
  }, []);

  const handleSampleReport = () => {
    navigate('/sample-report');
  };

  const handleSubscribe = () => {
    navigate('/subscribe');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Logo size="sm" />
              <h1 className="text-2xl font-bold text-gray-900">마이진케어</h1>
              <Badge variant="secondary" className="ml-2">MyGeneCare</Badge>
            </div>
            <Button variant="outline" onClick={handleSampleReport}>
              샘플 리포트 보기
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ✨ 많은 체중관리 보조제를 먹어봤지만 <br className="hidden md:block" />
              효과가 없으셨나요? ✨
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              이제는 실제 시험 데이터 기반으로, 나에게 맞는 체중관리 보조제를 선택하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4"
                onClick={handleSubscribe}
              >
무료 상담 신청하기
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white bg-transparent hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
                onClick={handleSampleReport}
              >
                샘플 리포트 미리보기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">이런 고민 있으시죠?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-red-200">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <X className="w-6 h-6 text-red-500" />
                  <CardTitle className="text-red-700">효과 없는 보조제</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">광고와 후기에 속아 수많은 보조제를 시도했지만 효과 없음</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <X className="w-6 h-6 text-red-500" />
                  <CardTitle className="text-red-700">불확실성</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">내 몸에 어떤 보조제가 맞는지 알 수 없어 불안</p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <X className="w-6 h-6 text-red-500" />
                  <CardTitle className="text-red-700">시간과 비용 낭비</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">모든 제품을 직접 먹어보는 건 시간과 비용 낭비</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <p className="text-lg text-gray-700 mb-4">
              👉 사람마다 유전자와 대사 특성이 다르기 때문에, 같은 보조제도 효과가 다르게 나타납니다.
            </p>
            <p className="text-xl font-semibold text-blue-700">
              👉 그래서 필요한 건 바로 실제 시험 데이터 기반 맞춤 추천입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">마이진케어는 다릅니다</h2>
            <p className="text-xl text-blue-600 font-semibold">
              "실제로 시험해보고, 데이터로 맞춘 나만의 체중관리 보조제 추천"
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Beaker className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">유전자 검사</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">개인 유전자 검사 결과 확인</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingDown className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">생체모델 시험</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">20종 체중관리 기능성 원료 직접 시험</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">AI 분석</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">최신 문헌·임상 데이터와 AI 분석 결합</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <CircleCheck className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">맞춤 추천</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">TOP3 맞춤 보조제 + 체중감량 예측치</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">서비스 프로세스</h2>
            <p className="text-lg text-gray-600">간단한 4단계로 나만의 맞춤 보조제를 찾아보세요</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "Step 1",
                title: "개인 유전자 검사",
                description: "제휴된 DTC 유전자 검사로 고객님의 대사·비만 관련 유전자 특성 확인",
                icon: "🧬"
              },
              {
                step: "Step 2",
                title: "맞춤형 생체모델 시험",
                description: "개인별 유전자 특성을 반영한 생체모델에서 실제로 20종 체중관리 원료 비교시험",
                icon: "🔬"
              },
              {
                step: "Step 3",
                title: "데이터 + AI 분석",
                description: "시험 결과 + 최신 문헌·임상 데이터를 AI가 통합 분석 → 최적 보조제 및 체중감량 예측치 도출",
                icon: "🤖"
              },
              {
                step: "Step 4",
                title: "개인화된 추천 가이드",
                description: "고객님의 유전자와 분석 데이터를 기반으로 맞춤 조합 보조제를 구독 형태로 매월 배송",
                icon: "📦"
              }
            ].map((item, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <Badge variant="outline" className="w-fit">{item.step}</Badge>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {pricingInfo && (
        <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">합리적인 가격</h2>
              <p className="text-lg text-gray-600">마이진케어는 합리적인 가격으로 시작할 수 있습니다</p>
            </div>

            <Card className="max-w-2xl mx-auto border-2 border-blue-200">
              <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl">월 구독 서비스</CardTitle>
                <div className="text-4xl font-bold mt-4">
                  월 {pricingInfo.monthly_subscription.price.toLocaleString()}원
                  <span className="text-sm font-normal">(VAT 포함)</span>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4 mb-8">
                  {pricingInfo.monthly_subscription.includes.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CircleCheck className="w-5 h-5 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">첫 달 특별 혜택</h4>
                  <div className="space-y-2">
                    {pricingInfo.first_month_bonus.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-blue-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg py-6"
                  onClick={handleSubscribe}
                >
무료 상담 신청하기
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Differentiation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">왜 다른가요?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "실제 시험 데이터",
                description: "설문/후기와 차별화",
                icon: <Shield className="w-8 h-8 text-blue-600" />
              },
              {
                title: "20종 원료 비교",
                description: "기능성 원료 비교시험",
                icon: <Beaker className="w-8 h-8 text-green-600" />
              },
              {
                title: "AI 예측 모델",
                description: "체중감량 효과 수치 제공",
                icon: <Star className="w-8 h-8 text-purple-600" />
              },
              {
                title: "합리적 가격",
                description: "월 4만원 구독 서비스",
                icon: <TrendingDown className="w-8 h-8 text-orange-600" />
              },
              {
                title: "안전성 확보",
                description: "식약처 인정 원료만 사용",
                icon: <CircleCheck className="w-8 h-8 text-red-600" />
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scientific Evidence Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">과학적 근거</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">글로벌 표준</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">글로벌 제약사와 FDA도 활용하는 수준의 개인 유전자 정보 반영 생체모델 기반</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">인정된 원료</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">국내 식약처에서 인정된 체중감량 기능성 원료 20종 대상</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">데이터 기반</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">최신 문헌·임상 데이터 + AI 분석 결합으로 데이터로 입증된 맞춤 서비스</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">고객 후기</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{testimonial.name} ({testimonial.age})</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">"{testimonial.review}"</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {testimonial.weight_loss} 감량 성공
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            나만의 체중관리 보조제를 전문가와 상담해보세요.
          </h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">상담 신청 프로세스</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span>간단한 정보 입력 후 상담 신청</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span>1-2일 내 전문 상담사가 카카오톡으로 연락</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span>맞춤 서비스 설명 및 진행 여부 결정</span>
              </div>
            </div>
          </div>
          <p className="text-xl mb-8 text-blue-100">
            무료 상담을 통해 나에게 맞는 서비스인지 확인해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4"
              onClick={handleSubscribe}
            >
              무료 상담 신청하기
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white bg-transparent hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
              onClick={handleSampleReport}
            >
              샘플 리포트 미리보기
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h3 className="text-2xl font-bold">마이진케어</h3>
            </div>
            <p className="text-gray-400 mb-4">실제 시험 데이터 기반 맞춤 체중관리 보조제 추천 서비스</p>
            
            {/* Company Information */}
            <div className="border-t border-gray-700 pt-4 mb-4">
              <div className="space-y-2 text-sm text-gray-400">
                <p className="font-semibold text-white">(주)제핏</p>
                <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-6 space-y-1 sm:space-y-0">
                  <p>사업자등록번호: 179-87-01024</p>
                  <p>전화번호: 053-716-0816</p>
                  <p>이메일: info@zefit.co.kr</p>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              © 2024 MyGeneCare by 제핏. 모든 권리 보유.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
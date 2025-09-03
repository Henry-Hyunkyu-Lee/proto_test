import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CircleCheck, User } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { geneticServiceCreateGeneticTest, subscriptionServiceCreateSubscription } from '@/lib/sdk';

interface FormData {
  full_name: string;
  phone: string;
  email: string;
  agreements: {
    genetic_test: boolean;
    privacy: boolean;
    terms: boolean;
  };
}

function SubscriptionFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    phone: '',
    email: '',
    agreements: {
      genetic_test: false,
      privacy: false,
      terms: false
    }
  });

  const updateFormData = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof FormData],
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Create genetic test inquiry (consultation request)
      const testResponse = await geneticServiceCreateGeneticTest({
        body: {
          user_id: crypto.randomUUID(), // In real app, this would come from auth
          full_name: formData.full_name,
          phone: formData.phone,
          email: formData.email,
          address: {
            postal_code: '',
            address1: '',
            address2: '',
            city: ''
          }
        }
      });

      // Navigate to consultation dashboard
      navigate('/consultation-dashboard', { 
        state: { 
          success: true, 
          testId: testResponse.data.test_id,
          isConsultation: true
        } 
      });
    } catch (error) {
      console.error('상담 신청 실패:', error);
      alert('상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.full_name && formData.phone && formData.email;
      case 2:
        return formData.agreements.privacy;
      default:
        return false;
    }
  };

  const steps = [
    { number: 1, title: '개인정보', icon: User },
    { number: 2, title: '동의서', icon: CircleCheck }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
              <div className="flex items-center space-x-2">
                <Logo size="sm" />
                <h1 className="text-xl font-bold text-gray-900">마이진케어 상담 신청</h1>
              </div>
            </div>
            <Badge variant="secondary">무료 상담</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors
                    ${isActive ? 'bg-blue-600 border-blue-600 text-white' : 
                      isCompleted ? 'bg-green-600 border-green-600 text-white' : 
                      'bg-white border-gray-300 text-gray-500'}
                  `}>
                    {isCompleted ? <CircleCheck className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <p className={`text-sm mt-2 ${isActive || isCompleted ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {currentStep === 1 && '개인정보 입력'}
              {currentStep === 2 && '동의서 확인'}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && '상담을 위한 기본 정보를 입력해주세요.'}
              {currentStep === 2 && '서비스 이용을 위한 동의서를 확인해주세요.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="full_name">이름 *</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="전체 이름을 입력해주세요"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">전화번호 *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="010-0000-0000"
                  />
                </div>
                <div>
                  <Label htmlFor="email">이메일 *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Agreements */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacy"
                      checked={formData.agreements.privacy}
                      onCheckedChange={(checked) => updateFormData('agreements', 'privacy', checked)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="privacy" className="text-sm font-medium leading-none">
                        개인정보 처리방침 동의 *
                      </Label>
                      <p className="text-sm text-gray-600">
                        상담 진행을 위한 개인정보 수집, 이용에 동의합니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">상담 진행 안내</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• 상담 신청 후 1-2영업일 내 전문 상담사가 카카오톡으로 연락드립니다.</li>
                    <li>• 개인별 맞춤 체중관리 서비스에 대해 자세히 안내해드립니다.</li>
                    <li>• 상담은 완전 무료이며, 서비스 진행 여부는 상담 후 결정하시면 됩니다.</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            이전
          </Button>
          
          {currentStep < 2 ? (
            <Button 
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-blue-600 to-green-600"
            >
              다음
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!isStepValid() || loading}
              className="bg-gradient-to-r from-blue-600 to-green-600"
            >
              {loading ? '처리 중...' : '서비스 상담 신청하기'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubscriptionFlow;
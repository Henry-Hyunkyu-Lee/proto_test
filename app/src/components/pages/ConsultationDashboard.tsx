import { MessageCircle, Phone, Calendar, Clock, CircleCheck, User, House } from "lucide-react";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/ui/Logo';

import { 
  geneticServiceGetUserGeneticTest
} from '@/lib/sdk';

interface UserData {
  geneticTest?: any;
}

function ConsultationDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState<UserData>({});
  const [loading, setLoading] = useState(true);
  
  const userId = 'demo-user-id'; // In real app, this would come from auth
  const isNewConsultation = location.state?.success || location.state?.isConsultation;

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Load user's genetic test (consultation request)
        const geneticTest = await geneticServiceGetUserGeneticTest({
          body: { user_id: userId }
        });
        
        setUserData({
          geneticTest: geneticTest.data
        });
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        // Mock data for demo
        setUserData({
          geneticTest: {
            full_name: '김마이진',
            phone: '010-1234-5678',
            email: 'myjin@example.com',
            status: '상담신청'
          }
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Logo size="sm" />
              <h1 className="text-2xl font-bold text-gray-900">마이진케어</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/')}>
                <House className="w-4 h-4 mr-2" />
                홈
              </Button>
              <Button variant="outline">
                <User className="w-4 h-4 mr-2" />
                프로필
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message for New Consultation */}
        {isNewConsultation && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">상담 신청이 완료되었습니다!</h3>
                  <p className="text-blue-700">전문 상담사가 1-2영업일 내 카카오톡으로 연락드립니다.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Consultation Status Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">상담 신청</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="text-green-600 bg-green-100">
                    <CircleCheck className="w-4 h-4" />
                    <span className="ml-2">완료</span>
                  </Badge>
                </div>
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">상담사 연락</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="text-yellow-600 bg-yellow-100">
                    <Clock className="w-4 h-4" />
                    <span className="ml-2">대기중</span>
                  </Badge>
                </div>
                <Phone className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">예상 연락일</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">1-2일</p>
                  <p className="text-sm text-gray-600">내</p>
                </div>
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">연락 수단</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-green-600">카카오톡</p>
                  <p className="text-sm text-gray-600">채팅</p>
                </div>
                <MessageCircle className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="consultation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="consultation">상담 진행상황</TabsTrigger>
            <TabsTrigger value="info">내 정보</TabsTrigger>
            <TabsTrigger value="faq">자주 묻는 질문</TabsTrigger>
          </TabsList>

          <TabsContent value="consultation">
            <div className="space-y-6">
              {/* Consultation Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>상담 진행 상황</CardTitle>
                  <CardDescription>현재 상담 진행 단계를 확인하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CircleCheck className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">상담 신청 완료</h4>
                        <p className="text-sm text-gray-600">개인정보 입력 및 동의서 작성이 완료되었습니다.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">상담사 연락 대기</h4>
                        <p className="text-sm text-gray-600">전문 상담사가 카카오톡으로 연락드릴 예정입니다.</p>
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-900">예상 연락 시간: 1-2영업일 내</p>
                          <p className="text-sm text-blue-700">연락 수단: 카카오톡 채팅</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 opacity-50">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-500">상담 진행</h4>
                        <p className="text-sm text-gray-400">맞춤 서비스 안내 및 상담이 진행됩니다.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 opacity-50">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <CircleCheck className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-500">서비스 시작</h4>
                        <p className="text-sm text-gray-400">상담 후 원하시는 경우 서비스가 시작됩니다.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>연락처 정보</CardTitle>
                  <CardDescription>상담사가 아래 연락처로 연락드릴 예정입니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">전화번호</p>
                        <p className="text-sm text-gray-600">{userData.geneticTest?.phone || '등록된 연락처 없음'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">카카오톡</p>
                        <p className="text-sm text-gray-600">전화번호로 카카오톡 채팅 연락</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>내 정보</CardTitle>
                <CardDescription>등록된 개인정보를 확인하고 수정할 수 있습니다</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>이름</Label>
                    <Input value={userData.geneticTest?.full_name || ''} disabled />
                  </div>
                  <div>
                    <Label>전화번호</Label>
                    <Input value={userData.geneticTest?.phone || ''} disabled />
                  </div>
                  <div>
                    <Label>이메일</Label>
                    <Input value={userData.geneticTest?.email || ''} disabled />
                  </div>
                  <div className="pt-4">
                    <p className="text-sm text-gray-600">정보 수정이 필요한 경우 상담사에게 말씨해 주세요.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>자주 묻는 질문</CardTitle>
                <CardDescription>상담 및 서비스에 대한 궁금한 점들을 확인해보세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h4 className="font-semibold mb-2">상담사는 언제 연락주나요?</h4>
                    <p className="text-sm text-gray-600">상담 신청 후 1-2영업일 내 카카오톡으로 연락드립니다. 주말이나 공휴일에는 연락이 지연될 수 있습니다.</p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h4 className="font-semibold mb-2">상담비용이 있나요?</h4>
                    <p className="text-sm text-gray-600">상담은 완전 무료입니다. 서비스 진행 여부를 결정한 후에만 비용이 발생합니다.</p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h4 className="font-semibold mb-2">상담 후 바로 서비스를 시작해야 하나요?</h4>
                    <p className="text-sm text-gray-600">아니요. 상담을 통해 서비스에 대해 충분히 아신 후 원하시는 경우에만 진행하시면 됩니다.</p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h4 className="font-semibold mb-2">유전자 검사는 어떻게 진행되나요?</h4>
                    <p className="text-sm text-gray-600">상담 후 서비스를 시작하시면 집으로 검사 키트가 배송됩니다. 간단한 침 수집으로 진행됩니다.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">추가 문의사항이 있는데 어떻게 해야 하나요?</h4>
                    <p className="text-sm text-gray-600">상담사가 연락드릴 때 언제든지 문의하시면 됩니다. 그 전에 급한 문의사항이 있으시면 고객센터로 연락 주세요.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default ConsultationDashboard;
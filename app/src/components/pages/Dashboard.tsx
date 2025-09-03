import { Package, Calendar, TrendingDown, User, Settings, FileText, CircleCheck, Clock, Truck, House } from "lucide-react";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { 
  geneticServiceGetUserGeneticTest,
  subscriptionServiceGetUserSubscription,
  subscriptionServiceGetUserDeliveries,
  analyticsServiceGetUserProgressReport,
  analyticsServiceRecordWeight
} from '@/lib/sdk';

interface UserData {
  geneticTest?: any;
  subscription?: any;
  deliveries?: any[];
  progressReport?: any;
}

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState<UserData>({});
  const [loading, setLoading] = useState(true);
  const [newWeight, setNewWeight] = useState('');
  
  const userId = 'demo-user-id'; // In real app, this would come from auth
  const isNewSubscription = location.state?.success;

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Load user's genetic test
        const geneticTest = await geneticServiceGetUserGeneticTest({
          body: { user_id: userId }
        });
        
        // Load subscription
        const subscription = await subscriptionServiceGetUserSubscription({
          body: { user_id: userId }
        });
        
        // Load deliveries
        const deliveries = await subscriptionServiceGetUserDeliveries({
          body: { user_id: userId }
        });
        
        // Load progress report
        const progressReport = await analyticsServiceGetUserProgressReport({
          body: { user_id: userId }
        });
        
        setUserData({
          geneticTest: geneticTest.data,
          subscription: subscription.data,
          deliveries: deliveries.data || [],
          progressReport: progressReport.data
        });
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [userId]);

  const handleRecordWeight = async () => {
    if (!newWeight) return;
    
    try {
      await analyticsServiceRecordWeight({
        body: {
          user_id: userId,
          weight: parseFloat(newWeight)
        }
      });
      
      setNewWeight('');
      // Refresh progress report
      const progressReport = await analyticsServiceGetUserProgressReport({
        body: { user_id: userId }
      });
      
      setUserData(prev => ({
        ...prev,
        progressReport: progressReport.data
      }));
    } catch (error) {
      console.error('체중 기록 실패:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '완료':
      case '활성':
        return 'text-green-600 bg-green-100';
      case '분석중':
      case '배송중':
        return 'text-blue-600 bg-blue-100';
      case '신청':
      case '준비중':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '완료':
        return <CircleCheck className="w-4 h-4" />;
      case '배송중':
        return <Truck className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
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
        {/* Welcome Message for New Users */}
        {isNewSubscription && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <CircleCheck className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-green-900">축하합니다! 구독이 시작되었습니다.</h3>
                  <p className="text-green-700">유전자 검사 키트가 곧 발송됩니다. 3-5영업일 내 배송되는 키트를 기다려주세요.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Status Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">유전자 검사</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Badge className={getStatusColor(userData.geneticTest?.status || '신청')}>
                    {getStatusIcon(userData.geneticTest?.status || '신청')}
                    <span className="ml-2">{userData.geneticTest?.status || '신청'}</span>
                  </Badge>
                </div>
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">구독 상태</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Badge className={getStatusColor(userData.subscription?.status || '활성')}>
                    <CircleCheck className="w-4 h-4" />
                    <span className="ml-2">{userData.subscription?.status || '활성'}</span>
                  </Badge>
                </div>
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">다음 배송</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">7일</p>
                  <p className="text-sm text-gray-600">남음</p>
                </div>
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">체중 변화</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {userData.progressReport?.weight_progress?.weight_change 
                      ? `${userData.progressReport.weight_progress.weight_change > 0 ? '+' : ''}${userData.progressReport.weight_progress.weight_change.toFixed(1)}kg`
                      : '-'
                    }
                  </p>
                  <p className="text-sm text-gray-600">이번 달</p>
                </div>
                <TrendingDown className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="progress">진행상황</TabsTrigger>
            <TabsTrigger value="deliveries">배송내역</TabsTrigger>
            <TabsTrigger value="settings">설정</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Current Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>나의 추천 보조제</CardTitle>
                  <CardDescription>유전자 분석 기반 맞춤 추천</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.geneticTest?.status === '완료' ? (
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">가르시니아 + 녹차 복합체</h4>
                          <Badge variant="outline">#1 추천</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">예상 효과: 2.3-3.1kg 감량 (3개월)</p>
                        <Progress value={89} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">신뢰도 89%</p>
                      </div>
                      <Button className="w-full" onClick={() => navigate('/sample-report')}>
                        상세 분석 리포트 보기
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="font-semibold text-gray-600">유전자 분석 진행 중</h4>
                      <p className="text-sm text-gray-500">결과가 나오면 맞춤 추천을 확인할 수 있습니다.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Weight Entry */}
              <Card>
                <CardHeader>
                  <CardTitle>체중 기록</CardTitle>
                  <CardDescription>진행상황 추적을 위해 체중을 기록해주세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="weight">현재 체중 (kg)</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="weight"
                          type="number"
                          value={newWeight}
                          onChange={(e) => setNewWeight(e.target.value)}
                          placeholder="체중 입력"
                        />
                        <Button onClick={handleRecordWeight} disabled={!newWeight}>
                          기록
                        </Button>
                      </div>
                    </div>
                    
                    {userData.progressReport?.weight_progress?.current_weight && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          최근 기록: {userData.progressReport.weight_progress.current_weight}kg
                        </p>
                        <p className="text-sm text-blue-700">
                          변화: {userData.progressReport.weight_progress.weight_change > 0 ? '+' : ''}
                          {userData.progressReport.weight_progress.weight_change.toFixed(1)}kg
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>진행상황 대시보드</CardTitle>
                  <CardDescription>나의 체중 관리 진행상황을 확인해보세요</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.progressReport ? (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">총 기록 일수</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {userData.progressReport.progress_summary?.total_days || 0}일
                          </p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">체중 변화</p>
                          <p className="text-2xl font-bold text-green-600">
                            {userData.progressReport.weight_progress?.weight_change 
                              ? `${userData.progressReport.weight_progress.weight_change > 0 ? '+' : ''}${userData.progressReport.weight_progress.weight_change.toFixed(1)}kg`
                              : '0kg'
                            }
                          </p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <p className="text-sm text-gray-600">평균 만족도</p>
                          <p className="text-2xl font-bold text-purple-600">
                            {userData.progressReport.supplement_feedback?.average_effectiveness?.toFixed(1) || '0'}/10
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">체중 변화 추이</h4>
                        <p className="text-sm text-gray-600">
                          현재 추세: {userData.progressReport.progress_summary?.trend || '데이터 없음'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <TrendingDown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">아직 체중 기록이 없습니다.</p>
                      <p className="text-sm text-gray-500">체중을 기록하여 진행상황을 추적해보세요.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deliveries">
            <Card>
              <CardHeader>
                <CardTitle>배송 내역</CardTitle>
                <CardDescription>매월 보조제 배송 상황을 확인할 수 있습니다</CardDescription>
              </CardHeader>
              <CardContent>
                {userData.deliveries && userData.deliveries.length > 0 ? (
                  <div className="space-y-4">
                    {userData.deliveries.map((delivery: any, index: number) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">배솤 #{index + 1}</h4>
                          <Badge className={getStatusColor(delivery.status)}>
                            {getStatusIcon(delivery.status)}
                            <span className="ml-2">{delivery.status}</span>
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>배송지: {delivery.delivery_address?.address1 || '주소 정보 없음'}</p>
                          {delivery.tracking_number && (
                            <p>운송장 번호: {delivery.tracking_number}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">아직 배송 내역이 없습니다.</p>
                    <p className="text-sm text-gray-500">첫 번째 보조제가 곧 배송됩니다.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>구독 관리</CardTitle>
                  <CardDescription>구독 상태를 변경하거나 결제 정보를 수정할 수 있습니다</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">현재 구독 상태</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge className={getStatusColor(userData.subscription?.status || '활성')}>
                          {userData.subscription?.status || '활성'}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">월 40,000원</p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">일시정지</Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-300">해지</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">다음 결제일</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>계정 설정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    개인정보 수정
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    배송주소 뎀경
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    알림 설정
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Dashboard;
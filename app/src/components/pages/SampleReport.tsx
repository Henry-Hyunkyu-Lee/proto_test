import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Star, TrendingDown, Shield, Beaker } from 'lucide-react';
import { geneticServiceGetSampleReport } from '@/lib/sdk';

interface SampleReportData {
  user_info: {
    name: string;
    test_date: string;
    report_date: string;
  };
  genetic_analysis: {
    metabolism_type: string;
    fat_burning_efficiency: number;
    carb_sensitivity: string;
    genetic_risk_factors: string[];
  };
  ingredient_test_results: Array<{
    name: string;
    score: number;
    predicted_effect: string;
  }>;
  top3_recommendations: Array<{
    rank: number;
    supplement: string;
    ingredients: string[];
    predicted_weight_loss: string;
    confidence: number;
    reason: string;
  }>;
  lifestyle_recommendations: string[];
  scientific_basis: {
    test_method: string;
    reference_studies: number;
    ai_analysis_accuracy: string;
    fda_approved_ingredients: string;
  };
}

function SampleReport() {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState<SampleReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSampleReport = async () => {
      try {
        const response = await geneticServiceGetSampleReport();
        setReportData(response.data);
      } catch (error) {
        console.error('샘플 리포트 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadSampleReport();
  }, []);

  const getEffectColor = (effect: string) => {
    if (effect.includes('높음')) return 'bg-green-500';
    if (effect.includes('중간')) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getEffectTextColor = (effect: string) => {
    if (effect.includes('높음')) return 'text-green-700';
    if (effect.includes('중간')) return 'text-yellow-700';
    return 'text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">샘플 리포트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">샘플 리포트를 불러올 수 없습니다.</p>
          <Button onClick={() => navigate('/')}>홈으로 돌아가기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">마이진케어 샘플 리포트</h1>
              </div>
            </div>
            <Button onClick={() => navigate('/subscribe')} className="bg-gradient-to-r from-blue-600 to-green-600">
              나도 시작하기
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Header */}
        <Card className="mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
            <div className="text-center">
              <CardTitle className="text-2xl mb-2">개인 맞춤 유전자 분석 리포트</CardTitle>
              <Badge variant="secondary" className="bg-white text-blue-600">샘플 리포트</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">분석 대상</p>
                <p className="font-semibold">{reportData.user_info.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">검사일</p>
                <p className="font-semibold">{reportData.user_info.test_date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">리포트 생성일</p>
                <p className="font-semibold">{reportData.user_info.report_date}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Genetic Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Beaker className="w-5 h-5 text-blue-600" />
              <span>유전자 분석 결과</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">대사 특성</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>대사 유형</span>
                    <Badge variant="outline">{reportData.genetic_analysis.metabolism_type}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>지방 연소 효율</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={reportData.genetic_analysis.fat_burning_efficiency * 10} className="w-20" />
                      <span className="text-sm font-semibold">{reportData.genetic_analysis.fat_burning_efficiency}/10</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>탄수화물 민감도</span>
                    <Badge variant="outline">{reportData.genetic_analysis.carb_sensitivity}</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">유전적 위험요소</h4>
                <div className="space-y-2">
                  {reportData.genetic_analysis.genetic_risk_factors.map((factor, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredient Test Results */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>20종 기능성 원료 시험 결과</span>
            </CardTitle>
            <CardDescription>
              개인 유전자 특성을 반영한 생체모델에서 직접 시험한 결과입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportData.ingredient_test_results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <span className="font-medium">{result.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Progress value={result.score * 10} className="w-20" />
                      <span className="text-sm font-semibold">{result.score}/10</span>
                    </div>
                    <Badge className={getEffectTextColor(result.predicted_effect)} variant="outline">
                      {result.predicted_effect}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <span>TOP 3 맞춤 보조제 추천</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {reportData.top3_recommendations.map((rec, index) => (
              <Card key={index} className="border-2 border-blue-100">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                        #{rec.rank}
                      </Badge>
                      <CardTitle className="text-lg">{rec.supplement}</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      신뢰도 {rec.confidence}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold mb-2">주요 성분</h5>
                      <div className="flex flex-wrap gap-2">
                        {rec.ingredients.map((ingredient, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">예상 체중감량</h5>
                      <p className="text-lg font-bold text-green-600">{rec.predicted_weight_loss}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h5 className="font-semibold text-blue-900 mb-1">추천 이유</h5>
                    <p className="text-blue-800 text-sm">{rec.reason}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Lifestyle Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-purple-600" />
              <span>생활습관 개선 권장사항</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportData.lifestyle_recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-purple-800">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scientific Basis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>과학적 근거</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">시험 방법</p>
                <p className="font-semibold">{reportData.scientific_basis.test_method}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">참조 연구</p>
                <p className="font-semibold text-blue-600">{reportData.scientific_basis.reference_studies}편</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">AI 분석 정확도</p>
                <p className="font-semibold text-green-600">{reportData.scientific_basis.ai_analysis_accuracy}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">식약처 인정 원료</p>
                <p className="font-semibold text-red-600">{reportData.scientific_basis.fda_approved_ingredients}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              이제 나만의 맞춤 분석 리포트를 받아보세요!
            </h3>
            <p className="text-blue-100 mb-6">
              실제 유전자 검사와 20종 원료 시험을 통해 
              더 정확한 개인 맞춤 추천을 받으실 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => navigate('/subscribe')}
              >
                나만의 맞춤 분석 시작하기
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => navigate('/')}
              >
                더 자세히 알아보기
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-8 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h3 className="text-xl font-bold">마이진케어</h3>
            </div>
            
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
        </footer>
      </div>
    </div>
  );
}

export default SampleReport;
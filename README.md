# MyGeneCare 프로토타입

개인 유전자 정보 기반 맞춤형 건강 보조제 추천 서비스의 정적 웹 프로토타입입니다.

## 📁 프로젝트 구조

```
proto_test/
├── index.html   # 메인 랜딩 페이지 (GitHub Pages 기본 파일)
├── report.html  # 개인 맞춤 분석 리포트 샘플 페이지
├── README.md    # 프로젝트 설명
└── .gitignore   # Git 무시 파일 목록
```

## 🚀 주요 기능

### 메인 페이지 (index.html)
- 서비스 소개 및 특징
- 사용자 후기 (감량 성공 사례 배지 포함)
- FAQ 섹션
- 무료 상담 신청 링크

### 리포트 페이지 (report.html)
- 개인별 맞춤 분석 결과 샘플
- 추천 보조제 정보
- 과학적 근거 제시
- CTA (Call-to-Action) 섹션

## 🎨 디자인 특징

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **Tailwind CSS**: CDN을 통한 유틸리티 기반 스타일링
- **현대적인 UI/UX**: 깔끔하고 직관적인 인터페이스
- **그라데이션 효과**: 브랜드 컬러를 활용한 시각적 매력도 향상

## 🛠️ 기술 스택

- **Frontend**: HTML5, Tailwind CSS (CDN)
- **배포**: 정적 파일 호스팅 가능한 모든 플랫폼

## 🌐 사용 방법

### 1. GitHub Pages로 배포 (추천)

1. **저장소 생성 및 푸시**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/repository-name.git
   git push -u origin main
   ```

2. **GitHub Pages 활성화**:
   - GitHub 저장소 설정 → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - 저장 후 몇 분 대기

3. **접속**: `https://username.github.io/repository-name`

### 2. 로컬에서 실행
```bash
# 웹 브라우저에서 직접 HTML 파일 열기
open index.html  # macOS
start index.html # Windows
```

### 3. 기타 정적 호스팅
- Netlify: 드래그 앤 드롭으로 간편 배포
- Vercel: GitHub 연동 자동 배포
- Firebase Hosting: Google 플랫폼 활용

## 📱 주요 섹션

### index.html
- **히어로 섹션**: 메인 제목과 서비스 소개
- **특징 소개**: 개인 맞춤형 추천, 과학적 근거 기반
- **사용자 후기**: 실제 감량 성공 사례와 별점 평가
- **FAQ**: 자주 묻는 질문과 답변 (아코디언 UI)

### report.html
- **개인 정보**: 샘플 사용자 정보
- **추천 결과**: 맞춤 보조제 추천
- **과학적 근거**: 참조 연구, AI 분석 정확도 등
- **CTA 섹션**: 서비스 신청 안내

## 🎯 특징

- 완전한 정적 파일로 구성
- 외부 의존성 최소화 (Tailwind CSS CDN만 사용)
- 모바일 우선 반응형 디자인
- 접근성을 고려한 시맨틱 HTML

## 📞 문의

무료 상담 및 문의는 웹사이트의 상담 신청 링크를 통해 가능합니다.

## 📄 라이센스

© 2024 MyGeneCare by 제핏. All rights reserved.

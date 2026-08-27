# 🌤️ SKALA Vue.js Weather Dashboard

Vue.js 수업에서 학습한 Composition API, Component, Vue Router, Pinia,
Axios, Element Plus, Vite를 활용하여 구현한 실시간 날씨 대시보드입니다.

---

## 주요 기능

- OpenWeatherMap API 기반 실시간 날씨 조회
- 기본 도시 서울 / 수원 / 부산 / 제주 표시
- 사용자가 원하는 도시 직접 검색
- 도시별 상세 날씨 조회
- Vue Router 기반 페이지 이동
- Pinia를 활용한 전역 상태 관리
- Celsius(℃) / Fahrenheit(℉) 단위 변경
- 개인 추가 기능인 간단 모드 지원
- Element Plus 기반 UI 구성
- API Loading / Error 상태 처리
- Catch-all Route를 이용한 404 화면 처리

---

## 사용 기술

- Vue 3
- Composition API
- Vue Router
- Pinia
- Axios
- Element Plus
- OpenWeatherMap API
- Vite
- ESLint
- Prettier
- Vercel

---

## 실행 방법

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 .env 파일을 생성합니다.
VITE_OPENWEATHER_API_KEY=본인의_OpenWeatherMap_API_KEY

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 코드 검사

```bash
npm run lint
```

### 5. 코드 Formatting

```bash
npm run format
```

### 6. Production Build

```bash
npm run build
```

## 구현 및 수정 내용

- Weather Dashboard 화면 구성
- 검색 기능 구현
- 날씨 Component 구조화
- Props / Emits를 활용한 Component 통신
- Vue Router 기반 Home / Detail / About / 404 화면 구성
- Pinia를 활용한 전역 온도 단위 관리
- Vue Router 및 Query Parameter를 이용한 상세 페이지 이동
- 간단 모드 추가
- Axios와 OpenWeatherMap API 연동
- 임의 도시 검색 기능 추가
- Element Plus UI 적용
- API Loading / Error UI 구현
- .env를 활용한 API Key 관리
- REST Countries API를 추가 연동하여 검색한 도시의 국가명과 국기를 표시하도록 확장
- Vite Production Build 및 Vercel 배포

## 외부 API 연동

### OpenWeatherMap API

실시간 날씨 데이터를 조회하기 위해 사용

- 현재 기온
- 체감 온도
- 날씨 상태
- 습도
- 풍속
- 기압
- 날씨 아이콘

### REST Countries API

날씨 검색 결과의 국가 코드를 이용하여 추가적인 국가 정보 조회

- 국가명
- 국가 국기

OpenWeatherMap의 날씨 데이터와 REST Countries의 국가 정보를 결합하여
사용자에게 풍부한 도시 정보를 제공하도록 기능을 확장했습니다.

## 추가 기능

### 1. 임의 도시 검색

기본으로 제공된 도시 외에도 사용자가 원하는 도시명을 직접 입력하여
OpenWeatherMap API에서 실시간 날씨를 조회할 수 있습니다.

### 2. 간단 모드

Pinia Store에 compactMode 상태를 추가하여 일반 모드와 간단 모드를
전환할 수 있도록 구현했습니다.
간단 모드에서는 핵심적인 기온과 날씨 상태만 표시하고,
일반 모드에서는 체감 온도, 습도, 풍속, 기압까지 표시합니다.

### 3. 온도 단위 변경

Pinia의 전역 State를 활용하여 메인 화면과 상세 화면에서
℃ / ℉ 단위가 동일하게 변경되도록 구현했습니다.

## AI 도구 활용

Vue.js 실습을 진행하면서 AI 도구를 다음 범위에서 활용했습니다.

- Vue Component 구조 작성 참고
- UI 구성 및 Element Plus 적용 방법 참고
- 오류 원인 분석 및 코드 수정 방향 참고
- README 구성 참고
- OpenWeatherMap API 요청 및 401 오류 원인 확인
- ESLint / Build 오류 확인 및 수정

## 배포

### GitHub

GitHub 저장소 주소: https://github.com/7lram/skala-vue-weather

### Vercel

Vercel 배포 주소: https://skala-vue-weather-49en4dd7n-7lram.vercel.app

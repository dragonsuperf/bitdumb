# kakao_cloud_portfolio

Kakao Career Boost Program for Cloud - 카카오 클라우드 콘솔(포탈) 프론트엔드 개발자 모집에 지원하며 포트폴리오로 제출할 내용을 저장하는 레포지토리 입니다.

## Goal
- 알고있는 기술 스택을 최대한 활용하여 그 것을 드러낼 수 있도록
- 요구하는 기술 스택을 최대한 만족할 수 있도록

## 요구하는 기술 및 경험
- [ ] HTML5, CSS3 기본 지식 및 마크업 능력
- [ ] JavaScript 사용에 능숙하며 ES6+ 표준 스펙을 활용한 개발 경험
- [ ] React 또는 Vue.js 를 활용한 SPA 개발 경험 (2년 이상)
- [ ] REST API 를 활용한 Web 개발 경험
- [ ] Visualization Library 활용 경험 (Chart.js, D3.js, etc...)
- [x] webpack, Babel 등을 이용한 프로젝트 환경 구성 경험
  - Webpack, Babel으로 포트폴리오 세팅
- [ ] UI 테스트 구축 및 개발 경험
- [ ] TypeScript 개발 경험
- [ ] Git, Zeplin, Jenkins, Docker 등 개발 및 협업에 필요한 도구의 사용에 능숙하신 분
- [ ] 클라우드 서비스 이용 경험 (AWS, GCP, Azure, etc)

## 2021-03-11
- Visualization Library를 활용하기 좋은 Open API를 선정하기 위한 후보
  - 시국에 맞는 코로나19 Open API
  - 빠른 주기로 업데이트되는 암호화폐 Open API
- 조금 더 동적인 데이터를 다루는 암호화폐 Open API가 더 적합하다고 생각하여 이를 채택
- Typescript 세팅
- eslint, prettier 세팅
- jest, rtl 세팅 후 간단한 테스트 작성
- Visualization Library 후보
  - d3 ( React와 같이 사용하려면 신경을 써야하는 부분이 있다 ) 
  - @toast-ui/react-chart ( 줌 기능이 이미 존재한다, 디자인이 괜찮다 )
  - react-chartjs-2

## 2021-03-12

### Data Visualization Library 결정
@toast-ui/react-chart가 Stock chart로 많이 쓰이는 candle stick chart를 기본 지원하므로 이를 채택하기로 결정

### 하지만 문제 발생..
- ```TypeError: y[t] is not a constructor``` 라는 에러와 함께 런타임 에러가 발생 😥  
- 무엇이 문제인지 파악하기 위해 가장 의심되는 설정을 바꿔서 시도해보았고, CRA로 새로 세팅을하고 시도하니까 멀쩡하게 잘됨  
- 어제 eslint, prettier 설정에 애를 먹었고 도중에 의존성이 계속 말썽이였기 때문에 번들러인 webpack 설정 중 어느것이 말썽을 일으켰을 것이라고 추측.. ( 본인의 설정을 믿지 못했음 )  
- 무엇이 문제인지 쉽게 찾아지지 않아서 webpack, babel, typescript, react 전부 다시 세팅해서 시도해보았지만 안됨  
- CRA에서는 되고 직접 세팅하면 동작하지 않기 때문에 CRA 설정과 직접 세팅의 차이점을 확인해가면서 시도해보기로 결정하고 eject 명령으로 CRA의 설정파일을 노출 시킴   
- 가장 의심되던 webpack은 직접 세팅이 webpack은 5.24.4 버전, CRA이 webpack은 4.44.2 버전이었고, 직접 세팅의 webpack을 4.44.2 버전으로 다운그레이드 하니 정상 동작하는 것을 확인

### Today I did
- webpack version을 4.44.2로 다운그레이드
- Toast ui chart로 candle stick chart 예제 컴포넌트 작성
- 혹시 도움이 될까 싶어서 해당 레포지토리에 이슈를 남김
  - https://github.com/nhn/tui.chart/issues/619

## 2021-03-13

### API와의 통신을 위해 axios 사용
axios를 사용한 이유는? (굉장히 단순한 이유)
- Ready to use이기 때문에 빠르게 개발할 수 있다
- 익숙하다

### Bithumb의 Open Api 중 CandleStick API를 사용해 암호화폐의 정보를 가져오는 로직을 구현
- 일단 BTC만 가져올 수 있도록 해뒀음

### Open Api에서 가져온 데이터를 차트에 그릴 수 있는 데이터로 변환하는 메소드를 구현
- 하지만 정상적으로 동작하지 않는다.. 😪😪😪
- 데이터의 범위가 작을 때 차트에 정상적으로 그려지지 않는 것 같다.. ( @toast-ui/chart의 문제인가? )

### 특이사항
- 오래동안 사용하지 않았던 랩탑에 개발환경을 새로 세팅하고 코딩을 했는데, 플러그인과 린트가 어째서인지 제대로 동작하지 않는다..
- 그래서 오늘 커밋한 코드는 정말 엉망이다

## 2021-03-14

### Visualization Library를 @toast-ui/chart에서 react-google-chart로 변경
- tui-chart에서는 어떤 이유 인지 정확히 알 수 없었지만 변동폭이 적으면 차트 내에서 y-axis가 이상하게 변하는 버그가 존재했음
- 디버깅하는 시간이 길어지자 일정을 생각해서 다른 라이브러리를 사용하는 것으로 눈을 돌림
- candlestick chart가 존재하는 react-google-chart로 일단 결정

### react-google-chart로 바꾸었지만 d3를 고려 중..
- google chart에서는 원하는 이벤트 핸들링( 마우스 스크롤 )이 없는 것으로 판단되기에 d3를 써야할 지 굉장히 고민중
- d3를 사용한다면 러닝 커브와 구현 시간 때문에 일정 중 많은 시간을 사용해야 할 것으로 판단되어 잠시 보류중

### 수정해야 하는 문제들
- 시간이 제대로 표기되지 않음
- http api를 통해서 데이터를 받아오고 있는데, 실시간 데이터 처리를 위해 첫번째 로드 이 후에는 websocket을 사용해서 차트를 그릴 수 있도록 수정해야함

### 추가로..
- 구현해야할 항목들을 정리할 필요가 있다고 생각됨
- 프로토타이핑을 해보는 것도 좋은 아이디어 일지도..

## 2021-03-15

### react-use-websocket을 사용해서 웹소켓 테스트
- Bithumb Websocket API를 구독하고 콘솔에 출력하도록 해두었음

### 차트의 hAxis에 표현되는 데이터 타입을 string에서 date로 변경
- date format 변환에는 Moment를 사용

### 추가로
- 점점 라이브러리만 늘어나고 있다. 직접 구현을 하면 좋겠지만, 구현을 하는데 시간을 쏟기보다는 먼저 형태를 갖추고 싶다. 변명이지만 모든 기능을 전부 구현하기에는 시간안에 원하는 것을 만들지 못할거 같다..

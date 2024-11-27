# next-image 서버 만들기

next/image의 로직을 분석하고 직접 만들어 본다.

### 구조

#### apps/ssr
page-router 처럼 커스텀 ssr을 제공하는 서버

#### apps/stream
app-router 처럼 커스텀 스트림 ssr을 제공하는 서버

### 주의사항
nodemon의 ignore에 반드시 resources(빌드 에셋이 들어있는 폴더)를 추가하여
서버 실행시 무한 재시작을 방지

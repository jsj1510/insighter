1. node_modules 설치

   npm install || yarn add

2. 프로젝트 실행

   yarn run dev

3. json-server 실행

   yarn json-server

MOCK API 를 json-server를 사용해 구현 하였습니다.
날짜 별 필터를 문서에 맞춰 적용해도 기능을 하지 않는 이슈가 있어
받아온 데이터에서 같은 페이지에 있는 10개의 리스트 중 에서만
날짜 필터가 적용이 됩니다.
날짜 필터를 적용 후 날짜 정렬 기능을 사용할 시 API를 조건에 맞게
재 호출을 해서 리스트 해당 페이지가 비어 있는 이슈가 나타날 수 있습니다.

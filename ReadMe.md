# 온라인 책 쇼핑몰 API 설계 프로젝트

## 기능목록

1. 회원가입
2. 로그인
3. 비밀번호초기화
4. 메인 페이지

- 메인 슬라이드
- 검색
- 신간안내

5. 목록

- 도서 목록 노출
- 검색 기능

6. 상세(1)

- 세부 도서 정보 노출
- 좋아요
- 장바구니 담기

7. 상세(2)

- 리뷰 목록 노출
- 베스트 목록 노출

8. 장바구니

- 장바구니 목록
- 장바구니에서 제거
- 주문하기

9. 주문서 작성

- 선택 상품 목록 노출
- 결제하기 요청

10. 주문목록

- 주문서 목록 노출
- 배송추적
- 상세정보

## API설계

회원가입  
Method: POST  
URL: "/join"  
HTTP status code: 성공:201  
req: id(email),password  
res: message: 성공/실패

로그인  
Method: POST  
URL: "/login"  
HTTP status code: 성공:200  
req: id(email), password  
res: message: 성공/실패, cookie: jwt(성공시)

비밀번호 초기화 요청  
Method: POST  
URL: "/reset"  
HTTP status code: 성공:200  
req: id(email)  
res: message: 성공/실패

비밀번호 초기화
Method: PUT
URL: "/reset"
HTTP status code: 성공:200
req: password
res: message: 성공/실패

## 패키지 구조 (DDD)

회원  
도서  
주문  
배송

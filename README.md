# "GrapeField" 공연/전시 정보 통합 제공 및 커뮤니티 플랫폼
<p align="middle" style="margin: 0; padding: 0;">
  <img width="360px" src="https://github.com/user-attachments/assets/dc348de4-aecb-4ce0-816e-08062ab7ed74">
</p>

<p align="middle">
[플레이 데이터] 한화시스템 BEYOND SW캠프 12기
<br>🧑🏻‍🌾 CATCHER 파수꾼 팀 🍇
</p>

## 😃 팀원 소개
<figure>
    <table>
      <tr>
        <td align="center"><img src="" width="180px"/></td>
        <td align="center"><img src="" width="180px"/></td>
        <td align="center"><img src="" width="180px"/></td>
	    <td align="center"><img src="" width="180px"/></td>
      </tr>
      <tr>
        <td align="center">팀장: <a href="https://github.com/bdt6246">김혜정</a></td>
        <td align="center">팀원: <a href="https://github.com/daydeiday">곽효림</a></td>
        <td align="center">팀원: <a href="https://github.com/s00ya" >정지수</a></td>
        <td align="center">: <a href="https://github.com/J0a0J">김지원</a></a></td>
      </tr>
    </table>
</figure>

## 🔗 화면설계서
- [Figma 화면 설계서](https://www.figma.com/design/a0ICwRU8Sc7fTzA3aDfpTi/GrapeField?node-id=84-5&p=f&t=nB2EEGHnmULDk6D9-0)
---

## 🔗 배포 링크

- [🔗 Grapefield ](https://grapefield.kro.kr/)

<br>

---

## 🛠️ 기술 스택

### 🖥️ Frontend
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge)
![Pinia](https://img.shields.io/badge/Pinia-ffe066?style=for-the-badge&logo=pinia&logoColor=black)
![WebSocket](https://img.shields.io/badge/WebSocket-000000?style=for-the-badge)
![STOMP.js](https://img.shields.io/badge/STOMP.js-6A1B9A?style=for-the-badge)
![SockJS](https://img.shields.io/badge/SockJS-FD4F00?style=for-the-badge)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)


---
## 페이지 설명
1. 회원가입 및 로그인
- 일반 회원가입
- 이메일 인증 통해 비밀번호 찾기
2. 마이페이지
- 사용자 정보: 개인정보(전화번호, 주소 등) 수정 및 회원 탈퇴 기능
- 
내 게시글 목록: 커뮤니티에 작성한 게시글 목록 조회 및 수정, 삭제
내 주문 내역: 주문 내역 조회 및 상세 조회, 상세 조회 시 환불 신청 기능
알림 내역: 공통 및 개인화 알림 목록 조회, 알림 설정 on/off 기능
비밀번호 바꾸기: 비밀번호 바꾸는 기능
제품
제품 목록: 제품 목록 조회 (제품명, 평점, 설명 등)
제품 상세: 제품 상세 설명, 리뷰 기능(등록, 삭제)
제품 검색(미구현): 제품명으로 검색 기능, 제품 카테고리별 검색 기능
제품 리뷰 기능: 리뷰 작성, 별점 평가, 주기적인 별점 업데이트 기능
제품 간 비교: 사용자가 지정한 비교 대상 제품을 자기 제품과 비교하는 기능
장바구니 & 위시리스트
제품 목록 및 상세 페이지에서 장바구니에 추가 가능
장바구니에서 목록 삭제 기능
장바구니 목록 팝업/장바구니 페이지에서 확인 기능
장바구니 항목 수량 변경 기능
장바구니 비우기 기능
위시리스트에 항목 추가 기능
위시리스트에서 항목 제거 기능
위시리스트 조회 기능
구매
장바구니에 담긴 제품(예: 메모리, SSD 등)을 즉시 구입 가능
카카오페이 결제 가능(신용 카드 등 타 결제 방식 미구현)
결제 검증 기능
사용자 배송 정보 저장 기능
결제시 쿠폰 사용 기능
결제 성공 시 재고 차감 기능
환불 시 재고 및 쿠폰 롤백 기능
사용자의 주문 내역 확인 기능
쿠폰
사용자 지정 쿠폰 발송 기능
모든 사용자에게 수동으로 쿠폰 발송 가능
선착순 쿠폰 발급 이벤트 등록 기능
선착순 이벤트 쿠폰 발급 기능
커뮤니티
게시글(카테고리, 제목, 내용, 첨부파일)과 함께 작성 가능
게시글 조회(최신순, 댓글순, 좋아요순) 가능
게시글 상세보기 가능
게시글 좋아요 / 싫어요 가능
게시글 검색(제목, 내용, 작성자) 가능
게시글 수정, 삭제 가능
댓글 작성 가능
댓글 수정, 삭제 가능
추천
전체 추천: 신규 등록 상품, 위시리스트 상위 상품, 판매량 상위 상품
개인화 추천: 사용자 등록 및 관심 제품과 유사한 제품 추천, 유사한 사용자의 관심 제품 추천
비교 페이지: 사용자가 등록한 제품과 유사한 제품을 비교하는 기능
알림
정기 알림 기능(매월 첫날 쿠폰 발급 안내, 매일 오전 장바구니 리마인드 알림, 위시리스트 리마인드 알림)
실시간 알림 기능(미구현) (주문 완료, 상품 재입고, 품절임박 알림)
대시보드
이 달의 신규 회원 수, 총 수입, 총 주문 수 및 총 주문 취소 수 확인 가능
월간 수입 비교 그래프 제공
제품 등록 및 정보 수정, 삭제 기능
사용자 별 정보 조회 및 주문 내역 조회 기능
사용자의 제품 환불 요청 처리
사이트 공지 알람 기능


---

## 📁 디렉토리 구조

<details>
<summary><strong>📦 src/</strong> 클릭하여 패키지 구조 보기</summary>
<pre>
src    
├── admin    
│   ├── Detail.vue            # 공지사항, QnA, FAQ 상세    
│   ├── List.vue              # 공지/QnA/FAQ/공연·전시 신청 목록    
│   ├── Report.vue            # 신고 내역 (리스트)      
│   └── Request.vue           # 공연·전시 신청 페이지    
│    
├── common    
│   ├── Header.vue    
│   ├── Footer.vue    
│   └── Sidebar.vue    
│    
├── events    
│   ├── chat    
│   │   ├── List.vue          # 참여 채팅방 목록    
│   │   ├── Detailvue         # 채팅방 참여    
│   │   ├── ListSmall.vue     # 참여 채팅방 목록 (작은 버전)    
│   │   └── DetailSmall.vue   # 채팅방 참여 (작은 버전)    
│   │    
│   ├── post    
│   │   ├── List.vue          # 게시글 목록    
│   │   ├── Detail.vue        # 게시글 상세    
│   │   ├── Comment.vue       # 댓글 영역    
│   │   └── Register.vue      # 게시글 작성    
│   │    
│   ├── Detail.vue            # 공연·전시 상세    
│   ├── EventHeader.vue       # 상단 배너/소개    
│   ├── List.vue              # 공연·전시 목록    
│   └── Review.vue            # 한줄 후기 및 별점    
│    
├── user    
│   ├── Login.vue    
│   ├── Signup.vue    
│   └── UserInfo.vue    
</pre>

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

GradpeFiled_Front

src 패키지 구조
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

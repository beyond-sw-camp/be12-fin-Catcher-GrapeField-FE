<script setup>
import CategoryNav from "/src/search/CategoryNav.vue";
</script>

<template>
  <div data-v-7a7a37b1="" data-layer="검색 - 통합 결과" class="wrapper relative mt-4">
    <div data-layer="Wrapper Frame"
         class="inline-flex flex-col justify-start items-start gap-5">
      <nav data-layer="검색결과 카테고리 바" class="self-stretch h-28 relative">
        <div data-layer="Title"
             class="left-0 top-0 absolute justify-start text-neutral-800 text-2xl font-bold font-['Inter']">'햄릿' 검색 결과
        </div>
        <div data-layer="Frame 1321317464"
             class="w-100 h-14 left-0 top-[47px] absolute inline-flex justify-start items-start">
          <router-link to="/search" data-layer="통합검색" class="w-48 h-14 px-7 py-5 bg-white flex justify-center items-center gap-2.5">
            <div data-layer="통합검색"
                 class="text-center justify-start text-violet-600 text-base font-bold font-['Inter']">통합검색
            </div>
          </router-link>
          <router-link to="/search/events" data-layer="공연/전시" class="w-48 h-14 px-7 py-5 bg-white flex justify-center items-center gap-2.5">
            <div data-layer="공연/전시" class="text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">
              공연/전시
            </div>
          </router-link>
          <router-link to="/search/post" data-layer="게시판" class="w-48 h-14 px-9 py-5 bg-white flex justify-center items-center gap-2.5">
            <div data-layer="게시판" class="text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">
              게시판
            </div>
          </router-link>
          <router-link to="/search/review" data-layer="한줄평" class="w-48 h-14 px-9 py-5 bg-white flex justify-center items-center gap-2.5">
            <div data-layer="한줄평" class="text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">
              한줄평
            </div>
          </router-link>
        </div>
      </nav>
      <div data-layer="section_events_result" class="self-stretch inline-flex flex-col justify-start items-start gap-4">
        <div data-layer="title 공연/전시(n)" class="self-stretch inline-flex justify-between items-center">
          <div data-layer="공연/전시 (7)" class="justify-start text-neutral-800 text-xl font-bold font-['Inter']">공연/전시 (7)</div>
          <router-link to="/search/events" data-layer="더보기" class="w-12 h-3.5 text-center justify-start text-violet-600 text-base font-bold font-['Inter']">더보기</router-link>
        </div>
        <div data-layer="통합검색-공연/전시 grid frame" class="self-stretch inline-flex justify-start items-center gap-5">
          <div data-layer="통합검색-공연/전시 grid item1" class="w-96 h-44 px-3.5 py-5 bg-white outline outline-2 outline-offset-[-1px] outline-violet-50 inline-flex flex-col justify-start items-start gap-2.5">
            <div data-layer="Frame 1321317469" class="w-80 inline-flex justify-between items-start">
              <div data-layer="Rectangle 28" class="w-28 h-36 bg-violet-50 rounded-[5px]"></div>
              <div data-layer="Frame 1321317468" class="w-44 h-36 inline-flex flex-col justify-between items-start">
                <div data-layer="2025 특별전시 '햄릿'" class="justify-start text-neutral-800 text-lg font-bold font-['Inter']">2025 특별전시 '햄릿'</div>
                <div data-layer="2025.05.01 ~ 2025.07.30" class="w-40 justify-start text-zinc-600 text-sm font-normal font-['Inter']">2025.05.01 ~ 2025.07.30</div>
                <div data-layer="그레이프 아트센터" class="justify-start text-zinc-600 text-sm font-normal font-['Inter']">그레이프 아트센터</div>
                <div data-layer="Frame 1321317467" class="inline-flex justify-start items-center gap-2.5">
                  <div data-layer="더보기 버튼" class="w-20 h-9 relative">
                    <div data-layer="Rectangle 29" class="w-20 h-9 left-0 top-0 absolute bg-violet-600 rounded-[35px]"></div>
                    <div data-layer="더보기" class="left-[21px] top-[9px] absolute text-center justify-start text-white text-sm font-bold font-['Inter']">더보기</div>
                  </div>
                  <div data-layer="즐겨찾기 버튼" class="w-20 h-9 relative">
                    <div data-layer="Rectangle 29" class="w-20 h-9 left-0 top-0 absolute bg-white rounded-[35px] border border-violet-600"></div>
                    <div data-layer="즐겨찾기" class="left-[14px] top-[9px] absolute text-center justify-start text-violet-600 text-sm font-bold font-['Inter']">즐겨찾기</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div data-layer="통합검색-공연/전시 grid item1" class="w-96 h-44 px-3.5 py-5 bg-white outline outline-2 outline-offset-[-1px] outline-violet-50 inline-flex flex-col justify-start items-start gap-2.5">
            <div data-layer="Frame 1321317469" class="w-80 inline-flex justify-between items-start">
              <div data-layer="Rectangle 28" class="w-28 h-36 bg-violet-50 rounded-[5px]"></div>
              <div data-layer="Frame 1321317468" class="w-44 h-36 inline-flex flex-col justify-between items-start">
                <div data-layer="2025 특별전시 '햄릿'" class="justify-start text-neutral-800 text-lg font-bold font-['Inter']">2025 특별전시 '햄릿'</div>
                <div data-layer="2025.05.01 ~ 2025.07.30" class="w-40 justify-start text-zinc-600 text-sm font-normal font-['Inter']">2025.05.01 ~ 2025.07.30</div>
                <div data-layer="그레이프 아트센터" class="justify-start text-zinc-600 text-sm font-normal font-['Inter']">그레이프 아트센터</div>
                <div data-layer="Frame 1321317467" class="inline-flex justify-start items-center gap-2.5">
                  <div data-layer="더보기 버튼" class="w-20 h-9 relative">
                    <div data-layer="Rectangle 29" class="w-20 h-9 left-0 top-0 absolute bg-violet-600 rounded-[35px]"></div>
                    <div data-layer="더보기" class="left-[21px] top-[9px] absolute text-center justify-start text-white text-sm font-bold font-['Inter']">더보기</div>
                  </div>
                  <div data-layer="즐겨찾기 버튼" class="w-20 h-9 relative">
                    <div data-layer="Rectangle 29" class="w-20 h-9 left-0 top-0 absolute bg-white rounded-[35px] border border-violet-600"></div>
                    <div data-layer="즐겨찾기" class="left-[14px] top-[9px] absolute text-center justify-start text-violet-600 text-sm font-bold font-['Inter']">즐겨찾기</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div data-layer="통합검색-공연/전시 grid item1" class="w-96 h-44 px-3.5 py-5 bg-white outline outline-2 outline-offset-[-1px] outline-violet-50 inline-flex flex-col justify-start items-start gap-2.5">
            <div data-layer="Frame 1321317469" class="w-80 inline-flex justify-between items-start">
              <div data-layer="Rectangle 28" class="w-28 h-36 bg-violet-50 rounded-[5px]"></div>
              <div data-layer="Frame 1321317468" class="w-44 h-36 inline-flex flex-col justify-between items-start">
                <div data-layer="2025 특별전시 '햄릿'" class="justify-start text-neutral-800 text-lg font-bold font-['Inter']">2025 특별전시 '햄릿'</div>
                <div data-layer="2025.05.01 ~ 2025.07.30" class="w-40 justify-start text-zinc-600 text-sm font-normal font-['Inter']">2025.05.01 ~ 2025.07.30</div>
                <div data-layer="그레이프 아트센터" class="justify-start text-zinc-600 text-sm font-normal font-['Inter']">그레이프 아트센터</div>
                <div data-layer="Frame 1321317467" class="inline-flex justify-start items-center gap-2.5">
                  <div data-layer="더보기 버튼" class="w-20 h-9 relative">
                    <div data-layer="Rectangle 29" class="w-20 h-9 left-0 top-0 absolute bg-violet-600 rounded-[35px]"></div>
                    <div data-layer="더보기" class="left-[21px] top-[9px] absolute text-center justify-start text-white text-sm font-bold font-['Inter']">더보기</div>
                  </div>
                  <div data-layer="즐겨찾기 버튼" class="w-20 h-9 relative">
                    <div data-layer="Rectangle 29" class="w-20 h-9 left-0 top-0 absolute bg-white rounded-[35px] border border-violet-600"></div>
                    <div data-layer="즐겨찾기" class="left-[14px] top-[9px] absolute text-center justify-start text-violet-600 text-sm font-bold font-['Inter']">즐겨찾기</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-layer="section_post_result" class="self-stretch inline-flex flex-col justify-start items-start gap-3">
        <div data-layer="title 게시글(n)" class="w-[1199.84px] inline-flex justify-between items-center">
          <div data-layer="게시글 (128)" class="justify-start text-neutral-800 text-xl font-bold font-['Inter']">게시글 (128)</div>
          <router-link to ="/search/post" data-layer="더보기" class="text-center justify-start text-violet-600 text-base font-bold font-['Inter']">더보기</router-link>
        </div>
        <div data-layer="게시글 목록 표" class="self-stretch flex flex-col justify-start items-start">
          <div data-layer="시작행" class="self-stretch flex flex-col justify-start items-start gap-2.5">
            <div data-layer="Frame 215" class="inline-flex justify-start items-center">
              <div data-layer="Frame 1321317495" class="w-72 h-12 relative bg-violet-50">
                <div data-layer="게시판" class="left-[118px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-bold font-['Inter']">게시판</div>
              </div>
              <div data-layer="Frame 1321317496" class="w-[515px] h-12 relative bg-violet-50">
                <div data-layer="제목" class="left-[244.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-bold font-['Inter']">제목</div>
              </div>
              <div data-layer="Frame 1321317497" class="w-32 h-12 relative bg-violet-50">
                <div data-layer="작성자" class="left-[43px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-bold font-['Inter']">작성자</div>
              </div>
              <div data-layer="Frame 1321317498" class="w-28 h-12 relative bg-violet-50">
                <div data-layer="작성일" class="left-[33px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-bold font-['Inter']">작성일</div>
              </div>
              <div data-layer="Frame 1321317499" class="w-24 h-12 relative bg-violet-50">
                <div data-layer="조회" class="left-[32px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-bold font-['Inter']">조회</div>
              </div>
              <div data-layer="Frame 1321317500" class="w-24 h-12 relative bg-violet-50">
                <div data-layer="추천" class="left-[32px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-bold font-['Inter']">추천</div>
              </div>
            </div>
          </div>
          <div data-layer="목록행1" class="inline-flex justify-start items-center">
            <div data-layer="Frame 1321317495" class="w-72 h-12 relative bg-white">
              <div data-layer="뮤지컬〈햄릿:얼라이브〉" class="left-[63.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">뮤지컬〈햄릿:얼라이브〉</div>
            </div>
            <div data-layer="Frame 1321317496" class="w-[515px] h-12 relative bg-white">
              <div data-layer="4월 15일 공연 관람 후기 - 최고의 무대였습니다!" class="left-[107px] top-[16px] absolute justify-start text-neutral-800 text-base font-normal font-['Inter']">4월 15일 공연 관람 후기 - 최고의 무대였습니다!</div>
            </div>
            <div data-layer="Frame 1321317497" class="w-32 h-12 relative bg-white">
              <div data-layer="햄부기" class="left-[43px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">햄부기</div>
            </div>
            <div data-layer="Frame 1321317498" class="w-28 h-12 relative bg-white">
              <div data-layer="2024.04.16" class="left-[15px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">2024.04.16</div>
            </div>
            <div data-layer="Frame 1321317499" class="w-24 h-12 relative bg-white">
              <div data-layer="123" class="left-[32.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">123</div>
            </div>
            <div data-layer="Frame 1321317500" class="w-24 h-12 relative bg-white">
              <div data-layer="456" class="left-[31.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">456</div>
            </div>
          </div>
          <div data-layer="목록행2" class="inline-flex justify-start items-center">
            <div data-layer="Frame 1321317495" class="w-72 h-12 relative bg-white">
              <div data-layer="뮤지컬〈햄릿:얼라이브〉" class="left-[63.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">뮤지컬〈햄릿:얼라이브〉</div>
            </div>
            <div data-layer="Frame 1321317496" class="w-[515px] h-12 relative bg-white">
              <div data-layer="[필독] 뮤지컬 '햄릿' 캐스팅 변경 안내" class="left-[141.50px] top-[16px] absolute justify-start text-neutral-800 text-base font-normal font-['Inter']">[필독] 뮤지컬 '햄릿' 캐스팅 변경 안내</div>
            </div>
            <div data-layer="Frame 1321317497" class="w-32 h-12 relative bg-white">
              <div data-layer="관리자" class="left-[43px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">관리자</div>
            </div>
            <div data-layer="Frame 1321317498" class="w-28 h-12 relative bg-white">
              <div data-layer="2024.04.02" class="left-[13.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">2024.04.02</div>
            </div>
            <div data-layer="Frame 1321317499" class="w-24 h-12 relative bg-white">
              <div data-layer="123" class="left-[32.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">123</div>
            </div>
            <div data-layer="Frame 1321317500" class="w-24 h-12 relative bg-white">
              <div data-layer="456" class="left-[31.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">456</div>
            </div>
          </div>
          <div data-layer="목록행3" class="inline-flex justify-start items-center">
            <div data-layer="Frame 1321317495" class="w-72 h-12 relative bg-white">
              <div data-layer="연극 〈플레이위드 햄릿〉2021" class="left-[45px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">연극 〈플레이위드 햄릿〉2021</div>
            </div>
            <div data-layer="Frame 1321317496" class="w-[515px] h-12 relative bg-white">
              <div data-layer="햄릿 역의 김주연 배우, 이번 공연에서 최고의 연기!" class="left-[100.50px] top-[16px] absolute justify-start text-neutral-800 text-base font-normal font-['Inter']">햄릿 역의 김주연 배우, 이번 공연에서 최고의 연기!</div>
            </div>
            <div data-layer="Frame 1321317497" class="w-32 h-12 relative bg-white">
              <div data-layer="함부르크" class="left-[36.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">함부르크</div>
            </div>
            <div data-layer="Frame 1321317498" class="w-28 h-12 relative bg-white">
              <div data-layer="2021.04.01" class="w-20 left-[14.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">2021.04.01</div>
            </div>
            <div data-layer="Frame 1321317499" class="w-24 h-12 relative bg-white">
              <div data-layer="123" class="left-[32.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">123</div>
            </div>
            <div data-layer="Frame 1321317500" class="w-24 h-12 relative bg-white">
              <div data-layer="456" class="left-[31.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">456</div>
            </div>
          </div>
          <div data-layer="목록행4" class="inline-flex justify-start items-center">
            <div data-layer="Frame 1321317495" class="w-72 h-12 relative bg-white">
              <div data-layer="연극 〈플레이위드 햄릿〉2023" class="left-[44px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">연극 〈플레이위드 햄릿〉2023</div>
            </div>
            <div data-layer="Frame 1321317496" class="w-[515px] h-12 relative bg-white">
              <div data-layer="햄릿에서 가장 감동적인 장면은 역시..." class="left-[139px] top-[16px] absolute justify-start text-neutral-800 text-base font-normal font-['Inter']">햄릿에서 가장 감동적인 장면은 역시...</div>
            </div>
            <div data-layer="Frame 1321317497" class="w-32 h-12 relative bg-white">
              <div data-layer="햄식" class="left-[49.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">햄식</div>
            </div>
            <div data-layer="Frame 1321317498" class="w-28 h-12 relative bg-white">
              <div data-layer="2023.04.05" class="left-[13.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">2023.04.05</div>
            </div>
            <div data-layer="Frame 1321317499" class="w-24 h-12 relative bg-white">
              <div data-layer="123" class="left-[32.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">123</div>
            </div>
            <div data-layer="Frame 1321317500" class="w-24 h-12 relative bg-white">
              <div data-layer="456" class="left-[31.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">456</div>
            </div>
          </div>
          <div data-layer="목록행5" class="inline-flex justify-start items-center">
            <div data-layer="Frame 1321317495" class="w-72 h-12 relative bg-white">
              <div data-layer="뮤지컬〈햄릿:얼라이브〉" class="left-[63.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">뮤지컬〈햄릿:얼라이브〉</div>
            </div>
            <div data-layer="Frame 1321317496" class="w-[515px] h-12 relative bg-white">
              <div data-layer="뮤지컬 햄릿 1열 A석 시야 어떤가요?" class="left-[144.50px] top-[16px] absolute justify-start text-neutral-800 text-base font-normal font-['Inter']">뮤지컬 햄릿 1열 A석 시야 어떤가요?</div>
            </div>
            <div data-layer="Frame 1321317497" class="w-32 h-12 relative bg-white">
              <div data-layer="앨빈" class="left-[49.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">앨빈</div>
            </div>
            <div data-layer="Frame 1321317498" class="w-28 h-12 relative bg-white">
              <div data-layer="2024.03.20" class="left-[13.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">2024.03.20</div>
            </div>
            <div data-layer="Frame 1321317499" class="w-24 h-12 relative bg-white">
              <div data-layer="123" class="left-[32.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">123</div>
            </div>
            <div data-layer="Frame 1321317500" class="w-24 h-12 relative bg-white">
              <div data-layer="456" class="left-[31.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">456</div>
            </div>
          </div>
        </div>
      </div>
      <div data-layer="section_rerview_result" class="self-stretch inline-flex flex-col justify-start items-center gap-5">
        <div data-layer="Frame 1321317502" class="w-[1200px] flex flex-col justify-start items-start gap-8">
          <div data-layer="Frame 1321317504" class="w-[1199.84px] inline-flex justify-between items-center">
            <div data-layer="한줄평 (365)" class="justify-start text-neutral-800 text-xl font-bold font-['Inter']">한줄평 (365)</div>
            <router-link to ="/search/review" data-layer="더보기" class="text-center justify-start text-violet-600 text-base font-bold font-['Inter']">더보기</router-link>
          </div>
          <div data-layer="REVIEW LIST" class="self-stretch flex flex-col justify-start items-start gap-4">
            <div data-layer="REVIEW ITEM" class="self-stretch h-20 px-6 py-5 bg-white rounded-[10px] outline outline-1 outline-offset-[-0.50px] outline-violet-50 flex flex-col justify-start items-start gap-2.5">
              <div data-layer="Frame 1321317485" class="inline-flex justify-start items-center gap-4">
                <div data-layer="Frame 1321317480" class="w-9 h-10 px-3.5 py-3 bg-violet-50 rounded-[20px] inline-flex flex-col justify-center items-center gap-2.5">
                  <div data-layer="별" class="text-center justify-start text-violet-600 text-xs font-bold font-['Inter']">별</div>
                </div>
                <div data-layer="Frame 1321317484" class="w-[1094.45px] inline-flex flex-col justify-start items-start gap-1">
                  <div data-layer="Frame 1321317483" class="self-stretch inline-flex justify-between items-center">
                    <div data-layer="Frame 1321317482" class="flex justify-start items-end gap-3">
                      <div data-layer="별자리" class="justify-start text-neutral-800 text-base font-bold font-['Inter']">별자리</div>
                      <div data-layer="★★★★★" class="justify-start text-yellow-400 text-base font-normal font-['Inter']">★★★★★</div>
                    </div>
                    <div data-layer="2025.04.18" class="justify-start text-neutral-400 text-xs font-normal font-['Inter']">2025.04.18</div>
                  </div>
                  <div data-layer="햄릿의 독백 장면이 압권이었습니다. 배우의 감정 표현이 정말 섬세했어요!" class="self-stretch justify-start text-neutral-800 text-sm font-normal font-['Inter']">햄릿의 독백 장면이 압권이었습니다. 배우의 감정 표현이 정말 섬세했어요!</div>
                </div>
              </div>
            </div>
            <div data-layer="REVIEW ITEM" class="self-stretch h-20 px-6 py-5 bg-white rounded-[10px] outline outline-1 outline-offset-[-0.50px] outline-violet-50 flex flex-col justify-start items-start gap-2.5">
              <div data-layer="Frame 1321317485" class="inline-flex justify-start items-center gap-4">
                <div data-layer="Frame 1321317480" class="w-9 h-10 px-3.5 py-3 bg-violet-50 rounded-[20px] inline-flex flex-col justify-center items-center gap-2.5">
                  <div data-layer="별" class="text-center justify-start text-violet-600 text-xs font-bold font-['Inter']">별</div>
                </div>
                <div data-layer="Frame 1321317484" class="w-[1094.45px] inline-flex flex-col justify-start items-start gap-1">
                  <div data-layer="Frame 1321317483" class="self-stretch inline-flex justify-between items-center">
                    <div data-layer="Frame 1321317482" class="flex justify-start items-end gap-3">
                      <div data-layer="별이" class="justify-start text-neutral-800 text-base font-bold font-['Inter']">별이</div>
                      <div data-layer="★★★★★" class="justify-start text-yellow-400 text-base font-normal font-['Inter']">★★★★★</div>
                    </div>
                    <div data-layer="2025.04.18" class="justify-start text-neutral-400 text-xs font-normal font-['Inter']">2025.04.18</div>
                  </div>
                  <div data-layer="햄릿의 독백 장면이 압권이었습니다. 배우의 감정 표현이 정말 섬세했어요!" class="self-stretch justify-start text-neutral-800 text-sm font-normal font-['Inter']">햄릿의 독백 장면이 압권이었습니다. 배우의 감정 표현이 정말 섬세했어요!</div>
                </div>
              </div>
            </div>
            <div data-layer="REVIEW ITEM" class="self-stretch h-20 px-6 py-5 bg-white rounded-[10px] outline outline-1 outline-offset-[-0.50px] outline-violet-50 flex flex-col justify-start items-start gap-2.5">
              <div data-layer="Frame 1321317485" class="inline-flex justify-start items-center gap-4">
                <div data-layer="Frame 1321317480" class="w-9 h-10 px-3.5 py-3 bg-violet-50 rounded-[20px] inline-flex flex-col justify-center items-center gap-2.5">
                  <div data-layer="별" class="text-center justify-start text-violet-600 text-xs font-bold font-['Inter']">별</div>
                </div>
                <div data-layer="Frame 1321317484" class="w-[1094.45px] inline-flex flex-col justify-start items-start gap-1">
                  <div data-layer="Frame 1321317483" class="self-stretch inline-flex justify-between items-center">
                    <div data-layer="Frame 1321317482" class="flex justify-start items-end gap-3">
                      <div data-layer="별나라" class="justify-start text-neutral-800 text-base font-bold font-['Inter']">별나라</div>
                      <div data-layer="★★★★★" class="justify-start text-yellow-400 text-base font-normal font-['Inter']">★★★★★</div>
                    </div>
                    <div data-layer="2025.04.18" class="justify-start text-neutral-400 text-xs font-normal font-['Inter']">2025.04.18</div>
                  </div>
                  <div data-layer="햄릿의 독백 장면이 압권이었습니다. 배우의 감정 표현이 정말 섬세했어요!" class="self-stretch justify-start text-neutral-800 text-sm font-normal font-['Inter']">햄릿의 독백 장면이 압권이었습니다. 배우의 감정 표현이 정말 섬세했어요!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper{
  width: 95%;
  max-width: 95vw;
  margin: 5vh auto;
  padding: 0 5vw;
}
</style>
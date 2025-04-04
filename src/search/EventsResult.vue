<script setup>

</script>

<template>
  <div data-layer="main frame" class="w-[1204px] inline-flex flex-col justify-start items-center gap-9">
    <nav data-layer="검색결과 카테고리 바" class="self-stretch h-28 relative">
      <div data-layer="Title"
           class="left-0 top-0 absolute justify-start text-neutral-800 text-2xl font-bold font-['Inter']">'햄릿' 검색 결과
      </div>
      <div data-layer="Frame 1321317464"
           class="w-100 h-14 left-0 top-[47px] absolute inline-flex justify-start items-start">
        <router-link to="/search" data-layer="통합검색" class="w-48 h-14 px-7 py-5 bg-white flex justify-center items-center gap-2.5">
          <div data-layer="통합검색"
               class="text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">통합검색
          </div>
        </router-link>
        <router-link to="/search/events" data-layer="공연/전시" class="w-48 h-14 px-7 py-5 bg-white flex justify-center items-center gap-2.5">
          <div data-layer="공연/전시" class="text-center justify-start text-violet-600 text-base font-bold font-['Inter']">
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
    <div data-layer="search filter form section" class="self-stretch h-96 relative bg-violet-50 rounded-xl">
      <div data-layer="search filter form container" class="w-[1156px] left-[24px] top-[24px] absolute inline-flex flex-col justify-start items-start gap-3.5">
        <div data-layer="heading" class="self-stretch pt-0.5 pb-[3px] flex flex-col justify-start items-start">
          <div data-layer="검색 조건 필터링" class="justify-center text-zinc-800 text-xl font-bold font-['Noto_Sans_KR']">검색 조건 필터링</div>
        </div>
        <div data-layer="condition row 1" class="self-stretch h-16 inline-flex justify-start items-start gap-3.5 flex-wrap content-start">
          <div data-layer="category" class="h-16 min-w-44 inline-flex flex-col justify-start items-start gap-0.5">
            <label data-layer="Label" class="self-stretch pb-0.5 flex flex-col justify-start items-start">
              <div data-layer="카테고리" class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">카테고리</div>
            </label>
            <div data-layer="select_input" class="self-stretch pl-3.5 pr-7 py-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-center items-center">
              <select data-layer="Container" class="text-sm flex-1 py-px inline-flex flex-col justify-start items-start overflow-hidden">
                <option data-layer="전체" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">전체</option>
                <option data-layer="뮤지컬" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">뮤지컬</option>
                <option data-layer="연극" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">연극</option>
                <option data-layer="콘서트" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">콘서트</option>
                <option data-layer="전시" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">전시</option>
                <option data-layer="박람회" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">박람회</option>
              </select>
            </div>
          </div>
          <div data-layer="location" class="h-16 min-w-44 inline-flex flex-col justify-start items-start gap-0.5">
            <label data-layer="Label" class="self-stretch pb-0.5 flex flex-col justify-start items-start">
              <div data-layer="지역" class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">지역</div>
            </label>
            <div data-layer="select_input" class="self-stretch pl-3.5 pr-7 py-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-center items-center">
              <select data-layer="Container" class="text-sm flex-1 py-px inline-flex flex-col justify-start items-start overflow-hidden">
                <option data-layer="전체" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">전체</option>
                <option data-layer="서울/경기/인천" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">서울/경기/인천</option>
                <option data-layer="강원" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">강원</option>
                <option data-layer="충청" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">충청</option>
                <option data-layer="광주/전라" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">전라/광주</option>
                <option data-layer="대구/경북" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">대구/경북</option>
                <option data-layer="부산/울산/경남" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">부산/울산/경남</option>
                <option data-layer="제주" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">제주</option>
              </select>
            </div>
          </div>
          <div data-layer="status" class="h-16 min-w-44 inline-flex flex-col justify-start items-start gap-0.5">
            <label data-layer="Label" class="self-stretch pb-0.5 flex flex-col justify-start items-start">
              <div data-layer="공연/전시 상태" class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">공연/전시 상태</div>
            </label>
            <div data-layer="select_input" class="self-stretch pl-3.5 pr-7 py-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-center items-center">
              <select data-layer="Container" class="text-sm flex-1 py-px inline-flex flex-col justify-start items-start overflow-hidden">
                <option data-layer="전체" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">전체</option>
                <option data-layer="예정" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">예정</option>
                <option data-layer="운영중" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">운영중</option>
                <option data-layer="종료" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">종료</option>
              </select>
            </div>
          </div>
          <div data-layer="ticket_price" class="h-16 min-w-44 inline-flex flex-col justify-start items-start gap-0.5">
            <label data-layer="Label" class="self-stretch pb-0.5 flex flex-col justify-start items-start">
              <div data-layer="가격대" class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">가격대</div>
            </label>
            <div data-layer="number_input_group" class="inline-flex justify-start items-center gap-3.5">
              <div data-layer="number_input" class="w-44 h-10 pl-3.5 pr-7 py-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-center items-center">
                <div data-layer="Container" class="flex-1 py-px inline-flex flex-col justify-start items-start overflow-hidden">
                  <input data-layer="0" type="number" min="0" max="490000" placeholder="0" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none"/>
                </div>
              </div>
              <div data-layer="~" class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">~</div>
              <div data-layer="number_input" class="w-44 h-10 pl-3.5 pr-7 py-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-center items-center">
                <div data-layer="Container" class="flex-1 py-px inline-flex flex-col justify-start items-start overflow-hidden">
                  <input data-layer="500000" type="number" min="1" max="500000" placeholder="500000" class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none"/>                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-layer="condition row2" class="self-stretch inline-flex justify-center items-start flex-wrap content-start">
          <div data-layer="date" class="flex-1 h-16 min-w-44 inline-flex flex-col justify-start items-start gap-0.5">
            <label data-layer="Label" class="self-stretch pb-0.5 flex flex-col justify-start items-start">
              <div data-layer="날짜 범위" class="self-stretch justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">날짜 범위</div>
            </label>
            <div data-layer="date_input_group" class="self-stretch inline-flex justify-start items-center gap-2.5">
              <div data-layer="start_date_input" class="w-44 h-10 pl-3.5 pr-7 py-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-center items-center">
                <div data-layer="Container" class="flex-1 py-px inline-flex flex-col justify-start items-start overflow-hidden">
                  <input data-layer="500000" type="date" class="self-stretch justify-center text-zinc-800 text-md font-['Noto_Sans_KR'] leading-none"/>                </div>
              </div>
              <div data-layer="~" class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">~</div>
              <div data-layer="end_date_input" class="w-44 h-10 pl-3.5 pr-7 py-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-center items-center">
                <div data-layer="Container" class="flex-1 py-px inline-flex flex-col justify-start items-start overflow-hidden">
                  <input data-layer="500000" type="date" class="self-stretch justify-center text-zinc-800 text-md font-['Noto_Sans_KR'] leading-none"/>                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-layer="condition row3" class="self-stretch h-12 inline-flex justify-center items-start flex-wrap content-start">
          <fieldset data-layer="ticker_vendor" class="flex-1 self-stretch min-w-44 inline-flex flex-col justify-start items-start gap-0.5">
            <legend data-layer="Label" class="self-stretch pb-0.5 flex flex-col justify-start items-start">
              <div data-layer="예매처" class="self-stretch justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">예매처</div>
            </legend>
            <div data-layer="check_input_group" class="self-stretch inline-flex justify-start items-start gap-3.5 flex-wrap content-start">
              <div data-layer="check_input" class="self-stretch flex justify-start items-center gap-1.5">
                <input type="checkbox" id="interpark" name="interpark" />
                <label for="interpark" data-layer="Label" class="pt-px pb-[3px] inline-flex flex-col justify-start items-start">
                  <div data-layer="인터파크" class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">인터파크</div>
                </label>
              </div>
              <div data-layer="check_input" class="self-stretch flex justify-start items-center gap-1.5">
                <input type="checkbox" id="yes24" name="yes24" />
                <label for="yes24" data-layer="Label" class="pt-px pb-[3px] inline-flex flex-col justify-start items-start">
                  <div data-layer="예스24" class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">예스24</div>
                </label>
              </div>
              <div data-layer="check_input" class="self-stretch flex justify-start items-center gap-1.5">
                <input type="checkbox" id="ticketlink" name="ticketlink" />
                <label for="ticketlink" data-layer="Label" class="pt-px pb-[3px] inline-flex flex-col justify-start items-start">
                  <div data-layer="티켓링크" class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">티켓링크</div>
                </label>
              </div>
              <div data-layer="check_input" class="self-stretch flex justify-start items-center gap-1.5">
                <input type="checkbox" id="melonticket" name="melonticket" />
                <label for="melonticket" data-layer="Label" class="pt-px pb-[3px] inline-flex flex-col justify-start items-start">
                  <div data-layer="멜론티켓" class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">멜론티켓</div>
                </label>
              </div>
              <div data-layer="check_input" class="self-stretch flex justify-start items-center gap-1.5">
                <input type="checkbox" id="naverreservation" name="naverreservation" />
                <label for="naverreservation" data-layer="Label" class="pt-px pb-[3px] inline-flex flex-col justify-start items-start">
                  <div data-layer="네이버예약" class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">네이버예약</div>
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <div data-layer="button group row4" class="self-stretch inline-flex justify-center items-start gap-2">
          <button data-layer="btn1" class="w-20 h-10 relative bg-purple-800 rounded-[10px]">
            <div data-layer="초기화" class="text-center justify-center text-white text-sm font-semibold font-['Noto_Sans_KR']">초기화</div>
          </button>
          <router-link to="/search/events" data-layer="btn2" class="w-20 h-10 flex items-center justify-center relative bg-violet-500 rounded-[10px]">
            <div data-layer="검색" class="text-center text-white text-sm font-semibold font-['Noto_Sans_KR']">검색</div>
          </router-link>
        </div>
      </div>
    </div>
    <div data-layer="search result container section" class="self-stretch flex flex-col justify-start items-start gap-5">
      <div data-layer="section title bar" class="self-stretch inline-flex justify-between items-center">
        <div data-layer="검색결과(n)건" class="flex justify-start items-center">
          <div data-layer="검색결과(" class="justify-center text-zinc-800 text-lg font-bold font-['Noto_Sans_KR']">검색결과( </div>
          <div data-layer="num of search result" class="justify-center text-zinc-800 text-lg font-bold font-['Noto_Sans_KR']">24</div>
          <div data-layer="건)" class="justify-center text-zinc-800 text-lg font-bold font-['Noto_Sans_KR']">건)</div>
        </div>
        <div data-layer="sort btn group" class="flex justify-start items-start gap-3.5">
          <div data-layer="sort btn 정확도순" class="justify-center text-purple-800 text-base font-medium font-['Noto_Sans_KR'] underline">정확도순</div>
          <div data-layer="sort btn 가격순" class="justify-center text-stone-500 text-base font-['Noto_Sans_KR']">가격순</div>
          <div data-layer="sort btn 인기순" class="justify-center text-stone-500 text-base font-['Noto_Sans_KR']">가격순</div>
        </div>
      </div>
      <div data-layer="Container" class="self-stretch relative">
        <div data-layer="banner grid" class="inline-flex justify-start items-start gap-3.5 flex-wrap content-start">
          <router-link to="/events/1" data-layer="banner item container" class="w-72 h-96 flex-row relative bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] overflow-hidden">
            <div data-layer="poster container" class="w-64 h-54 left-[20px] top-[10px] absolute">
              <div data-layer="poster" class="w-64 h-64 left-0 top-0 absolute bg-purple-100"></div>
            </div>
            <div data-layer="item info container" class="w-64 left-[20px] top-[270px] absolute inline-flex flex-col justify-start items-start ">
              <div data-layer="뮤지컬 '햄릿' 2022" class="self-stretch justify-center text-neutral-800 text-lg font-bold font-['Inter']">뮤지컬 '햄릿' 2022</div>
              <div data-layer="events_info" class="self-stretch flex flex-col justify-start items-start">
                <div data-layer="2025.05.01 ~ 2025.07.30" class="justify-center text-zinc-600 text-sm font-normal font-['Inter']">2025.05.01 ~ 2025.07.30</div>
                <div data-layer="그레이프 아트센터" class="justify-center text-zinc-500 text-xs font-['Noto_Sans_KR']">그레이프 아트센터</div>
              </div>
              <div data-layer="ticket_price" class="self-stretch justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">66,000 ~ 132,000원</div>
              <div data-layer="status label" class="w-12 h-5 relative bg-yellow-50 rounded-[10px]">
                <div data-layer="status" class="left-[14px] top-[3px] absolute justify-center text-amber-500 text-xs font-medium font-['Noto_Sans_KR']">예정</div>
              </div>
            </div>
          </router-link>
          <router-link to="/events/2" data-layer="banner item container" class="w-72 h-96 relative bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] overflow-hidden">
            <div data-layer="poster container" class="w-64 h-54 left-[20px] top-[10px] absolute">
              <div data-layer="poster" class="w-64 h-64 left-0 top-0 absolute bg-purple-100"></div>
            </div>
            <div data-layer="item info container" class="w-64 left-[20px] top-[270px] absolute inline-flex flex-col justify-start items-start ">
              <div data-layer="뮤지컬 '햄릿' 2022" class="self-stretch justify-center text-neutral-800 text-lg font-bold font-['Inter']">뮤지컬 '햄릿' 2022</div>
              <div data-layer="events_info" class="self-stretch flex flex-col justify-start items-start">
                <div data-layer="2025.05.01 ~ 2025.07.30" class="justify-center text-zinc-600 text-sm font-normal font-['Inter']">2025.05.01 ~ 2025.07.30</div>
                <div data-layer="그레이프 아트센터" class="justify-center text-zinc-500 text-xs font-['Noto_Sans_KR']">그레이프 아트센터</div>
              </div>
              <div data-layer="ticket_price" class="self-stretch justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">66,000 ~ 132,000원</div>
              <div data-layer="status label" class="w-12 h-5 relative bg-yellow-50 rounded-[10px]">
                <div data-layer="status" class="left-[14px] top-[3px] absolute justify-center text-amber-500 text-xs font-medium font-['Noto_Sans_KR']">예정</div>
              </div>
            </div>
          </router-link>
          <router-link to="/events/3" data-layer="banner item container" class="w-72 h-96 relative bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] overflow-hidden">
            <div data-layer="poster container" class="w-64 h-54 left-[20px] top-[10px] absolute">
              <div data-layer="poster" class="w-64 h-64 left-0 top-0 absolute bg-purple-100"></div>
            </div>
            <div data-layer="item info container" class="w-64 left-[20px] top-[270px] absolute inline-flex flex-col justify-start items-start ">
              <div data-layer="뮤지컬 '햄릿' 2022" class="self-stretch justify-center text-neutral-800 text-lg font-bold font-['Inter']">뮤지컬 '햄릿' 2022</div>
              <div data-layer="events_info" class="self-stretch flex flex-col justify-start items-start">
                <div data-layer="2025.05.01 ~ 2025.07.30" class="justify-center text-zinc-600 text-sm font-normal font-['Inter']">2025.05.01 ~ 2025.07.30</div>
                <div data-layer="그레이프 아트센터" class="justify-center text-zinc-500 text-xs font-['Noto_Sans_KR']">그레이프 아트센터</div>
              </div>
              <div data-layer="ticket_price" class="self-stretch justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">66,000 ~ 132,000원</div>
              <div data-layer="status label" class="w-12 h-5 relative bg-yellow-50 rounded-[10px]">
                <div data-layer="status" class="left-[14px] top-[3px] absolute justify-center text-amber-500 text-xs font-medium font-['Noto_Sans_KR']">예정</div>
              </div>
            </div>
          </router-link>
          <router-link to="/events/4" data-layer="banner item container" class="w-72 h-96 relative bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] overflow-hidden">
            <div data-layer="poster container" class="w-64 h-54 left-[20px] top-[10px] absolute">
              <div data-layer="poster" class="w-64 h-64 left-0 top-0 absolute bg-purple-100"></div>
            </div>
            <div data-layer="item info container" class="w-64 left-[20px] top-[270px] absolute inline-flex flex-col justify-start items-start ">
              <div data-layer="뮤지컬 '햄릿' 2022" class="self-stretch justify-center text-neutral-800 text-lg font-bold font-['Inter']">뮤지컬 '햄릿' 2022</div>
              <div data-layer="events_info" class="self-stretch flex flex-col justify-start items-start">
                <div data-layer="2025.05.01 ~ 2025.07.30" class="justify-center text-zinc-600 text-sm font-normal font-['Inter']">2025.05.01 ~ 2025.07.30</div>
                <div data-layer="그레이프 아트센터" class="justify-center text-zinc-500 text-xs font-['Noto_Sans_KR']">그레이프 아트센터</div>
              </div>
              <div data-layer="ticket_price" class="self-stretch justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">66,000 ~ 132,000원</div>
              <div data-layer="status label" class="w-12 h-5 relative bg-yellow-50 rounded-[10px]">
                <div data-layer="status" class="left-[14px] top-[3px] absolute justify-center text-amber-500 text-xs font-medium font-['Noto_Sans_KR']">예정</div>
              </div>
            </div>
          </router-link>
          <div data-layer="banner item container" class="w-72 h-96 relative bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] overflow-hidden">
            <div data-layer="poster container" class="w-64 h-54 left-[20px] top-[10px] absolute">
              <div data-layer="poster" class="w-64 h-64 left-0 top-0 absolute bg-purple-100"></div>
            </div>
            <div data-layer="item info container" class="w-64 left-[20px] top-[270px] absolute inline-flex flex-col justify-start items-start ">
              <div data-layer="뮤지컬 '햄릿' 2022" class="self-stretch justify-center text-neutral-800 text-lg font-bold font-['Inter']">뮤지컬 '햄릿' 2022</div>
              <div data-layer="events_info" class="self-stretch flex flex-col justify-start items-start">
                <div data-layer="2025.05.01 ~ 2025.07.30" class="justify-center text-zinc-600 text-sm font-normal font-['Inter']">2025.05.01 ~ 2025.07.30</div>
                <div data-layer="그레이프 아트센터" class="justify-center text-zinc-500 text-xs font-['Noto_Sans_KR']">그레이프 아트센터</div>
              </div>
              <div data-layer="ticket_price" class="self-stretch justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">66,000 ~ 132,000원</div>
              <div data-layer="status label" class="w-12 h-5 relative bg-yellow-50 rounded-[10px]">
                <div data-layer="status" class="left-[14px] top-[3px] absolute justify-center text-amber-500 text-xs font-medium font-['Noto_Sans_KR']">예정</div>
              </div>
            </div>
          </div>
          <div data-layer="banner item container" class="w-72 h-96 relative bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] overflow-hidden">
            <div data-layer="poster container" class="w-64 h-54 left-[20px] top-[10px] absolute">
              <div data-layer="poster" class="w-64 h-64 left-0 top-0 absolute bg-purple-100"></div>
            </div>
            <div data-layer="item info container" class="w-64 left-[20px] top-[270px] absolute inline-flex flex-col justify-start items-start ">
              <div data-layer="뮤지컬 '햄릿' 2022" class="self-stretch justify-center text-neutral-800 text-lg font-bold font-['Inter']">뮤지컬 '햄릿' 2022</div>
              <div data-layer="events_info" class="self-stretch flex flex-col justify-start items-start">
                <div data-layer="2025.05.01 ~ 2025.07.30" class="justify-center text-zinc-600 text-sm font-normal font-['Inter']">2025.05.01 ~ 2025.07.30</div>
                <div data-layer="그레이프 아트센터" class="justify-center text-zinc-500 text-xs font-['Noto_Sans_KR']">그레이프 아트센터</div>
              </div>
              <div data-layer="ticket_price" class="self-stretch justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">66,000 ~ 132,000원</div>
              <div data-layer="status label" class="w-12 h-5 relative bg-yellow-50 rounded-[10px]">
                <div data-layer="status" class="left-[14px] top-[3px] absolute justify-center text-amber-500 text-xs font-medium font-['Noto_Sans_KR']">예정</div>
              </div>
            </div>
          </div>
          <div data-layer="banner item container" class="w-72 h-96 relative bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] overflow-hidden">
            <div data-layer="poster container" class="w-64 h-54 left-[20px] top-[10px] absolute">
              <div data-layer="poster" class="w-64 h-64 left-0 top-0 absolute bg-purple-100"></div>
            </div>
            <div data-layer="item info container" class="w-64 left-[20px] top-[270px] absolute inline-flex flex-col justify-start items-start ">
              <div data-layer="뮤지컬 '햄릿' 2022" class="self-stretch justify-center text-neutral-800 text-lg font-bold font-['Inter']">뮤지컬 '햄릿' 2022</div>
              <div data-layer="events_info" class="self-stretch flex flex-col justify-start items-start">
                <div data-layer="2025.05.01 ~ 2025.07.30" class="justify-center text-zinc-600 text-sm font-normal font-['Inter']">2025.05.01 ~ 2025.07.30</div>
                <div data-layer="그레이프 아트센터" class="justify-center text-zinc-500 text-xs font-['Noto_Sans_KR']">그레이프 아트센터</div>
              </div>
              <div data-layer="ticket_price" class="self-stretch justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">66,000 ~ 132,000원</div>
              <div data-layer="status label" class="w-12 h-5 relative bg-yellow-50 rounded-[10px]">
                <div data-layer="status" class="left-[14px] top-[3px] absolute justify-center text-amber-500 text-xs font-medium font-['Noto_Sans_KR']">예정</div>
              </div>
            </div>
          </div>
          <div data-layer="banner item container" class="w-72 h-96 relative bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] overflow-hidden">
            <div data-layer="poster container" class="w-64 h-54 left-[20px] top-[10px] absolute">
              <div data-layer="poster" class="w-64 h-64 left-0 top-0 absolute bg-purple-100"></div>
            </div>
            <div data-layer="item info container" class="w-64 left-[20px] top-[270px] absolute inline-flex flex-col justify-start items-start ">
              <div data-layer="뮤지컬 '햄릿' 2022" class="self-stretch justify-center text-neutral-800 text-lg font-bold font-['Inter']">뮤지컬 '햄릿' 2022</div>
              <div data-layer="events_info" class="self-stretch flex flex-col justify-start items-start">
                <div data-layer="2025.05.01 ~ 2025.07.30" class="justify-center text-zinc-600 text-sm font-normal font-['Inter']">2025.05.01 ~ 2025.07.30</div>
                <div data-layer="그레이프 아트센터" class="justify-center text-zinc-500 text-xs font-['Noto_Sans_KR']">그레이프 아트센터</div>
              </div>
              <div data-layer="ticket_price" class="self-stretch justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">66,000 ~ 132,000원</div>
              <div data-layer="status label" class="w-12 h-5 relative bg-yellow-50 rounded-[10px]">
                <div data-layer="status" class="left-[14px] top-[3px] absolute justify-center text-amber-500 text-xs font-medium font-['Noto_Sans_KR']">예정</div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
    <div data-layer="페이지 이동 버튼 그룹" class="inline-flex justify-start items-end gap-2.5">
      <div data-svg-wrapper data-layer="page before btn" class="relative">
        <svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M37 1.33008H5C2.79086 1.33008 1 3.12094 1 5.33008V37.3301C1 39.5392 2.79086 41.3301 5 41.3301H37C39.2091 41.3301 41 39.5392 41 37.3301V5.33008C41 3.12094 39.2091 1.33008 37 1.33008Z" fill="white" stroke="#DEE2E6"/>
          <path d="M26 11.3301L16 21.3301L26 31.3301" stroke="#495057" stroke-width="2"/>
        </svg>
      </div>
      <div data-layer="page1 btn" class="w-10 h-10 relative">
        <div data-svg-wrapper data-layer="Vector" class="left-0 top-0 absolute">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36 0.330078H4C1.79086 0.330078 0 2.12094 0 4.33008V36.3301C0 38.5392 1.79086 40.3301 4 40.3301H36C38.2091 40.3301 40 38.5392 40 36.3301V4.33008C40 2.12094 38.2091 0.330078 36 0.330078Z" fill="#7048E8"/>
          </svg>
        </div>
        <div data-layer="1" class="left-[16px] top-[9px] absolute text-center justify-start text-white text-base font-bold font-['Inter']">1</div>
      </div>
      <div data-layer="page2 btn" class="w-10 h-10 relative">
        <div data-svg-wrapper data-layer="Vector" class="left-0 top-0 absolute">
          <svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 1.33008H5C2.79086 1.33008 1 3.12094 1 5.33008V37.3301C1 39.5392 2.79086 41.3301 5 41.3301H37C39.2091 41.3301 41 39.5392 41 37.3301V5.33008C41 3.12094 39.2091 1.33008 37 1.33008Z" fill="white" stroke="#DEE2E6"/>
          </svg>
        </div>
        <div data-layer="2" class="left-[15px] top-[10px] absolute text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">2</div>
      </div>
      <div data-layer="page3 btn" class="w-10 h-10 relative">
        <div data-svg-wrapper data-layer="Vector" class="left-0 top-0 absolute">
          <svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 1.33008H5C2.79086 1.33008 1 3.12094 1 5.33008V37.3301C1 39.5392 2.79086 41.3301 5 41.3301H37C39.2091 41.3301 41 39.5392 41 37.3301V5.33008C41 3.12094 39.2091 1.33008 37 1.33008Z" fill="white" stroke="#DEE2E6"/>
          </svg>
        </div>
        <div data-layer="3" class="left-[15px] top-[10px] absolute text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">3</div>
      </div>
      <div data-layer="page4 btn" class="w-10 h-10 relative">
        <div data-svg-wrapper data-layer="Vector" class="left-0 top-0 absolute">
          <svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 1.33008H5C2.79086 1.33008 1 3.12094 1 5.33008V37.3301C1 39.5392 2.79086 41.3301 5 41.3301H37C39.2091 41.3301 41 39.5392 41 37.3301V5.33008C41 3.12094 39.2091 1.33008 37 1.33008Z" fill="white" stroke="#DEE2E6"/>
          </svg>
        </div>
        <div data-layer="4" class="left-[15px] top-[10px] absolute text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">4</div>
      </div>
      <div data-layer="page5 btn" class="w-10 h-10 relative">
        <div data-svg-wrapper data-layer="Vector" class="left-0 top-0 absolute">
          <svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 1.33008H5C2.79086 1.33008 1 3.12094 1 5.33008V37.3301C1 39.5392 2.79086 41.3301 5 41.3301H37C39.2091 41.3301 41 39.5392 41 37.3301V5.33008C41 3.12094 39.2091 1.33008 37 1.33008Z" fill="white" stroke="#DEE2E6"/>
          </svg>
        </div>
        <div data-layer="5" class="left-[15px] top-[10px] absolute text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">5</div>
      </div>
      <div data-layer="page6 btn" class="w-10 h-10 relative">
        <div data-svg-wrapper data-layer="Vector" class="left-0 top-0 absolute">
          <svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 1.33008H5C2.79086 1.33008 1 3.12094 1 5.33008V37.3301C1 39.5392 2.79086 41.3301 5 41.3301H37C39.2091 41.3301 41 39.5392 41 37.3301V5.33008C41 3.12094 39.2091 1.33008 37 1.33008Z" fill="white" stroke="#DEE2E6"/>
          </svg>
        </div>
        <div data-layer="6" class="left-[15px] top-[10px] absolute text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">6</div>
      </div>
      <div data-layer="page7 btn" class="w-10 h-10 relative">
        <div data-svg-wrapper data-layer="Vector" class="left-0 top-0 absolute">
          <svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 1.33008H5C2.79086 1.33008 1 3.12094 1 5.33008V37.3301C1 39.5392 2.79086 41.3301 5 41.3301H37C39.2091 41.3301 41 39.5392 41 37.3301V5.33008C41 3.12094 39.2091 1.33008 37 1.33008Z" fill="white" stroke="#DEE2E6"/>
          </svg>
        </div>
        <div data-layer="7" class="left-[15px] top-[10px] absolute text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">7</div>
      </div>
      <div data-svg-wrapper data-layer="page after btn" class="relative">
        <svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M37 1.33008H5C2.79086 1.33008 1 3.12094 1 5.33008V37.3301C1 39.5392 2.79086 41.3301 5 41.3301H37C39.2091 41.3301 41 39.5392 41 37.3301V5.33008C41 3.12094 39.2091 1.33008 37 1.33008Z" fill="white" stroke="#DEE2E6"/>
          <path d="M16 11.3301L26 21.3301L16 31.3301" stroke="#495057" stroke-width="2"/>
        </svg>
      </div>
      <div data-svg-wrapper data-layer="page far after btn" class="relative">
        <svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M37 1.33008H5C2.79086 1.33008 1 3.12094 1 5.33008V37.3301C1 39.5392 2.79086 41.3301 5 41.3301H37C39.2091 41.3301 41 39.5392 41 37.3301V5.33008C41 3.12094 39.2091 1.33008 37 1.33008Z" fill="white" stroke="#DEE2E6"/>
          <path d="M21 11.3301L31 21.3301L21 31.3301" stroke="#495057" stroke-width="2"/>
          <path d="M11 11.3301L21 21.3301L11 31.3301" stroke="#495057" stroke-width="2"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
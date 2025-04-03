<script setup>

</script>

<template>
  <div class="justify-start text-neutral-800 text-2xl font-bold font-['Inter']">'햄릿' 검색 결과</div>
  <div class="w-[1200px] h-96 relative bg-violet-50 rounded-xl">
    <div
        class="w-[1152px] pt-0.5 pb-[3px] left-[24px] top-[24px] absolute inline-flex flex-col justify-start items-start">
      <div class="justify-center text-zinc-800 text-xl font-bold font-['Noto_Sans_KR']">검색 조건 필터링</div>
    </div>
    <div
        class="w-[1152px] h-16 left-[24px] top-[71px] absolute inline-flex justify-start items-start gap-3.5 flex-wrap content-start">
      <div class="h-16 min-w-44 inline-flex flex-col justify-start items-start gap-2">
        <div class="self-stretch pb-0.5 flex flex-col justify-start items-start">
          <div class="font-semibold justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">카테고리</div>
        </div>
        <div
            class="self-stretch pl-3.5 pr-7 py-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-center items-center">
          <select class="text-sm flex-1 py-px inline-flex flex-col justify-start items-start overflow-hidden">
            <option value="전체"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">전체
            </option>
            <option value="콘서트"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">콘서트
            </option>
            <option value="뮤지컬"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">뮤지컬
            </option>
            <option value="연극"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">연극
            </option>
            <option value="전시"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">전시
            </option>
            <option value="박람회"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">박람회
            </option>
          </select>
        </div>
      </div>
      <div class="h-16 min-w-44 inline-flex flex-col justify-start items-start gap-2">
        <div class="self-stretch pb-0.5 flex flex-col justify-start items-start">
          <div class="font-semibold justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">지역</div>
        </div>
        <div
            class="text-sm self-stretch pl-3.5 pr-7 py-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-center items-center">
          <select class="text-sm flex-1 py-px inline-flex flex-col justify-start items-start overflow-hidden">
            <option value="전체"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">전체
            </option>
            <option value="서울/경기"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">서울/경기
            </option>
            <option value="인천"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">인천
            </option>
            <option value="강원"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">강원
            </option>
            <option value="충남"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">충남
            </option>
            <option value="대전"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">대전
            </option>
            <option value="세종"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">세종
            </option>
            <option value="전북"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">전북
            </option>
            <option value="전남"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">전남
            </option>
            <option value="광주"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">광주
            </option>
            <option value="경북"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">경북
            </option>
            <option value="대구"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">대구
            </option>
            <option value="경남"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">경남
            </option>
            <option value="부산"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">부산
            </option>
            <option value="울산"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">울산
            </option>
            <option value="제주"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">제주
            </option>
          </select>
        </div>
      </div>
      <div class="h-16 min-w-44 inline-flex flex-col justify-start items-start gap-2">
        <div class="self-stretch pb-0.5 flex flex-col justify-start items-start">
          <div class="font-semibold justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">공연/전시 상태</div>
        </div>
        <div
            class="self-stretch pl-3.5 pr-7 py-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex justify-center items-center">
          <select class="text-sm flex-1 py-px inline-flex flex-col justify-start items-start overflow-hidden">
            <option value="전체"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">전체
            </option>
            <option value="예정"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">예정
            </option>
            <option value="진행중"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">진행중
            </option>
            <option value="종료"
                    class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none">종료
            </option>
          </select>
        </div>
      </div>
      <div class="h-16 min-w-44 inline-flex flex-col justify-start items-start gap-2">
        <div class="self-stretch pb-0.5 flex flex-col justify-start items-start">
          <div class="font-semibold justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">가격대</div>
        </div>
        <div class="inline-flex justify-start items-center gap-3.5">
          <div
              class="w-44 h-10 pl-3.5 pr-7 py-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-center items-center">
            <div class="flex-1 py-px inline-flex flex-col justify-start items-start overflow-hidden">
              <input type="number"
                     class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none"
                     placeholder="0"/>
            </div>
          </div>
          <div class="pb-px inline-flex flex-col justify-start items-start">
            <div class="font-bold justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">~</div>
          </div>
          <div
              class="w-44 h-10 pl-3.5 pr-7 py-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-center items-center">
            <div class="flex-1 py-px inline-flex flex-col justify-start items-start overflow-hidden">
              <input type="number"
                     class="self-stretch justify-center text-zinc-800 text-sm font-['Noto_Sans_KR'] leading-none"
                     placeholder="500000"/>
            </div>
          </div>
        </div>
        <div class="self-stretch h-10 relative"></div>
      </div>
    </div>
    <div
        class="w-[1152px] left-[24px] top-[151px] absolute inline-flex justify-center items-start flex-wrap content-start">
      <div class="flex-1 h-16 min-w-44 inline-flex flex-col justify-start items-start gap-2">
        <div class="self-stretch pb-0.5 flex flex-col justify-start items-start">
          <div class="font-semibold self-stretch justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">날짜 범위
          </div>
        </div>
        <div class="self-stretch inline-flex justify-start items-center gap-2.5">
          <div
              class="flex-1 p-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start overflow-hidden">
            <div class="self-stretch inline-flex justify-start items-center">
              <input type="date"
                     class="flex-1 pl-px pr-96 py-px flex justify-start items-start gap-px overflow-hidden"/>
            </div>
          </div>
          <div class="pb-px inline-flex flex-col justify-start items-start">
            <div class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">~</div>
          </div>
          <div
              class="flex-1 p-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-zinc-300 inline-flex flex-col justify-start items-start overflow-hidden">
            <div class="self-stretch inline-flex justify-start items-center gap-[0px]">
              <input type="date"
                     class="flex-1 pl-px pr-96 py-px flex justify-start items-start gap-px overflow-hidden"/>
            </div>
          </div>
        </div>
        <div class="w-[1152px] inline-flex justify-center items-start flex-wrap content-start">
          <fieldset class="flex-1 self-stretch min-w-44 inline-flex flex-col justify-start items-start gap-2">
            <legend class="self-stretch pb-0.5 flex flex-col justify-start items-start">
              <div class="font-semibold self-stretch justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">예매처
              </div>
            </legend>
            <div class="self-stretch inline-flex justify-start items-start gap-3.5 flex-wrap content-start">
              <div class="self-stretch flex justify-start items-center gap-1.5">
                <input type="checkbox" id="interpark" name="interpark"
                       class="w-3 h-3 rounded-sm border border-neutral-500"/>
                <label for="interpark" class="pt-px pb-[3px] inline-flex flex-col justify-start items-start">
                  <div class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">인터파크</div>
                </label>
              </div>
              <div class="self-stretch flex justify-start items-center gap-1.5">
                <input type="checkbox" id="yes24" name="yes24" class="w-3 h-3 rounded-sm border border-neutral-500"/>
                <label for="yes24" class="pt-px pb-[3px] inline-flex flex-col justify-start items-start">
                  <div class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">예스24</div>
                </label>
              </div>
              <div class="self-stretch flex justify-start items-center gap-1.5">
                <input type="checkbox" id="ticketlink" name="ticketlink"
                       class="w-3 h-3 rounded-sm border border-neutral-500"/>
                <label for="ticketlink" class="pt-px pb-[3px] inline-flex flex-col justify-start items-start">
                  <div class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">티켓링크</div>
                </label>
              </div>
              <div class="self-stretch flex justify-start items-center gap-1.5">
                <input type="checkbox" id="melon" name="melon" class="w-3 h-3 rounded-sm border border-neutral-500"/>
                <label for="melon" class="pt-px pb-[3px] inline-flex flex-col justify-start items-start">
                  <div class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">멜론티켓</div>
                </label>
              </div>
              <div class="self-stretch flex justify-start items-center gap-1.5">
                <input type="checkbox" id="naver" name="naver" class="w-3 h-3 rounded-sm border border-neutral-500"/>
                <label for="naver" class="pt-px pb-[3px] inline-flex flex-col justify-start items-start">
                  <div class="justify-center text-zinc-800 text-base font-['Noto_Sans_KR']">네이버예약</div>
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
    <div class="w-[1152px] left-[24px] top-[298.33px] absolute inline-flex justify-center items-start gap-2.5">
      <div class="px-5 pt-2.5 pb-3 bg-purple-800 rounded-md inline-flex flex-col justify-start items-center">
        <div class="text-center justify-center text-white text-sm font-medium font-['Noto_Sans_KR']">초기화</div>
      </div>
      <div class="px-10 pt-2.5 pb-3 bg-violet-500 rounded-md inline-flex flex-col justify-start items-center">
        <div class="text-center justify-center text-white text-sm font-medium font-['Noto_Sans_KR']">검색</div>
      </div>
    </div>
  </div>


  <!--  검색 결과 grid 섹션-->
  <section>
    <div class="w-[1200px] inline-flex flex-col justify-start items-start gap-5">
      <div class="self-stretch inline-flex justify-between items-center">
        <div class="py-0.5 inline-flex flex-col justify-start items-start">
          <div class="justify-center text-zinc-800 text-lg font-bold font-['Noto_Sans_KR']">검색결과 24건</div>
        </div>
        <div class="flex justify-start items-start gap-3.5">
          <div class="self-stretch pt-px pb-[3px] inline-flex flex-col justify-start items-start">
            <div class="justify-center text-purple-800 text-base font-medium font-['Noto_Sans_KR'] underline">정확도순</div>
          </div>
          <div class="self-stretch pt-px pb-[3px] inline-flex flex-col justify-start items-start">
            <div class="justify-center text-stone-500 text-base font-['Noto_Sans_KR']">가격순</div>
          </div>
          <div class="self-stretch pt-px pb-[3px] inline-flex flex-col justify-start items-start">
            <div class="justify-center text-stone-500 text-base font-['Noto_Sans_KR']">인기순</div>
          </div>
        </div>
      </div>
      <div class="self-stretch h-[894px] relative">
        <div
            class="w-72 h-100 pt-64 left-0 top-0 absolute bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-start overflow-hidden">
          <div class="self-stretch h-48 relative">
            <div class="w-64 h-11 left-[15px] top-[15px] absolute overflow-hidden">
              <div
                  class="w-64 left-0 top-[-0.33px] absolute justify-center text-neutral-800 text-lg font-bold font-['Inter']">
                뮤지컬 '햄릿'
              </div>
            </div>
            <div class="w-64 left-[15px] top-[70px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-600 text-sm font-normal font-['Inter']">2025.05.01 ~ 2025.07.30</div>
            </div>
            <div
                class="w-64 pt-px pb-0.5 left-[15px] top-[90px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-500 text-xs font-['Noto_Sans_KR']">그레이프 아트센터</div>
            </div>
            <div
                class="w-64 pt-px pb-[3px] left-[15px] top-[118px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">66,000 ~ 132,000원
              </div>
            </div>
            <div
                class="px-2 pt-1 pb-[5px] left-[15px] top-[149px] absolute bg-yellow-50 rounded inline-flex justify-start items-start">
              <div class="justify-center text-amber-500 text-xs font-medium font-['Noto_Sans_KR']">예정</div>
            </div>
          </div>
        </div>
        <div
            class="w-72 h-100 pt-64 left-[305px] top-0 absolute bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-start overflow-hidden">
          <div class="self-stretch h-48 relative">
            <div class="w-64 h-11 left-[15px] top-[15px] absolute overflow-hidden">
              <div
                  class="w-64 h-6 left-0 top-[-1.33px] absolute justify-center text-neutral-800 text-lg font-bold font-['Inter']">
                연극 '햄릿: 왕자의 비극'
              </div>
            </div>
            <div class="w-64 left-[15px] top-[70px] absolute inline-flex flex-col justify-start items-start">
              <div class="self-stretch justify-center text-zinc-600 text-sm font-normal font-['Inter']">2025.06.15 ~
                2025.08.30
              </div>
            </div>
            <div
                class="w-64 pt-px pb-0.5 left-[15px] top-[90px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-600 text-sm font-normal font-['Inter']">서울 예술의전당</div>
            </div>
            <div
                class="w-64 pt-px pb-[3px] left-[15px] top-[118px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">55,000원 ~ 88,000원
              </div>
            </div>
            <div
                class="px-2 pt-1 pb-[5px] left-[15px] top-[149px] absolute bg-yellow-50 rounded inline-flex justify-start items-start">
              <div class="justify-center text-amber-500 text-xs font-medium font-['Noto_Sans_KR']">예정</div>
            </div>
          </div>
        </div>
        <div
            class="w-72 h-100 pt-64 left-[610px] top-0 absolute bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-start overflow-hidden">
          <div class="self-stretch h-48 relative">
            <div class="w-64 h-11 left-[15px] top-[15px] absolute overflow-hidden">
              <div class="w-64 left-0 top-0 absolute justify-center text-neutral-800 text-lg font-bold font-['Inter']">
                뮤지컬 '영 햄릿'
              </div>
            </div>
            <div class="w-64 left-[15px] top-[70px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-600 text-sm font-normal font-['Inter']">2025.03.01 ~ 2025.04.30</div>
            </div>
            <div
                class="w-64 pt-px pb-0.5 left-[15px] top-[90px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-600 text-sm font-normal font-['Inter']">대학로 예술극장</div>
            </div>
            <div
                class="w-64 pt-px pb-[3px] left-[15px] top-[118px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">55,000원</div>
            </div>
            <div
                class="px-2 pt-1 pb-[5px] left-[15px] top-[149px] absolute bg-green-100 rounded inline-flex justify-start items-start">
              <div class="justify-center text-green-700 text-xs font-medium font-['Noto_Sans_KR']">진행중</div>
            </div>
          </div>
        </div>
        <div
            class="w-72 h-100 pt-64 left-[915px] top-0 absolute bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-start overflow-hidden">
          <div class="self-stretch h-48 relative">
            <div class="w-64 h-11 left-[15px] top-[15px] absolute overflow-hidden">
              <div
                  class="w-64 h-6 left-0 top-[-1.33px] absolute justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR'] leading-snug">
                2025 NCT 127 콘서트
              </div>
            </div>
            <div class="w-64 left-[15px] top-[70px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-stone-500 text-xs font-['Noto_Sans_KR']">2025.12.11 - 2025.12.12</div>
            </div>
            <div
                class="w-64 pt-px pb-0.5 left-[15px] top-[90px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-500 text-xs font-['Noto_Sans_KR']">고척스카이돔</div>
            </div>
            <div
                class="w-64 pt-px pb-[3px] left-[15px] top-[118px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">8,000원 ~ 35,000원</div>
            </div>
            <div
                class="px-2 pt-1 pb-[5px] left-[15px] top-[149px] absolute bg-yellow-50 rounded inline-flex justify-start items-start">
              <div class="justify-center text-amber-500 text-xs font-medium font-['Noto_Sans_KR']">예정</div>
            </div>
          </div>
        </div>
        <div
            class="w-72 h-100 pt-64 left-0 top-[447.67px] absolute bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-start overflow-hidden">
          <div class="self-stretch h-48 relative">
            <div class="w-64 h-11 left-[15px] top-[15px] absolute overflow-hidden">
              <div
                  class="w-64 left-0 top-[-0.33px] absolute justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR'] leading-snug">
                뮤지컬 알라딘 한국 초연
              </div>
            </div>
            <div class="w-64 left-[15px] top-[70px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-stone-500 text-xs font-['Noto_Sans_KR']">2024.11.22 - 2025.06.22</div>
            </div>
            <div
                class="w-64 pt-px pb-0.5 left-[15px] top-[90px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-500 text-xs font-['Noto_Sans_KR']">샤롯데씨어터</div>
            </div>
            <div
                class="w-64 pt-px pb-[3px] left-[15px] top-[118px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">60,000 ~ 140,000원
              </div>
            </div>
            <div
                class="px-2 pt-1 pb-[5px] left-[15px] top-[149px] absolute bg-green-100 rounded inline-flex justify-start items-start">
              <div class="justify-center text-green-700 text-xs font-medium font-['Noto_Sans_KR']">진행중</div>
            </div>
          </div>
        </div>
        <div
            class="w-72 h-100 pt-64 left-[305px] top-[447.67px] absolute bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-start overflow-hidden">
          <div class="self-stretch h-48 relative">
            <div class="w-64 h-11 left-[15px] top-[15px] absolute overflow-hidden">
              <div
                  class="w-64 h-6 left-0 top-[-1.33px] absolute justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR'] leading-snug">
                꽃의 비밀
              </div>
            </div>
            <div class="w-64 left-[15px] top-[70px] absolute inline-flex flex-col justify-start items-start">
              <div class="w-36 justify-center text-stone-500 text-xs font-['Noto_Sans_KR']">2024.11.22 - 2025.06.22
              </div>
            </div>
            <div
                class="w-64 pt-px pb-0.5 left-[15px] top-[90px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-500 text-xs font-['Noto_Sans_KR']">대학로 꽃 극장</div>
            </div>
            <div
                class="w-64 pt-px pb-[3px] left-[15px] top-[118px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">20,000원 ~ 100,000원
              </div>
            </div>
            <div
                class="px-2 pt-1 pb-[5px] left-[15px] top-[149px] absolute bg-green-100 rounded inline-flex justify-start items-start">
              <div class="justify-center text-green-700 text-xs font-medium font-['Noto_Sans_KR']">진행중</div>
            </div>
          </div>
        </div>
        <div
            class="w-72 h-100 pt-64 left-[610px] top-[447.67px] absolute bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-start overflow-hidden">
          <div class="self-stretch h-48 relative">
            <div class="w-64 h-11 left-[15px] top-[15px] absolute overflow-hidden">
              <div
                  class="w-64 left-0 top-[-0.33px] absolute justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR'] leading-snug">
                이름이 매우매우 길어서 두 줄로 넘어가는 연극
              </div>
            </div>
            <div class="w-64 left-[15px] top-[70px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-stone-500 text-xs font-['Noto_Sans_KR']">2025.11.22 - 2025.06.22</div>
            </div>
            <div
                class="w-64 pt-px pb-0.5 left-[15px] top-[90px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-500 text-xs font-['Noto_Sans_KR']">아트원 씨어터 2관</div>
            </div>
            <div
                class="w-64 pt-px pb-[3px] left-[15px] top-[118px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">8,000원 ~ 30,000원</div>
            </div>
            <div
                class="px-2 pt-1 pb-[5px] left-[15px] top-[149px] absolute bg-green-100 rounded inline-flex justify-start items-start">
              <div class="justify-center text-green-700 text-xs font-medium font-['Noto_Sans_KR']">진행중</div>
            </div>
          </div>
        </div>
        <div
            class="w-72 h-100 pt-64 left-[915px] top-[447.67px] absolute bg-white rounded-lg shadow-[0px_2px_8px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-start overflow-hidden">
          <div class="self-stretch h-48 relative">
            <div class="w-64 h-11 left-[15px] top-[15px] absolute overflow-hidden">
              <div
                  class="w-64 h-11 left-0 top-[-1px] absolute justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR'] leading-snug">
                2023 NCT CONCERT - NCT NATION：To The World
              </div>
            </div>
            <div class="w-64 left-[15px] top-[70px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-stone-500 text-xs font-['Noto_Sans_KR']">2023.12.11 - 2023.12.13<br/>
              </div>
            </div>
            <div
                class="w-64 pt-px pb-0.5 left-[15px] top-[90px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-500 text-xs font-['Noto_Sans_KR']">고척스카이돔</div>
            </div>
            <div
                class="w-64 pt-px pb-[3px] left-[15px] top-[118px] absolute inline-flex flex-col justify-start items-start">
              <div class="justify-center text-zinc-800 text-base font-bold font-['Noto_Sans_KR']">8,000원 ~ 35,000원</div>
            </div>
            <div
                class="px-2 pt-1 pb-[5px] left-[15px] top-[149px] absolute bg-zinc-100 rounded inline-flex justify-start items-start">
              <div class="justify-center text-zinc-700 text-xs font-medium font-['Noto_Sans_KR']">종료</div>
            </div>
          </div>
        </div>
      </div>
      <div class="self-stretch inline-flex justify-center items-center">
        <div class="flex justify-start items-start gap-3.5">
          <div class="self-stretch pt-px pb-[3px] inline-flex flex-col justify-start items-start">
            <div class="justify-center text-stone-500 text-base font-medium font-['Noto_Sans_KR']"><</div>
          </div>
          <div class="self-stretch pt-px pb-[3px] inline-flex flex-col justify-start items-start">
            <div class="justify-center text-purple-800 text-base font-bold font-['Noto_Sans_KR'] underline">1</div>
          </div>
          <div class="self-stretch pt-px pb-[3px] inline-flex flex-col justify-start items-start">
            <div class="justify-center text-stone-500 text-base font-['Noto_Sans_KR']">2</div>
          </div>
          <div class="self-stretch pt-px pb-[3px] inline-flex flex-col justify-start items-start">
            <div class="justify-center text-stone-500 text-base font-['Noto_Sans_KR']">3</div>
          </div>
          <div class="self-stretch pt-px pb-[3px] inline-flex flex-col justify-start items-start">
            <div class="justify-center text-stone-500 text-base font-['Noto_Sans_KR']">4</div>
          </div>
          <div class="self-stretch pt-px pb-[3px] inline-flex flex-col justify-start items-start">
            <div class="justify-center text-stone-500 text-base font-['Noto_Sans_KR']">5</div>
          </div>
          <div class="self-stretch pt-px pb-[3px] inline-flex flex-col justify-start items-start">
            <div class="justify-center text-stone-500 text-base font-['Noto_Sans_KR']">></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
<script setup>

</script>

<template>
  <div data-layer="Frame" class="inline-flex flex-col justify-start items-center gap-3">
    <div data-layer="title bar" class="self-stretch h-12 inline-flex justify-between items-center">
      <div data-layer="title 게시글(n)" class="justify-start text-neutral-800 text-xl font-bold font-['Inter']">게시글 (128)</div>
      <div data-layer="search input bar" class="w-80 h-10 relative bg-white rounded-[20px] outline outline-1 outline-offset-[-1px] outline-zinc-300">
        <div data-layer="Frame 1321317501" class="w-72 left-[14px] top-[6px] absolute inline-flex justify-between items-center">
          <input type="text" placeholder="게시글 내 재검색" data-layer="게시글 내 재검색" class="w-36 justify-start text-neutral-800 text-sm font-normal font-['Inter']"></input>
          <div data-layer="btn" class="w-7 h-7 relative">
            <div data-layer="Ellipse 3" class="w-7 h-7 left-0 top-0 absolute bg-violet-600 rounded-full"></div>
            <div data-svg-wrapper data-layer="lens-svgrepo-com 1" class="left-[9.33px] top-[9.33px] absolute">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_407_1895)">
                  <path d="M0.333008 4.13192C0.333008 3.6217 0.432563 3.13014 0.631674 2.65725C0.830786 2.18436 1.10145 1.77992 1.44367 1.44392C1.7859 1.10792 2.19034 0.840363 2.65701 0.641252C3.12367 0.442141 3.61523 0.339474 4.13167 0.333252C4.64812 0.333252 5.13967 0.435919 5.60634 0.641252C6.07301 0.846585 6.47745 1.11414 6.81967 1.44392C7.1619 1.7737 7.43256 2.17814 7.63167 2.65725C7.83079 3.13636 7.93034 3.62792 7.93034 4.13192C7.93034 4.83503 7.73745 5.4977 7.35167 6.11992L9.41434 8.17325C9.58234 8.34747 9.66634 8.55592 9.66634 8.79859C9.66634 9.04125 9.58234 9.24658 9.41434 9.41458C9.24634 9.58258 9.0379 9.66658 8.78901 9.66658C8.54012 9.66658 8.33479 9.58258 8.17301 9.41458L6.11967 7.36125C5.49745 7.74081 4.83479 7.93059 4.13167 7.93059C3.61523 7.93059 3.12367 7.83103 2.65701 7.63192C2.19034 7.43281 1.7859 7.16214 1.44367 6.81992C1.10145 6.4777 0.830786 6.07636 0.631674 5.61592C0.432563 5.15547 0.333008 4.66081 0.333008 4.13192ZM1.49967 4.13192C1.49967 4.61103 1.6179 5.05281 1.85434 5.45725C2.09079 5.8617 2.41123 6.17903 2.81567 6.40925C3.22012 6.63947 3.65879 6.7577 4.13167 6.76392C4.48634 6.76392 4.82545 6.69547 5.14901 6.55859C5.47256 6.4217 5.75256 6.23503 5.98901 5.99859C6.22545 5.76214 6.41212 5.48214 6.54901 5.15859C6.6859 4.83503 6.75745 4.49281 6.76367 4.13192C6.7699 3.77103 6.69834 3.42881 6.54901 3.10525C6.39967 2.7817 6.21301 2.50481 5.98901 2.27459C5.76501 2.04436 5.48501 1.8577 5.14901 1.71459C4.81301 1.57147 4.4739 1.49992 4.13167 1.49992C3.65879 1.49992 3.22012 1.61814 2.81567 1.85459C2.41123 2.09103 2.09079 2.41147 1.85434 2.81592C1.6179 3.22036 1.49967 3.65903 1.49967 4.13192Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_407_1895">
                    <rect width="9.33333" height="9.33333" fill="white" transform="translate(0.333008 0.333252)"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div data-layer="게시글 목록 표" class="self-stretch flex flex-col justify-start items-start">
      <div data-layer="시작행" class="self-stretch flex flex-col justify-start items-start gap-2.5">
        <div data-layer="Frame 215" class="inline-flex justify-start items-center">
          <div data-layer="Frame 1321317495" class="w-72 h-12 relative bg-violet-50">
            <div data-layer="구분" class="left-[118px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-bold font-['Inter']">구분</div>
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
          <div data-layer="후기" class="left-[63.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">후기</div>
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
          <div data-layer="후기" class="left-[63.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">후기</div>
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
          <div data-layer="질문" class="left-[45px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">질문</div>
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
          <div data-layer="공지" class="left-[44px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">공지</div>
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
          <div data-layer="후기" class="left-[63.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">후기</div>
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
      <div data-layer="목록행6" class="inline-flex justify-start items-center">
        <div data-layer="Frame 1321317495" class="w-72 h-12 relative bg-white">
          <div data-layer="후기" class="left-[63.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">후기</div>
        </div>
        <div data-layer="Frame 1321317496" class="w-[515px] h-12 relative bg-white">
          <div data-layer="햄릿 원작과 뮤지컬의 차이점 - 각색의 의미" class="left-[124px] top-[16px] absolute justify-start text-neutral-800 text-base font-normal font-['Inter']">햄릿 원작과 뮤지컬의 차이점 - 각색의 의미</div>
        </div>
        <div data-layer="Frame 1321317497" class="w-32 h-12 relative bg-white">
          <div data-layer="햄부기" class="left-[43px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">햄부기</div>
        </div>
        <div data-layer="Frame 1321317498" class="w-28 h-12 relative bg-white">
          <div data-layer="2024.03.06" class="left-[13.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">2024.03.06</div>
        </div>
        <div data-layer="Frame 1321317499" class="w-24 h-12 relative bg-white">
          <div data-layer="123" class="left-[32.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">123</div>
        </div>
        <div data-layer="Frame 1321317500" class="w-24 h-12 relative bg-white">
          <div data-layer="456" class="left-[31.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">456</div>
        </div>
      </div>
      <div data-layer="목록행7" class="inline-flex justify-start items-center">
        <div data-layer="Frame 1321317495" class="w-72 h-12 relative bg-white">
          <div data-layer="후기" class="left-[63.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">후기</div>
        </div>
        <div data-layer="Frame 1321317496" class="w-[515px] h-12 relative bg-white">
          <div data-layer="햄릿 꽃밭페어와 꽃돌페어 비교 분석" class="left-[145.50px] top-[16px] absolute justify-start text-neutral-800 text-base font-normal font-['Inter']">햄릿 꽃밭페어와 꽃돌페어 비교 분석</div>
        </div>
        <div data-layer="Frame 1321317497" class="w-32 h-12 relative bg-white">
          <div data-layer="햄부기" class="w-10 left-[43px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">햄부기</div>
        </div>
        <div data-layer="Frame 1321317498" class="w-28 h-12 relative bg-white">
          <div data-layer="2024.04.01" class="left-[14.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">2024.04.01</div>
        </div>
        <div data-layer="Frame 1321317499" class="w-24 h-12 relative bg-white">
          <div data-layer="123" class="left-[32.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">123</div>
        </div>
        <div data-layer="Frame 1321317500" class="w-24 h-12 relative bg-white">
          <div data-layer="456" class="left-[31.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">456</div>
        </div>
      </div>
      <div data-layer="목록행8" class="inline-flex justify-start items-center">
        <div data-layer="Frame 1321317495" class="w-72 h-12 relative bg-white">
          <div data-layer="후기" class="left-[63.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">후기</div>
        </div>
        <div data-layer="Frame 1321317496" class="w-[515px] h-12 relative bg-white">
          <div data-layer="3월 21일 낮공, 밤공 회전문 후기" class="left-[156px] top-[16px] absolute justify-start text-neutral-800 text-base font-normal font-['Inter']">3월 21일 낮공, 밤공 회전문 후기</div>
        </div>
        <div data-layer="Frame 1321317497" class="w-32 h-12 relative bg-white">
          <div data-layer="슈퍼밴드" class="left-[36.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">슈퍼밴드</div>
        </div>
        <div data-layer="Frame 1321317498" class="w-28 h-12 relative bg-white">
          <div data-layer="2024.03.21" class="left-[14.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">2024.03.21</div>
        </div>
        <div data-layer="Frame 1321317499" class="w-24 h-12 relative bg-white">
          <div data-layer="123" class="left-[32.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">123</div>
        </div>
        <div data-layer="Frame 1321317500" class="w-24 h-12 relative bg-white">
          <div data-layer="456" class="left-[31.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">456</div>
        </div>
      </div>
      <div data-layer="목록행9" class="inline-flex justify-start items-center">
        <div data-layer="Frame 1321317495" class="w-72 h-12 relative bg-white">
          <div data-layer="후기" class="left-[63.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">후기</div>
        </div>
        <div data-layer="Frame 1321317496" class="w-[515px] h-12 relative bg-white">
          <div data-layer="홍광호의 베스트 케미 페어를 찾아서" class="left-[145.50px] top-[16px] absolute justify-start text-neutral-800 text-base font-normal font-['Inter']">홍광호의 베스트 케미 페어를 찾아서</div>
        </div>
        <div data-layer="Frame 1321317497" class="w-32 h-12 relative bg-white">
          <div data-layer="HamBoogi" class="left-[28px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">HamBoogi</div>
        </div>
        <div data-layer="Frame 1321317498" class="w-28 h-12 relative bg-white">
          <div data-layer="2024.03.31" class="left-[14.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">2024.03.31</div>
        </div>
        <div data-layer="Frame 1321317499" class="w-24 h-12 relative bg-white">
          <div data-layer="123" class="left-[32.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">123</div>
        </div>
        <div data-layer="Frame 1321317500" class="w-24 h-12 relative bg-white">
          <div data-layer="456" class="left-[31.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">456</div>
        </div>
      </div>
      <div data-layer="목록행10" class="inline-flex justify-start items-center">
        <div data-layer="Frame 1321317495" class="w-72 h-12 relative bg-white">
          <div data-layer="후기" class="left-[63.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">후기</div>
        </div>
        <div data-layer="Frame 1321317496" class="w-[515px] h-12 relative bg-white">
          <div data-layer="소년미 햄릿의 1인자는? (주관적인 분석)" class="left-[132.50px] top-[16px] absolute justify-start text-neutral-800 text-base font-normal font-['Inter']">소년미 햄릿의 1인자는? (주관적인 분석)</div>
        </div>
        <div data-layer="Frame 1321317497" class="w-32 h-12 relative bg-white">
          <div data-layer="햄부기" class="left-[43px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">햄부기</div>
        </div>
        <div data-layer="Frame 1321317498" class="w-28 h-12 relative bg-white">
          <div data-layer="2024.04.11" class="left-[16px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">2024.04.11</div>
        </div>
        <div data-layer="Frame 1321317499" class="w-24 h-12 relative bg-white">
          <div data-layer="123" class="left-[32.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">123</div>
        </div>
        <div data-layer="Frame 1321317500" class="w-24 h-12 relative bg-white">
          <div data-layer="456" class="left-[31.50px] top-[16.50px] absolute justify-start text-neutral-800 text-sm font-medium font-['Inter']">456</div>
        </div>
      </div>
    </div>
    <div data-layer="페이지 이동 버튼 그룹" class="inline-flex justify-start items-end gap-2.5">
      <div data-svg-wrapper data-layer="page before btn" class="relative">
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z" fill="white" stroke="#DEE2E6"/>
          <path d="M26 11L16 21L26 31" stroke="#495057" stroke-width="2"/>
        </svg>
      </div>
      <div data-layer="page1 btn" class="w-10 h-10 relative">
        <div data-svg-wrapper data-layer="Vector" class="left-0 top-0 absolute">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M36 0H4C1.79086 0 0 1.79086 0 4V36C0 38.2091 1.79086 40 4 40H36C38.2091 40 40 38.2091 40 36V4C40 1.79086 38.2091 0 36 0Z" fill="#7048E8"/>
          </svg>
        </div>
        <div data-layer="1" class="left-[16px] top-[9px] absolute text-center justify-start text-white text-base font-bold font-['Inter']">1</div>
      </div>
      <div data-layer="page2 btn" class="w-10 h-10 relative">
        <div data-svg-wrapper data-layer="Vector" class="left-0 top-0 absolute">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z" fill="white" stroke="#DEE2E6"/>
          </svg>
        </div>
        <div data-layer="2" class="left-[15px] top-[10px] absolute text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">2</div>
      </div>
      <div data-layer="page3 btn" class="w-10 h-10 relative">
        <div data-svg-wrapper data-layer="Vector" class="left-0 top-0 absolute">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z" fill="white" stroke="#DEE2E6"/>
          </svg>
        </div>
        <div data-layer="3" class="left-[15px] top-[10px] absolute text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">3</div>
      </div>
      <div data-layer="page4 btn" class="w-10 h-10 relative">
        <div data-svg-wrapper data-layer="Vector" class="left-0 top-0 absolute">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z" fill="white" stroke="#DEE2E6"/>
          </svg>
        </div>
        <div data-layer="4" class="left-[15px] top-[10px] absolute text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">4</div>
      </div>
      <div data-layer="page5 btn" class="w-10 h-10 relative">
        <div data-svg-wrapper data-layer="Vector" class="left-0 top-0 absolute">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z" fill="white" stroke="#DEE2E6"/>
          </svg>
        </div>
        <div data-layer="5" class="left-[15px] top-[10px] absolute text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">5</div>
      </div>
      <div data-layer="page6 btn" class="w-10 h-10 relative">
        <div data-svg-wrapper data-layer="Vector" class="left-0 top-0 absolute">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z" fill="white" stroke="#DEE2E6"/>
          </svg>
        </div>
        <div data-layer="6" class="left-[15px] top-[10px] absolute text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">6</div>
      </div>
      <div data-layer="page7 btn" class="w-10 h-10 relative">
        <div data-svg-wrapper data-layer="Vector" class="left-0 top-0 absolute">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z" fill="white" stroke="#DEE2E6"/>
          </svg>
        </div>
        <div data-layer="7" class="left-[15px] top-[10px] absolute text-center justify-start text-zinc-600 text-base font-normal font-['Inter']">7</div>
      </div>
      <div data-svg-wrapper data-layer="page after btn" class="relative">
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z" fill="white" stroke="#DEE2E6"/>
          <path d="M16 11L26 21L16 31" stroke="#495057" stroke-width="2"/>
        </svg>
      </div>
      <div data-svg-wrapper data-layer="page far after btn" class="relative">
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M37 1H5C2.79086 1 1 2.79086 1 5V37C1 39.2091 2.79086 41 5 41H37C39.2091 41 41 39.2091 41 37V5C41 2.79086 39.2091 1 37 1Z" fill="white" stroke="#DEE2E6"/>
          <path d="M21 11L31 21L21 31" stroke="#495057" stroke-width="2"/>
          <path d="M11 11L21 21L11 31" stroke="#495057" stroke-width="2"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
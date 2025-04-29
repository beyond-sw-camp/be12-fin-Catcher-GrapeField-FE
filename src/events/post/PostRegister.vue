<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">{{ isEditMode ? '게시글 수정' : '게시글 작성' }}</h1>

    <!-- 게시글 작성 폼 -->
    <form @submit.prevent="isEditMode ? updatePost() : submitPost()">
      <!-- 분류 선택 -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">분류 <span
            class="text-gray-400 text-xs">(필수)</span></label>
        <div class="relative">
          <select v-model="postData.postType"
            class="block w-full px-3 py-2 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option v-for="(value, key) in tabMapping" :key="key" :value="value">
              {{ key }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <!-- 제목 입력 -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">제목 <span
            class="text-gray-400 text-xs">(필수)</span></label>
        <input v-model="postData.title" type="text" placeholder="제목을 입력해주세요."
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500">
      </div>

      <!-- 내용 입력 - 에디터 -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">내용 <span
            class="text-gray-400 text-xs">(필수)</span></label>

        <!-- 에디터 툴바 -->
        <div class="border border-gray-300 rounded-t bg-gray-50 p-2 flex space-x-2">
          <button type="button" @click="applyFormat('bold')" class="p-1 rounded hover:bg-gray-200">
            <span class="font-bold">B</span>
          </button>
          <button type="button" @click="applyFormat('italic')" class="p-1 rounded hover:bg-gray-200">
            <span class="italic">I</span>
          </button>
          <button type="button" @click="applyFormat('underline')" class="p-1 rounded hover:bg-gray-200">
            <span class="underline">U</span>
          </button>
          <div class="h-6 border-l border-gray-300 mx-1"></div>

          <button type="button" @click="applyFormat('image')" class="p-1 rounded hover:bg-gray-200 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- 에디터 내용 영역 -->
        <textarea v-model="postData.content"
          class="w-full h-64 p-3 border border-t-0 border-gray-300 rounded-b focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="내용을 입력해주세요."></textarea>

        <!-- 이미지 첨부용 숨겨진 input -->
        <input ref="fileInput" type="file" @change="handleFileChange" class="hidden" multiple accept="image/*">

        <!-- 새로 추가한 이미지 미리보기 영역 -->
        <div v-if="attachedFiles.length > 0" class="mt-4">
          <p class="text-sm font-medium text-gray-700 mb-2">추가할 이미지</p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="(file, index) in attachedFiles" :key="index" class="relative">
              <div class="bg-purple-100 rounded p-2">
                <div class="text-center text-purple-600 mb-1 text-xs truncate">
                  {{ file.name }}
                </div>
                <div class="aspect-w-4 aspect-h-3 bg-gray-100 flex items-center justify-center">
                  <img :src="getImagePreview(file)" alt="이미지 미리보기" class="max-h-32 max-w-full object-contain" />
                </div>
              </div>
              <button @click="removeFile(index)"
                class="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 기존 이미지 미리보기 영역 (수정 모드일 때) -->
        <div v-if="isEditMode && existingImages.length > 0" class="mt-4">
          <p class="text-sm font-medium text-gray-700 mb-2">기존 이미지</p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="(image, index) in existingImages" :key="index" class="relative">
              <div class="bg-purple-100 rounded p-2">
                <div class="text-center text-purple-600 mb-1 text-xs truncate">
                  {{ getImageName(image) }}
                </div>
                <div class="aspect-w-4 aspect-h-3 bg-gray-100 flex items-center justify-center">
                  <img :src="getImageUrl(image)" alt="기존 이미지" class="max-h-32 max-w-full object-contain" />
                </div>
              </div>
              <button @click="removeExistingImage(index)"
                class="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 이미지 첨부 영역 -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">이미지 첨부</label>
        <div @click="triggerFileInput" @dragover.prevent @drop.prevent="handleFileDrop"
          class="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p class="text-sm text-gray-600">클릭하여 이미지 선택 또는 이미지를 여기에 끌어다 놓으세요</p>
          <p class="text-xs text-gray-500 mt-1">최대 10MB 이하의 이미지 파일만 업로드 가능</p>
        </div>
      </div>

      <!-- 제출 버튼 -->
      <div class="flex justify-end">
        <button type="button" @click="cancel"
          class="px-4 py-2 mr-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
          취소
        </button>
        <button type="submit" class="px-4 py-2 bg-purple-600 rounded text-white hover:bg-purple-700">
          {{ isEditMode ? '수정하기' : '등록하기' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostStore } from '@/stores/usePostStore'
import { useUserStore } from '@/stores/useUserStore'
import { useEventsStore } from '@/stores/useEventsStore';

const route = useRoute();
const router = useRouter();
const postStore = usePostStore();
const userStore = useUserStore();
const eventStore = useEventsStore();

const props = defineProps({
    eventIdx: Number,
    postIdx: Number
});
// API 기본 URL (이미지 URL 생성에 사용)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// 게시판 인덱스
const boardIdx = computed(() => {
  if (props.boardIdx) {
    const parsedId = Number(props.boardIdx);
    return isNaN(parsedId) ? null : parsedId;
  }

  if (route.params.eventIdx) {
    const parsedId = Number(route.params.eventIdx);
    return isNaN(parsedId) ? null : parsedId;
  }
  
  return postStore.currentBoardIdx;
});

// 게시글 인덱스 (수정 모드일 때만 존재)
const postIdx = computed(() => {
  if (props.postIdx) return props.postIdx;
  if (route.params.postIdx) return Number(route.params.postIdx);
  return null;
});

// 수정 모드 여부 확인
const isEditMode = computed(() => {
  return !!postIdx.value;
});

const isAdmin = computed(() => {
  return userStore?.role === 'ROLE_ADMIN';
});

// 탭 매핑 (조건부로 생성)
const tabMapping = computed(() => {
  // 기본 매핑 (모든 사용자에게 보이는 옵션)
  const mapping = {
    '정보': 'INFO',
    '잡담': 'CHAT',
    '후기': 'REVIEW',
    '질문': 'QUESTION',
  };

  // 관리자인 경우에만 공지 옵션 추가
  if (isAdmin.value) {
    // 새로운 객체에 공지를 먼저 추가한 후 기존 매핑을 합침
    return {
      '공지': 'NOTICE',
      ...mapping
    };
  }
  return mapping;
});

// 폼 데이터 - 기본값도 조건부로 설정
const postData = reactive({
  postType: isAdmin.value ? 'NOTICE' : 'CHAT', // 관리자면 기본값을 공지로, 아니면 잡담
  title: '',
  content: '',
});

// 첨부 파일 관련
const fileInput = ref(null);
const attachedFiles = ref([]);
const existingImages = ref([]); // 기존 이미지 (수정 모드)
const removedImagePaths = ref([]); // 삭제할 이미지 경로 목록 (수정 모드)

// 사용자 ID 정보
const userId = computed(() => userStore.userId || userStore.id);

// 게시글 작성자 ID
const authorId = ref(null);

// 수정 권한 확인
const hasEditPermission = computed(() => {
  // 관리자는 모든 게시글 수정 가능
  if (isAdmin.value) return true;
  
  // 자신의 게시글만 수정 가능
  return authorId.value && userId.value && authorId.value === userId.value;
});

// 컴포넌트 마운트 시 초기화
onMounted(async () => {
  if (isEditMode.value) {
    try {
      console.log('현재 boardIdx:', boardIdx.value);

      // 게시글 데이터 불러오기
      const post = await postStore.getPostDetail(postIdx.value);
      
      // 작성자 ID 저장
      authorId.value = post.user_idx;
      
      // 폼 데이터 설정
      postData.postType = post.postType;
      postData.title = post.title;
      postData.content = post.content;
      
      // 기존 이미지 설정
      if (post.images && post.images.length > 0) {
        post.images.forEach(imagePath => {
          existingImages.value.push(imagePath);
        });
      }
    } catch (error) {
      console.error('게시글 데이터 불러오기 오류:', error);
      alert('게시글 데이터를 불러오는데 실패했습니다.');
      router.back();
    }
  }
});

// 이미지 이름 추출 함수
const getImageName = (imagePath) => {
  if (typeof imagePath !== 'string') return '이미지';
  
  // 파일 경로에서 파일명만 추출
  const parts = imagePath.split('/');
  return parts[parts.length - 1] || '이미지';
};

// 이미지 URL 생성 함수
const getImageUrl = (imagePath) => {
  if (typeof imagePath !== 'string') return '';
  
  // 이미 절대 경로인 경우
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // 상대 경로인 경우 API_BASE_URL과 결합
  return `${API_BASE_URL}/${imagePath}`;
};

// 이미지 미리보기 URL 생성
const getImagePreview = (file) => {
  return URL.createObjectURL(file);
};

// 파일 선택 다이얼로그 열기
const triggerFileInput = () => {
  fileInput.value.click();
};

// 파일 변경 처리
const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  for (const file of files) {
    // 이미지 파일인지 확인
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      continue;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      alert('파일 크기는 10MB를 초과할 수 없습니다.');
      continue;
    }

    attachedFiles.value.push(file);
  }
  // 파일 입력 초기화 (동일 파일 재선택 가능하도록)
  event.target.value = '';
};

// 파일 드롭 처리
const handleFileDrop = (event) => {
  const files = Array.from(event.dataTransfer.files);
  for (const file of files) {
    // 이미지 파일인지 확인
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      continue;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      alert('파일 크기는 10MB를 초과할 수 없습니다.');
      continue;
    }

    attachedFiles.value.push(file);
  }
};

// 새 파일 제거
const removeFile = (index) => {
  if (index >= 0 && index < attachedFiles.value.length) {
    attachedFiles.value.splice(index, 1);
  }
};

// 기존 이미지 제거
const removeExistingImage = (index) => {
  if (index >= 0 && index < existingImages.value.length) {
    // 삭제할 이미지 경로 추가
    removedImagePaths.value.push(existingImages.value[index]);
    // 배열에서 제거
    existingImages.value.splice(index, 1);
  }
};

// 텍스트 서식 적용
const applyFormat = (formatType) => {
  switch (formatType) {
    case 'bold':
      postData.content += '**굵은 텍스트**';
      break;
    case 'italic':
      postData.content += '*기울임 텍스트*';
      break;
    case 'underline':
      postData.content += '_밑줄 텍스트_';
      break;
    case 'image':
      triggerFileInput();
      break;
  }
};

// 입력 검증
const validateInput = () => {
  // 필수 필드 검증
  if (!postData.title.trim()) {
    alert('제목을 입력해주세요.');
    return false;
  }
  if (!postData.content.trim()) {
    alert('내용을 입력해주세요.');
    return false;
  }
  // 권한 검증
  if (postData.postType === 'NOTICE' && !isAdmin.value) {
    alert('공지사항은 관리자만 작성할 수 있습니다.');
    return false;
  }
  return true;
};

// 게시글 등록
const submitPost = async () => {
  if (!validateInput()) return;

  try {
    // FormData 생성
    const formData = new FormData();
    const requestData = {
      postType: postData.postType,
      title: postData.title,
      content: postData.content,
      boardIdx: boardIdx.value
    };
    const requestBlob = new Blob([JSON.stringify(requestData)], {
      type: 'application/json'
    });
    formData.append('request', requestBlob);

    // 첨부 파일 추가
    attachedFiles.value.forEach(file => {
      formData.append('images', file);
    });
    
    // API 호출
    const response = await postStore.setPost(formData);
    const newPostIdx = response;
    alert('게시글이 등록되었습니다.');
    eventStore.setTab('게시판');
    router.push(`/events/${boardIdx.value}/post/${newPostIdx}`);
  } catch (error) {
    console.error('게시글 등록 오류:', error);
    const errorMsg = error.response?.data?.message || '게시글 등록 중 오류가 발생했습니다.';
    alert(errorMsg);
  }
};

// 게시글 수정
const updatePost = async () => {
  if (!validateInput()) return;

  try {
    // FormData 생성
    const formData = new FormData();
    const requestData = {
      postType: postData.postType,
      title: postData.title,
      content: postData.content,
      boardIdx: boardIdx.value,
      removedImagePaths: removedImagePaths.value // 삭제할 이미지 경로 목록
    };
    console.log('수정 요청 데이터:', requestData);

    const requestBlob = new Blob([JSON.stringify(requestData)], {
      type: 'application/json'
    });
    formData.append('request', requestBlob);

    // 첨부 파일 추가
    attachedFiles.value.forEach(file => {
      formData.append('images', file);
    });
    
    // API 호출
    await postStore.updatePost(postIdx.value, formData);
    alert('게시글이 수정되었습니다.');
    router.push(`/events/${Number(boardIdx.value)}/post/${Number(postIdx.value)}`);
  } catch (error) {
    console.error('게시글 수정 오류:', error);
    const errorMsg = error.response?.data?.message || '게시글 수정 중 오류가 발생했습니다.';
    alert(errorMsg);
  }
};

// 취소 - 이전 페이지로 이동
const cancel = () => {
  router.back();
};
</script>
<style scoped></style>
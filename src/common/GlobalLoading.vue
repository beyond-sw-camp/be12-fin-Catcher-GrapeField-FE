<template>
    <div v-if="loadingStore.isLoading" class="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <img src="/assets/loading-v1.svg" alt="로딩 중" class="w-12 h-12 animate-spin opacity-80" />
    </div>
</template>

<script setup>
import { watch } from 'vue'
import { useLoadingStore } from '@/stores/useLoadingStore'
const loadingStore = useLoadingStore()

watch(() => loadingStore.isLoading, (newVal) => {
    //console.log('💡 loading 상태 변경:', newVal)
})
</script>
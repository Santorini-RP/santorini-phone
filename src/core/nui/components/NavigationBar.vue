<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '@core/nui/store/layout'

const router = useRouter()
const layoutStore = useLayoutStore()

const goHome = () => {
  router.push('/')
}

const barColorClass = computed(() => {
  return layoutStore.navigationBarStyle === 'light' 
    ? 'bg-black/80 hover:bg-black' 
    : 'bg-white/80 hover:bg-white'
})
</script>

<template>
  <div 
    v-if="layoutStore.isNavigationBarVisible"
    class="absolute bottom-0 left-0 right-0 h-8 flex justify-center items-center z-30 pointer-events-none"
  >
    <div
      class="w-36 h-1.5 rounded-full cursor-pointer pointer-events-auto transition-all duration-200"
      :class="barColorClass"
      @click="goHome"
    ></div>
  </div>
</template>

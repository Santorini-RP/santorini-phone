<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next'

defineProps<{
  title: string;
  previousTitle: string;
}>();

const router = useRouter();
const goBack = () => router.back();
</script>

<template>
  <div 
    class="absolute top-0 left-0 right-0 z-20 h-[4.5rem] flex items-end pb-2 transition-all duration-300 bg-gray-100/80 dark:bg-ios-dark-card/80 backdrop-blur-md border-b border-gray-300/50 dark:border-gray-700/50"
  >
    <div class="w-full flex items-center justify-between px-2 relative">
      <!-- Back Button -->
      <button @click="goBack" class="flex items-center text-blue-500 text-lg">
        <ChevronLeft class="w-8 h-8 -ml-2" />
        <span class="-ml-2">{{ previousTitle }}</span>
      </button>
      
      <!-- Centered Title -->
      <h2 class="absolute left-1/2 -translate-x-1/2 font-semibold text-black dark:text-white">
        {{ title }}
      </h2>
      
      <!-- Spacer to balance the back button -->
      <div class="w-20 h-8"></div>
    </div>
  </div>
</template>

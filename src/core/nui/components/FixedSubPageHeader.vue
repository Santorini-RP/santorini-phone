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
  <div class="sticky top-0 z-20 pt-10 bg-gray-100/80 dark:bg-ios-dark-bg/80 backdrop-blur-md">
    <div class="w-full flex items-center px-2 pb-2 relative">
      <button @click="goBack" class="flex items-center text-blue-500 text-lg">
        <ChevronLeft class="w-8 h-8 -ml-2" />
        <span class="-ml-2">{{ previousTitle }}</span>
      </button>
      <h1 class="text-lg text-black dark:text-white ml-3 font-normal">{{ title }}</h1>
    </div>
  </div>
</template>

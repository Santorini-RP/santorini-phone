<script setup lang="ts">
defineProps<{
  title: string;
  isScrolled: boolean;
}>();
</script>

<template>
  <div 
    class="absolute top-0 left-0 right-0 z-20 h-[4.5rem] flex items-end justify-center pb-2 transition-all duration-300 pointer-events-none"
    :class="{
      'bg-gray-100/80 dark:bg-ios-dark-card/80 backdrop-blur-md border-b border-gray-300/50 dark:border-gray-700/50': isScrolled,
      'bg-transparent': !isScrolled
    }"
  >
    <h2 
      class="font-semibold text-black dark:text-white transition-opacity duration-300"
      :class="{ 'opacity-100': isScrolled, 'opacity-0': !isScrolled }"
    >
      {{ title }}
    </h2>
  </div>
</template>

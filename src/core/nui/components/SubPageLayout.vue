<script setup lang="ts">
import { ref } from 'vue'
import SubPageHeader from './SubPageHeader.vue'

defineProps<{
  title: string;
  previousTitle: string;
}>();

const isScrolled = ref(false);

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  isScrolled.value = target.scrollTop > 10;
}
</script>

<template>
  <div class="h-full flex flex-col relative">
    <SubPageHeader 
      :title="title" 
      :previous-title="previousTitle" 
      :is-scrolled="isScrolled" 
    />
    
    <div 
      class="flex-1 overflow-y-auto no-scrollbar"
      @scroll="handleScroll"
    >
      <div class="p-4 pt-0 space-y-4">
        <!-- Large Header -->
        <h1 class="text-3xl font-bold px-2">{{ title }}</h1>

        <!-- Content Slot -->
        <slot></slot>

        <!-- Bottom Spacer ("Respiro") -->
        <div class="h-8"></div>
      </div>
    </div>
  </div>
</template>

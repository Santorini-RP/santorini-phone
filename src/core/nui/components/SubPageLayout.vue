<script setup lang="ts">
import SubPageHeader from './SubPageHeader.vue'

defineProps<{
  title: string;
  previousTitle: string;
}>();
</script>

<template>
  <div class="h-full flex flex-col relative text-black dark:text-white">
    <SubPageHeader 
      :title="title" 
      :previous-title="previousTitle" 
    />
    
    <!-- O padding top garante que o conteúdo comece abaixo do header fixo -->
    <div class="flex-1 overflow-y-auto no-scrollbar pt-[4.5rem]">
      <div class="p-4 space-y-4">
        <!-- Content Slot -->
        <slot></slot>

        <!-- Bottom Spacer ("Respiro") -->
        <div class="h-8"></div>
      </div>
    </div>
  </div>
</template>

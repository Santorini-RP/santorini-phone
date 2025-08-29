<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  icon: Component;
  label: string;
  isActive?: boolean;
}>();
</script>

<template>
  <button class="flex flex-col items-center space-y-2">
    <div 
      class="w-16 h-16 rounded-full flex items-center justify-center transition-colors"
      :class="isActive ? 'bg-white text-black' : 'bg-white/20 text-white'"
    >
      <component :is="icon" class="w-8 h-8" />
    </div>
    <span class="text-xs text-white font-medium">{{ label }}</span>
  </button>
</template>

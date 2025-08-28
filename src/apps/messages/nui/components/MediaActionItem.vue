<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

defineProps<{
  icon: FunctionalComponent;
  label: string;
  iconColor: string;
}>();

const emit = defineEmits(['click']);
</script>

<template>
  <button @click="$emit('click')" class="flex flex-col items-center justify-center space-y-2 w-20">
    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100 transition-colors">
      <component :is="icon" :class="iconColor" class="w-8 h-8" />
    </div>
    <span class="text-xs text-[#0A0A0A]">{{ label }}</span>
  </button>
</template>

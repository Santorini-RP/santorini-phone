<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

defineProps<{
  label: string;
  icon: FunctionalComponent;
  bgColor: string;
}>();
</script>

<template>
  <div
    class="h-full flex flex-col items-center justify-center text-white w-[85px] transition-colors"
    :class="bgColor"
  >
    <component :is="icon" class="w-6 h-6" />
    <span class="text-sm mt-1">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  icon: Component;
  iconBgColor: string;
  title: string;
  subtitle: string;
}>();
</script>

<template>
  <div class="flex items-center p-3 space-x-3">
    <div
      class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
      :class="iconBgColor"
    >
      <component :is="icon" class="w-6 h-6 text-white" />
    </div>
    <div class="flex-1 min-w-0">
      <p class="font-medium text-black dark:text-white">{{ title }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ subtitle }}</p>
    </div>
    <div>
      <slot name="action"></slot>
    </div>
  </div>
</template>

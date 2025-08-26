<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next';
import type { Component } from 'vue';

interface Setting {
  id: string;
  title: string;
  icon: Component;
  action?: () => void;
}

defineProps<{
  item: Setting;
  hasSeparator?: boolean;
}>();
</script>

<template>
  <div class="relative">
    <div class="flex items-center p-3 space-x-4 cursor-pointer hover:bg-gray-50 transition-colors">
      <component :is="item.icon" class="w-6 h-6 text-[#0A0A0A] flex-shrink-0" />
      <p class="flex-1 text-base text-[#0A0A0A]">{{ item.title }}</p>
      <ChevronRight class="w-5 h-5 text-gray-400" />
    </div>
    <div v-if="hasSeparator" class="border-b border-gray-200 ml-14"></div>
  </div>
</template>

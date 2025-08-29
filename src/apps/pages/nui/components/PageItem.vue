<script setup lang="ts">
import type { Page } from '../store/app-store';
import { usePagesStore } from '../store/app-store';
import { MessageSquare, Phone } from 'lucide-vue-next';

defineProps<{
  page: Page;
}>();

const store = usePagesStore();

const handleAction = (action: 'message' | 'call') => {
  alert(`Action: ${action}`);
};
</script>

<template>
  <div class="bg-white dark:bg-ios-dark-card rounded-xl p-4 space-y-3">
    <div class="flex items-start space-x-4">
      <div class="flex-1 min-w-0">
        <h3 class="font-bold text-lg text-black dark:text-white">{{ page.title }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 leading-snug mt-1">
          {{ page.description }}
        </p>
        <p v-if="page.price" class="font-bold text-base text-black dark:text-white mt-3">
          {{ store.formatPrice(page.price) }}
        </p>
      </div>
      <div v-if="page.imageUrl" class="w-24 h-20 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
        <img :src="page.imageUrl" :alt="page.title" class="w-full h-full object-cover" />
      </div>
    </div>
    <div class="flex justify-end items-center space-x-2">
      <button @click.stop="handleAction('message')" class="w-9 h-9 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors">
        <MessageSquare class="w-5 h-5" />
      </button>
      <button @click.stop="handleAction('call')" class="w-9 h-9 rounded-lg bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors">
        <Phone class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

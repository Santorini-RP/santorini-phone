<script setup lang="ts">
import { computed, markRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Building2, MessageSquare, Monitor } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const tabs = computed(() => [
  { name: 'Companies', icon: markRaw(Building2), path: '/app/services/companies', active: route.name === 'services-companies' },
  { name: 'Messages', icon: markRaw(MessageSquare), path: '/app/services/messages', active: route.name === 'services-messages' },
  { name: 'Actions', icon: markRaw(Monitor), path: '/app/services/actions', active: route.name === 'services-actions' },
]);

const navigateTo = (path: string) => {
  if (path !== '#') {
    router.push(path);
  }
};
</script>

<template>
  <div class="w-full bg-gray-100/80 dark:bg-ios-dark-bg/80 backdrop-blur-lg border-t border-gray-200/80 dark:border-gray-700/60">
    <div class="flex justify-around items-center pt-2 pb-8">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        @click="navigateTo(tab.path)"
        class="flex flex-col items-center justify-center space-y-1 w-24 h-12 transition-colors"
        :class="tab.active ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400'"
      >
        <component :is="tab.icon" class="w-6 h-6" :fill="tab.active && tab.name === 'Messages' ? 'currentColor' : 'none'" />
        <span class="text-xs font-medium">{{ tab.name }}</span>
      </button>
    </div>
  </div>
</template>

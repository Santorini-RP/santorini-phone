<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLayoutStore } from '@core/nui/store/layout';
import { getAppById } from '@core/nui/services/appManager';
import type { AppStoreItem } from '../store/app-store';

const props = defineProps<{
  app: AppStoreItem,
  isLast: boolean
}>()

const router = useRouter();
const layoutStore = useLayoutStore();

const isInstalled = computed(() => {
  return layoutStore.isAppInstalled(props.app.id);
});

const appManifest = computed(() => getAppById(props.app.id));

const handleButtonClick = () => {
  if (isInstalled.value) {
    if (appManifest.value?.route) {
      router.push(appManifest.value.route);
    } else {
      console.warn(`No route found for installed app: ${props.app.id}`);
    }
  } else {
    layoutStore.installApp(props.app.id);
  }
};

const goToDetail = () => {
  router.push(`/app/apps/${props.app.id}`);
}
</script>

<template>
  <div>
    <div @click="goToDetail" class="flex items-center space-x-4 py-3 cursor-pointer">
      <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
        <img :src="app.icon" :alt="app.name" class="w-full h-full object-cover" @error="($event.target as HTMLImageElement).src = '/src/core/nui/assets/images/UnknownApp.jpg'">
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-base text-black dark:text-white truncate">{{ app.name }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ app.description }}</p>
      </div>
      <button
        @click.stop="handleButtonClick"
        class="font-bold text-sm px-5 py-1.5 rounded-full transition-colors w-20 text-center"
        :class="{
          'bg-blue-500 text-white hover:bg-blue-600': isInstalled,
          'bg-gray-200/80 dark:bg-gray-700/80 text-blue-500 hover:bg-gray-300 dark:hover:bg-gray-600': !isInstalled
        }"
      >
        {{ isInstalled ? 'OPEN' : 'GET' }}
      </button>
    </div>
    <div v-if="!isLast" class="border-b border-gray-300 dark:border-gray-700/60"></div>
  </div>
</template>

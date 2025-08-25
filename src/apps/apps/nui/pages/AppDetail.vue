<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAppsStore } from '../store/app-store';
import { useLayoutStore } from '@core/nui/store/layout';
import PageLayout from '@core/nui/components/PageLayout.vue';

const props = defineProps<{
  appId: string;
}>();

const appsStore = useAppsStore();
const layoutStore = useLayoutStore();
const router = useRouter();

const app = computed(() => {
  return appsStore.getAppById(props.appId);
});

const isInstalled = computed(() => {
  return layoutStore.isAppInstalled(props.appId);
});

const handleButtonClick = () => {
  if (isInstalled.value) {
    if (app.value?.route) {
      router.push(app.value.route);
    }
  } else {
    layoutStore.installApp(props.appId);
  }
};

const formatBytes = (bytes: number, decimals = 1) => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const appSize = computed(() => {
  if (!app.value || !app.value.size) return 'N/A';
  return formatBytes(app.value.size);
});

const informationItems = computed(() => {
  if (!app.value) return [];
  return [
    { label: 'Provider', value: app.value.provider },
    { label: 'Size', value: appSize.value },
    { label: 'Compatibility', value: app.value.compatibility },
    { label: 'In-App Purchases', value: app.value.inAppPurchases },
  ];
});
</script>

<template>
  <PageLayout v-if="app" page-title="" previous-title="Apps">
    <div class="pt-4">
      <!-- App Header -->
      <div class="px-6 pb-6">
        <div class="flex items-start space-x-4">
          <div class="w-20 h-20 rounded-[22%] overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700 shadow-md">
            <img :src="app.icon" :alt="app.name" class="w-full h-full object-cover">
          </div>
          <div class="flex-1 min-w-0 pt-1">
            <h2 class="text-xl font-bold text-black dark:text-white truncate">{{ app.name }}</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ app.description }}</p>
            <div class="mt-2">
              <button
                @click="handleButtonClick"
                class="bg-blue-500 text-white font-bold text-sm px-8 py-1.5 rounded-full hover:bg-blue-600 transition-colors"
              >
                {{ isInstalled ? 'OPEN' : 'GET' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Screenshots -->
      <div v-if="app.screenshots && app.screenshots.length > 0" class="pb-6">
        <div class="border-t border-gray-200 dark:border-gray-700/60"></div>
        <div class="flex space-x-3 overflow-x-auto no-scrollbar px-6 pt-6">
          <div v-for="(screenshot, index) in app.screenshots" :key="index" class="flex-shrink-0 w-[45%]">
            <img :src="screenshot" alt="App screenshot" class="w-full h-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          </div>
        </div>
      </div>

      <!-- Information Section -->
      <div class="pb-6">
        <div class="border-t border-gray-200 dark:border-gray-700/60"></div>
        <div class="px-6 pt-6">
          <h3 class="text-xl font-bold text-black dark:text-white mb-2">Information</h3>
          <div class="text-base">
            <div
              v-for="(item, index) in informationItems"
              :key="index"
              class="flex justify-between items-center py-3"
              :class="{ 'border-b border-gray-200 dark:border-gray-700/60': index < informationItems.length - 1 }"
            >
              <span class="text-gray-500 dark:text-gray-400">{{ item.label }}</span>
              <span class="text-black dark:text-white text-right">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </PageLayout>
  <div v-else class="p-8 text-center text-gray-500 dark:text-gray-400">
    App not found.
  </div>
</template>

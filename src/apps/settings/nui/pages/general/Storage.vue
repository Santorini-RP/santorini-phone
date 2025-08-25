<script setup lang="ts">
import { computed } from 'vue';
import { getAllApps } from '@core/nui/services/appManager';
import { useSystemStore } from '@core/nui/store/system';
import PageLayout from '@core/nui/components/PageLayout.vue';

const systemStore = useSystemStore();

// Helper to format bytes into a readable string
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Get all apps, filter those with a size, and sort by size descending
const sortedApps = computed(() => {
  return getAllApps()
    .filter(app => app.size && app.size > 0)
    .sort((a, b) => (b.size || 0) - (a.size || 0));
});

// Calculate total size of all installed apps
const appsTotalSize = computed(() => {
  return sortedApps.value.reduce((total, app) => total + (app.size || 0), 0);
});

// Calculate total used storage (apps + system)
const totalUsedSize = computed(() => {
  return appsTotalSize.value + systemStore.systemUsage;
});

const getAppIcon = (appId: string) => {
  return `/src/apps/${appId}/nui/assets/images/AppLogo.jpg`;
};
</script>

<template>
  <PageLayout page-title="Storage" previous-title="General">
    <div class="p-4 space-y-6">
      <!-- Used Storage Bar -->
      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2 p-3">
        <div class="flex justify-between items-center">
          <span class="text-black dark:text-white">Used</span>
          <span class="text-gray-500 dark:text-gray-400">
            {{ formatBytes(totalUsedSize, 2) }} of {{ formatBytes(systemStore.totalStorage, 0) }}
          </span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
          <div
            class="bg-blue-500 h-2 rounded-full"
            :style="{ width: `${(totalUsedSize / systemStore.totalStorage) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Apps List -->
      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
        <div
          v-for="(app, index) in sortedApps"
          :key="app.id"
          class="flex items-center p-3 space-x-3"
          :class="{ 'border-b border-gray-200 dark:border-gray-700/60': index < sortedApps.length - 1 }"
        >
          <div class="w-7 h-7 rounded-md flex items-center justify-center overflow-hidden">
            <img 
              :src="getAppIcon(app.id)" 
              :alt="app.name" 
              class="w-full h-full object-cover"
              @error="($event.target as HTMLImageElement).src = '/src/core/nui/assets/images/UnknownApp.jpg'"
            />
          </div>
          <p class="flex-1 text-black dark:text-white">{{ app.name }}</p>
          <span class="text-gray-500 dark:text-gray-400">{{ formatBytes(app.size || 0) }}</span>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

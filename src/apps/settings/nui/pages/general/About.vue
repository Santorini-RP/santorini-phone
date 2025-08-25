<script setup lang="ts">
import { ref } from 'vue';
import PageLayout from '@core/nui/components/PageLayout.vue';

const phoneInfo = ref([
  { label: 'Name', value: "LB's Phone" },
  { label: 'Version', value: '2.0.0' },
  { label: 'Model Name', value: 'LB Phone' },
  { label: 'Serial Number', value: 'DSDWWWSSF3' },
  { label: 'Developed by', value: 'Breze & Loaf Scripts' },
  { label: 'Purchase at', value: 'https://store.lbscripts.com', isLink: true },
]);

const storageInfo = ref([
  { label: 'Songs', value: '0' },
  { label: 'Videos', value: '0' },
  { label: 'Photos', value: '0' },
  { label: 'Applications', value: '28' },
  { label: 'Capacity', value: '128 GB' },
  { label: 'Available', value: '119.4 GB' },
]);
</script>

<template>
  <PageLayout page-title="About" previous-title="General">
    <div class="p-4 space-y-6">
      <!-- Phone Info Group -->
      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
        <div
          v-for="(item, index) in phoneInfo"
          :key="item.label"
          class="flex items-center justify-between p-3"
          :class="{ 'border-b border-gray-200 dark:border-gray-700/60': index < phoneInfo.length - 1 }"
        >
          <span class="text-black dark:text-white">{{ item.label }}</span>
          <a
            v-if="item.isLink"
            :href="item.value"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:underline"
          >
            {{ item.value }}
          </a>
          <span v-else class="text-gray-500 dark:text-gray-400">{{ item.value }}</span>
        </div>
      </div>

      <!-- Storage Info Group -->
      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
        <div
          v-for="(item, index) in storageInfo"
          :key="item.label"
          class="flex items-center justify-between p-3"
          :class="{ 'border-b border-gray-200 dark:border-gray-700/60': index < storageInfo.length - 1 }"
        >
          <span class="text-black dark:text-white">{{ item.label }}</span>
          <span class="text-gray-500 dark:text-gray-400">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

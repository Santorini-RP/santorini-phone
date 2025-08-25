<script setup lang="ts">
import { useSystemStore } from '@core/nui/store/system';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { ChevronRight } from 'lucide-vue-next';

const systemStore = useSystemStore();

const handleTimeZoneClick = () => {
  alert('Time Zone selection is not yet implemented.');
};
</script>

<template>
  <PageLayout page-title="Date & Time" previous-title="General">
    <div class="p-4 space-y-6">
      <!-- 24-Hour Time Toggle -->
      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
        <div class="p-3 flex justify-between items-center">
          <span class="font-medium text-black dark:text-white">24-Hour Time</span>
          <button
            @click="systemStore.toggle24HourTime()"
            class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5"
            :class="systemStore.use24HourTime ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'"
          >
            <span
              class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
              :class="{ 'translate-x-5': systemStore.use24HourTime }"
            ></span>
          </button>
        </div>
      </div>

      <!-- Automatic Settings Group -->
      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
        <!-- Set Automatically Toggle -->
        <div class="p-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700/60">
          <span class="font-medium text-black dark:text-white">Set Automatically</span>
          <button
            @click="systemStore.toggleSetTimeAutomatically()"
            class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5"
            :class="systemStore.setTimeAutomatically ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'"
          >
            <span
              class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
              :class="{ 'translate-x-5': systemStore.setTimeAutomatically }"
            ></span>
          </button>
        </div>
        <!-- Time Zone -->
        <div
          @click="handleTimeZoneClick"
          class="flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <p class="flex-1 text-black dark:text-white">Time Zone</p>
          <div class="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <span>{{ systemStore.timeZone }}</span>
            <ChevronRight class="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

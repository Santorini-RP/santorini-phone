<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSystemStore } from '@core/nui/store/system';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { ChevronRight } from 'lucide-vue-next';

const systemStore = useSystemStore();
const router = useRouter();

const handleLanguageClick = () => {
  router.push('/app/settings/general/language-region/language');
};

const handleTemperatureClick = () => {
  router.push('/app/settings/general/language-region/temperature');
};

const displayTemperatureUnit = computed(() => {
  return systemStore.temperatureUnit === 'C' ? 'Celsius' : 'Fahrenheit';
});
</script>

<template>
  <PageLayout page-title="Language & Region" previous-title="General">
    <div class="p-4 space-y-6">
      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
        <!-- Language -->
        <div
          @click="handleLanguageClick"
          class="flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200 dark:border-gray-700/60"
        >
          <p class="flex-1 text-black dark:text-white">Language</p>
          <div class="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <span>{{ systemStore.language }}</span>
            <ChevronRight class="w-5 h-5" />
          </div>
        </div>
        <!-- Temperature -->
        <div
          @click="handleTemperatureClick"
          class="flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <p class="flex-1 text-black dark:text-white">Temperature</p>
          <div class="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <span>{{ displayTemperatureUnit }}</span>
            <ChevronRight class="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

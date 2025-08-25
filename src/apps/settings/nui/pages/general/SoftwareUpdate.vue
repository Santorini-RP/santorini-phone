<script setup lang="ts">
import { useRouter } from 'vue-router';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { ChevronRight } from 'lucide-vue-next';

const router = useRouter();

const handleAutomaticUpdatesClick = () => {
  // TODO: Navigate to Automatic Updates page when created
  alert('Automatic Updates page is not yet implemented.');
};
</script>

<template>
  <PageLayout page-title="Software Update" previous-title="General">
    <div class="h-full flex flex-col">
      <!-- Top Settings Group -->
      <div class="pt-4">
        <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-6">
          <div
            @click="handleAutomaticUpdatesClick"
            class="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <span class="text-black dark:text-white">Automatic Updates</span>
            <div class="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <span>Off</span>
              <ChevronRight class="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <!-- Center/Bottom Version Info -->
      <div class="flex-1 flex flex-col items-center justify-center text-center pb-20">
        <p class="text-base text-gray-500 dark:text-gray-400">V 2.0.0</p>
        <p class="text-base text-gray-500 dark:text-gray-400 mt-1">Your phone is up to date</p>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { useSystemStore } from '@core/nui/store/system';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { Check } from 'lucide-vue-next';

const systemStore = useSystemStore();

const selectLanguage = (language: string) => {
  systemStore.setLanguage(language);
};
</script>

<template>
  <PageLayout page-title="Language" previous-title="Language & Region">
    <div class="p-4">
      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
        <div
          v-for="(lang, index) in systemStore.availableLanguages"
          :key="lang"
          @click="selectLanguage(lang)"
          class="flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          :class="{ 'border-b border-gray-200 dark:border-gray-700/60': index < systemStore.availableLanguages.length - 1 }"
        >
          <div class="w-6">
            <Check v-if="systemStore.language === lang" class="w-5 h-5 text-blue-500" />
          </div>
          <p class="text-black dark:text-white">{{ lang }}</p>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

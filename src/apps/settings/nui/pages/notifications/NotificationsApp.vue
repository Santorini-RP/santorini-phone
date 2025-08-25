<script setup lang="ts">
import { computed } from 'vue';
import { getAppById } from '@core/nui/services/appManager';
import PageLayout from '@core/nui/components/PageLayout.vue';

const props = defineProps<{
  appId: string;
}>();

const app = computed(() => getAppById(props.appId));

const getAppIcon = (appId: string) => {
  return `/src/apps/${appId}/nui/assets/images/AppLogo.jpg`;
};
</script>

<template>
  <PageLayout v-if="app" :page-title="app.name" previous-title="Notifications">
    <div class="p-4 space-y-4">
        <div class="flex flex-col items-center justify-center py-4">
            <div class="w-16 h-16 rounded-2xl overflow-hidden mb-4 shadow-md">
                <img :src="getAppIcon(app.id)" :alt="app.name" class="w-full h-full object-cover" />
            </div>
        </div>

      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
        <div class="p-3 flex justify-between items-center">
          <span class="font-medium text-black dark:text-white">Allow Notifications</span>
          <button
            class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5 bg-green-500"
          >
            <span
              class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 translate-x-5"
            ></span>
          </button>
        </div>
      </div>

      <div class="px-4 text-sm text-gray-500 dark:text-gray-400">
        When notifications are on, they can appear on the Lock Screen, in Notification Center, and as banners.
      </div>
    </div>
  </PageLayout>
  <div v-else class="p-4 text-center text-gray-500">
    App not found.
  </div>
</template>

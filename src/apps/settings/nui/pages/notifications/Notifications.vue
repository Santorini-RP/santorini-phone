<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAllApps } from '@core/nui/services/appManager';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { ChevronRight } from 'lucide-vue-next';

const router = useRouter();
// Filtra o próprio app de Ajustes da lista de notificações
const allApps = computed(() => getAllApps().filter(app => app.id !== 'settings'));

const getAppIcon = (appId: string) => {
  return `/src/apps/${appId}/nui/assets/images/AppLogo.jpg`;
};
</script>

<template>
  <PageLayout page-title="Notifications" previous-title="Settings">
    <div class="p-4 space-y-4">
      <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-4 mb-2">
        NOTIFICATION STYLE
      </h3>
      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
        <div
          v-for="(app, index) in allApps"
          :key="app.id"
          @click="router.push(`/app/settings/notifications/${app.id}`)"
          class="flex items-center p-3 space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          :class="{ 'border-b border-gray-200 dark:border-gray-700/60': index < allApps.length - 1 }"
        >
          <!-- Icon -->
          <div class="w-7 h-7 rounded-md flex items-center justify-center overflow-hidden">
            <img 
              :src="getAppIcon(app.id)" 
              :alt="app.name" 
              class="w-full h-full object-cover"
              @error="($event.target as HTMLImageElement).src = '/src/core/nui/assets/images/UnknownApp.jpg'"
            />
          </div>
          
          <!-- Text -->
          <div class="flex-1">
            <p class="text-black dark:text-white">{{ app.name }}</p>
          </div>

          <!-- Action -->
          <div>
            <ChevronRight class="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

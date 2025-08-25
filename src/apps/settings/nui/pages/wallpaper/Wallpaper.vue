<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSettingsStore } from '../../store/app-store';
import { useSystemStore } from '@core/nui/store/system';
import { useLayoutStore } from '@core/nui/store/layout';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { ChevronRight } from 'lucide-vue-next';

const settingsStore = useSettingsStore();
const systemStore = useSystemStore();
const layoutStore = useLayoutStore();
const router = useRouter();

const wallpaperUrl = computed(() => systemStore.currentWallpaper.url);

const handleChooseWallpaper = () => {
  router.push('/app/settings/wallpaper/choose');
};

const currentTime = computed(() => {
  const now = new Date();
  return now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
});

const currentDate = computed(() => {
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
});

const homeScreenApps = computed(() => layoutStore.layout.pages[0]?.slice(0, 16) || []);
const dockApps = computed(() => layoutStore.layout.dock);

const getAppIcon = (appId: string) => {
  return `/src/apps/${appId}/nui/assets/images/AppLogo.jpg`;
};
</script>

<template>
  <PageLayout page-title="Wallpaper" previous-title="Settings">
    <div class="p-4 space-y-6">
      <!-- Choose Wallpaper Section -->
      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
        <div
          @click="handleChooseWallpaper"
          class="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <span class="text-blue-500">Choose a New Wallpaper</span>
          <ChevronRight class="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <!-- Previews -->
      <div class="flex justify-center items-start space-x-4 px-2">
        <!-- Lock Screen Preview -->
        <div class="flex-1 flex flex-col items-center space-y-2">
          <p class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">Lock Screen</p>
          <div
            class="w-full aspect-[9/19.5] rounded-xl overflow-hidden relative bg-cover bg-center shadow-md"
            :style="{ backgroundImage: `url(${wallpaperUrl})` }"
          >
            <div class="absolute inset-0 bg-black/10"></div>
            <div class="absolute inset-0 flex flex-col items-center pt-12 text-white">
              <p class="text-5xl font-bold [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">{{ currentTime }}</p>
              <p class="text-sm font-medium opacity-90 mt-1 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">{{ currentDate }}</p>
            </div>
          </div>
        </div>
        <!-- Home Screen Preview -->
        <div class="flex-1 flex flex-col items-center space-y-2">
          <p class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">Home Screen</p>
          <div
            class="w-full aspect-[9/19.5] rounded-xl overflow-hidden relative bg-cover bg-center shadow-md"
            :style="{ backgroundImage: `url(${wallpaperUrl})` }"
          >
            <div class="absolute inset-0 bg-black/10"></div>
            <!-- Mock App Icons -->
            <div class="absolute inset-0 p-4 grid grid-cols-4 gap-2">
              <div v-for="appId in homeScreenApps" :key="`preview-${appId}`" class="w-full aspect-square rounded-lg overflow-hidden">
                <img :src="getAppIcon(appId)" :alt="appId" class="w-full h-full object-cover" @error="($event.target as HTMLImageElement).src = '/src/core/nui/assets/images/UnknownApp.jpg'">
              </div>
            </div>
            <!-- Mock Dock -->
            <div class="absolute bottom-4 left-4 right-4 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-around px-2">
              <div v-for="appId in dockApps" :key="`dock-preview-${appId}`" class="w-8 h-8 rounded-md overflow-hidden">
                 <img :src="getAppIcon(appId)" :alt="appId" class="w-full h-full object-cover" @error="($event.target as HTMLImageElement).src = '/src/core/nui/assets/images/UnknownApp.jpg'">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Blur Homescreen Toggle -->
      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
        <div class="p-3 flex justify-between items-center">
          <span class="font-medium text-black dark:text-white">Blur Homescreen</span>
          <button
            @click="settingsStore.toggleBlurHomescreen()"
            class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5"
            :class="settingsStore.blurHomescreen ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'"
          >
            <span
              class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
              :class="{ 'translate-x-5': settingsStore.blurHomescreen }"
            ></span>
          </button>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

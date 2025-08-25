<script setup lang="ts">
import { useSystemStore } from '@core/nui/store/system';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { Plus } from 'lucide-vue-next';

const systemStore = useSystemStore();

const handleAddWallpaper = () => {
  alert('Adding custom wallpapers from gallery is not yet implemented.');
};

const selectWallpaper = (wallpaperId: string) => {
  systemStore.setWallpaper(wallpaperId);
};
</script>

<template>
  <PageLayout page-title="Wallpapers" previous-title="Wallpaper">
    <div class="p-4">
      <div class="grid grid-cols-3 gap-1">
        <!-- Add New Wallpaper -->
        <div
          @click="handleAddWallpaper"
          class="aspect-[9/19.5] bg-gray-200 dark:bg-ios-dark-card rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors"
        >
          <Plus class="w-12 h-12 text-gray-400 dark:text-gray-500" />
        </div>

        <!-- Available Wallpapers -->
        <div
          v-for="wallpaper in systemStore.availableWallpapers"
          :key="wallpaper.id"
          @click="selectWallpaper(wallpaper.id)"
          class="aspect-[9/19.5] rounded-lg overflow-hidden cursor-pointer border-2 transition-all"
          :class="systemStore.currentWallpaperId === wallpaper.id ? 'border-blue-500' : 'border-transparent'"
        >
          <img :src="wallpaper.url" :alt="wallpaper.name" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </PageLayout>
</template>

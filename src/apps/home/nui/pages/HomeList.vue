<script setup lang="ts">
import { onMounted, onUnmounted, markRaw } from 'vue';
import { useRouter } from 'vue-router';
import { useHomeStore } from '../store/app-store';
import { useWidgetManagerStore } from '@core/nui/store/widgetManager';
import WidgetGrid from '@core/nui/components/WidgetGrid.vue';
import { Home as HomeIcon } from 'lucide-vue-next';

const homeStore = useHomeStore();
const widgetManager = useWidgetManagerStore();
const router = useRouter();

const registerHomeWidgets = () => {
  homeStore.homes.forEach(home => {
    widgetManager.register({
      id: `home-${home.id}`,
      appId: 'home',
      size: 'list',
      icon: markRaw(HomeIcon),
      iconBgColor: 'bg-cyan-400/80',
      title: home.name,
      subtitle: home.number,
      action: () => router.push(`/app/home/${home.id}`),
    });
  });
};

onMounted(() => {
  registerHomeWidgets();
});

onUnmounted(() => {
  // Clean up widgets when leaving the app to prevent duplicates
  widgetManager.unregisterAllByAppId('home');
});
</script>

<template>
  <div class="h-full w-full text-white overflow-y-auto no-scrollbar relative font-sans">
    <!-- Background -->
    <div 
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/src/core/nui/assets/images/backgrounds/w8.png');"
    ></div>
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col pt-20 pb-8 px-6 space-y-6">
      <!-- Header -->
      <div class="flex items-center space-x-3">
        <HomeIcon class="w-8 h-8" />
        <h1 class="text-3xl font-bold">My Homes</h1>
      </div>

      <!-- Widget Grid -->
      <WidgetGrid appId="home" />
    </div>
  </div>
</template>

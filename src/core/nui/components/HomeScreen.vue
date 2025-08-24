<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppsStore } from '@core/nui/store/apps'

const router = useRouter()
const appsStore = useAppsStore()

const handleAppClick = (app: any) => {
  if (app.route) {
    router.push(app.route)
  } else {
    console.log(`App ${app.name} clicado (sem rota definida)`)
  }
}

onMounted(async () => {
  if (!appsStore.isLoaded) {
    await appsStore.loadAppsConfig()
  }
})
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Wallpaper Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800"></div>
    
    <!-- Loading State -->
    <div v-if="!appsStore.isLoaded" class="relative z-10 flex-1 flex items-center justify-center">
      <div class="text-white text-lg">Carregando apps...</div>
    </div>

    <!-- Apps Grid -->
    <div v-else class="relative z-10 flex-1 p-6 pt-16">
      <div class="grid grid-cols-4 gap-6">
        <div 
          v-for="app in appsStore.mainApps" 
          :key="app.id"
          @click="handleAppClick(app)"
          class="app-icon flex flex-col items-center cursor-pointer"
        >
          <div 
            class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg relative"
            :class="app.color"
          >
            {{ app.icon }}
            <!-- Badge -->
            <div 
              v-if="app.badge" 
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
            >
              {{ app.badge }}
            </div>
          </div>
          <span class="text-white text-xs mt-1 text-center leading-tight">{{ app.name }}</span>
        </div>
      </div>
    </div>

    <!-- Page Indicator -->
    <div class="flex justify-center space-x-2 pb-6">
      <div class="w-2 h-2 bg-white rounded-full"></div>
      <div class="w-2 h-2 bg-white bg-opacity-30 rounded-full"></div>
    </div>

    <!-- Dock -->
    <div class="bg-white bg-opacity-10 backdrop-blur-lg mx-4 mb-8 rounded-3xl p-4">
      <div class="grid grid-cols-4 gap-4">
        <div 
          v-for="app in appsStore.dockApps" 
          :key="app.id"
          @click="handleAppClick(app)"
          class="app-icon flex flex-col items-center cursor-pointer"
        >
          <div 
            class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg relative"
            :class="app.color"
          >
            {{ app.icon }}
            <!-- Badge -->
            <div 
              v-if="app.badge" 
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
            >
              {{ app.badge }}
            </div>
          </div>
          <span class="text-white text-xs mt-1 text-center leading-tight">{{ app.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

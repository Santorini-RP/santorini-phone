<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from '../store/app-store'
import { useSystemStore } from '@core/nui/store/system'
import PageLayout from '@core/nui/components/PageLayout.vue'
import CustomSlider from '@core/nui/components/CustomSlider.vue'
import SettingsGroup from '../components/SettingsGroup.vue'
import { Sun, Moon, Check } from 'lucide-vue-next'

const settingsStore = useSettingsStore()
const systemStore = useSystemStore()

const automaticThemeSetting = computed(() => ([
  {
    id: 'automatic',
    icon: 'dummy', // Not used, but required by type
    color: 'dummy',
    title: 'Automatic',
    type: 'toggle' as const,
    action: settingsStore.toggleAutomaticTheme,
    stateKey: 'automaticTheme'
  }
]))
</script>

<template>
  <PageLayout page-title="Display & Brightness" previous-title="Settings">
    <div class="p-4 space-y-6">
      <!-- Appearance Section -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-4 mb-2">Appearance</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-lg p-4 mx-2">
          <div class="flex justify-around items-start space-x-4">
            <!-- Light Mode -->
            <div @click="settingsStore.setTheme('light')" class="text-center cursor-pointer flex-1 space-y-2">
              <div 
                class="w-full aspect-[9/19.5] rounded-lg border-2 transition-colors flex items-center justify-center p-0.5" 
                :class="settingsStore.theme === 'light' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-700'"
              >
                <div class="h-full w-full rounded-md bg-gray-100 p-2 flex flex-col justify-center items-center space-y-1">
                  <div class="text-xs text-black/80">11:42</div>
                  <div class="w-[80%] h-4 bg-white/80 backdrop-blur-sm rounded-md"></div>
                  <div class="w-[80%] h-4 bg-white/80 backdrop-blur-sm rounded-md"></div>
                </div>
              </div>
              <p class="text-sm">Light</p>
              <div class="w-6 h-6 rounded-full border-2 mx-auto flex items-center justify-center transition-colors" :class="settingsStore.theme === 'light' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'">
                <Check v-if="settingsStore.theme === 'light'" class="w-4 h-4 text-white" />
              </div>
            </div>
            <!-- Dark Mode -->
            <div @click="settingsStore.setTheme('dark')" class="text-center cursor-pointer flex-1 space-y-2">
              <div 
                class="w-full aspect-[9/19.5] rounded-lg border-2 transition-colors flex items-center justify-center p-0.5" 
                :class="settingsStore.theme === 'dark' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-700'"
              >
                <div class="h-full w-full rounded-md bg-black p-2 flex flex-col justify-center items-center space-y-1">
                  <div class="text-xs text-white/80">11:42</div>
                  <div class="w-[80%] h-4 bg-gray-800/80 backdrop-blur-sm rounded-md"></div>
                  <div class="w-[80%] h-4 bg-gray-800/80 backdrop-blur-sm rounded-md"></div>
                </div>
              </div>
              <p class="text-sm">Dark</p>
              <div class="w-6 h-6 rounded-full border-2 mx-auto flex items-center justify-center transition-colors" :class="settingsStore.theme === 'dark' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'">
                <Check v-if="settingsStore.theme === 'dark'" class="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
        <SettingsGroup :group="automaticThemeSetting" class="mt-4" />
      </div>

      <!-- Brightness Section -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-4 mb-2">Brightness</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-lg p-3 flex items-center mx-2">
          <CustomSlider v-model="systemStore.brightness" :min="20" :max="100">
            <template #start>
              <Moon class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </template>
            <template #end>
              <Sun class="w-6 h-6 text-gray-400 dark:text-gray-500" />
            </template>
          </CustomSlider>
        </div>
      </div>
      
      <!-- Phone Scale Section -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-4 mb-2">Phone Scale</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-lg p-3 flex items-center mx-2">
          <CustomSlider v-model="settingsStore.phoneScale" :min="50" :max="150">
            <template #start>
              <span class="text-lg font-normal text-gray-400 dark:text-gray-500">A</span>
            </template>
            <template #end>
              <span class="text-2xl font-normal text-gray-400 dark:text-gray-500">A</span>
            </template>
          </CustomSlider>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

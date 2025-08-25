<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSystemStore } from '@core/nui/store/system';
import PageLayout from '@core/nui/components/PageLayout.vue';
import CustomSlider from '@core/nui/components/CustomSlider.vue';
import { Volume1, Volume2, ChevronRight } from 'lucide-vue-next';

const systemStore = useSystemStore();
const router = useRouter();
</script>

<template>
  <PageLayout page-title="Sound & Haptics" previous-title="Settings">
    <div class="p-4 space-y-6">
      <!-- Ringtone and Alert Volume -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-4 mb-2">Ringtone and Alert Volume</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-lg p-3 flex items-center mx-2">
          <CustomSlider v-model="systemStore.ringtoneVolume">
            <template #start>
              <Volume1 class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </template>
            <template #end>
              <Volume2 class="w-6 h-6 text-gray-400 dark:text-gray-500" />
            </template>
          </CustomSlider>
        </div>
      </div>

      <!-- Call Volume -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-4 mb-2">Call Volume</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-lg p-3 flex items-center mx-2">
          <CustomSlider v-model="systemStore.callVolume">
            <template #start>
              <Volume1 class="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </template>
            <template #end>
              <Volume2 class="w-6 h-6 text-gray-400 dark:text-gray-500" />
            </template>
          </CustomSlider>
        </div>
      </div>

      <!-- Sound and Haptics Patterns -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-4 mb-2">Sound and Haptics Patterns</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
          <!-- Ringtone -->
          <div
            @click="router.push('/app/settings/sound/ringtone')"
            class="flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-200 dark:border-gray-700/60"
          >
            <p class="flex-1 text-black dark:text-white">Ringtone</p>
            <div class="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <span>{{ systemStore.ringtone }}</span>
              <ChevronRight class="w-5 h-5" />
            </div>
          </div>
          <!-- Text Tone -->
          <div
            @click="router.push('/app/settings/sound/text-tone')"
            class="flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <p class="flex-1 text-black dark:text-white">Text Tone</p>
            <div class="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <span>{{ systemStore.textTone }}</span>
              <ChevronRight class="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

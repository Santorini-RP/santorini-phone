<script setup lang="ts">
import { useSystemStore } from '@core/nui/store/system';
import { audioService } from '@core/nui/services/audioService';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { Check } from 'lucide-vue-next';

const systemStore = useSystemStore();

const selectRingtone = (ringtone: string) => {
  // Set the new ringtone in the store
  systemStore.setRingtone(ringtone);

  // Construct the path to the audio file
  // IMPORTANT: The actual .mp3 files must be placed in the /public/sounds/ringtones/ directory
  const audioPath = `/sounds/ringtones/${ringtone.toLowerCase()}.mp3`;

  // Play the preview
  audioService.playTonePreview(audioPath);
};
</script>

<template>
  <PageLayout page-title="Ringtone" previous-title="Sound & Haptics">
    <div class="p-4 space-y-6">
      <!-- Ringtone List -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-4 mb-2">Ringtone</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
          <div
            v-for="(ringtone, index) in systemStore.availableRingtones"
            :key="ringtone"
            @click="selectRingtone(ringtone)"
            class="flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            :class="{ 'border-b border-gray-200 dark:border-gray-700/60': index < systemStore.availableRingtones.length - 1 }"
          >
            <div class="w-6">
              <Check v-if="systemStore.ringtone === ringtone" class="w-5 h-5 text-blue-500" />
            </div>
            <p class="text-black dark:text-white">{{ ringtone }}</p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

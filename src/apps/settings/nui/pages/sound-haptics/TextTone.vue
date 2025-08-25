<script setup lang="ts">
import { useSystemStore } from '@core/nui/store/system';
import { audioService } from '@core/nui/services/audioService';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { Check } from 'lucide-vue-next';

const systemStore = useSystemStore();

const selectTextTone = (textTone: string) => {
  // Set the new text tone in the store
  systemStore.setTextTone(textTone);

  // Construct the path to the audio file
  // IMPORTANT: The actual .mp3 files must be placed in the /public/sounds/text-tones/ directory
  const audioPath = `/sounds/text-tones/${textTone.toLowerCase()}.mp3`;

  // Play the preview (usually shorter for text tones)
  audioService.playTonePreview(audioPath, 2000); // 2-second preview
};
</script>

<template>
  <PageLayout page-title="Text Tone" previous-title="Sound & Haptics">
    <div class="p-4 space-y-6">
      <!-- Text Tone List -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-4 mb-2">Text Tone</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
          <div
            v-for="(textTone, index) in systemStore.availableTextTones"
            :key="textTone"
            @click="selectTextTone(textTone)"
            class="flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            :class="{ 'border-b border-gray-200 dark:border-gray-700/60': index < systemStore.availableTextTones.length - 1 }"
          >
            <div class="w-6">
              <Check v-if="systemStore.textTone === textTone" class="w-5 h-5 text-blue-500" />
            </div>
            <p class="text-black dark:text-white">{{ textTone }}</p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

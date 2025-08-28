<script setup lang="ts">
import { ref, watch } from 'vue';
import type { VoiceMemo } from '../store/app-store';
import { useVoicememoStore } from '../store/app-store';
import { Upload, Rewind, Play, Pause, FastForward, Trash2 } from 'lucide-vue-next';
import CustomSlider from '@core/nui/components/CustomSlider.vue';

const props = defineProps<{
  memo: VoiceMemo;
  isSelected: boolean;
  isLast: boolean;
}>();

const emit = defineEmits(['select', 'delete']);
const store = useVoicememoStore();

const editableTitle = ref(props.memo.title);

watch(() => props.memo.title, (newTitle) => {
  editableTitle.value = newTitle;
});

const saveTitle = () => {
  if (editableTitle.value.trim() !== props.memo.title) {
    store.updateMemoTitle(props.memo.id, editableTitle.value);
  }
};
</script>

<template>
  <div 
    @click="!isSelected && $emit('select')"
    class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
  >
    <div class="px-4 py-3">
      <div class="flex justify-between items-center">
        <h3 v-if="!isSelected" class="font-medium text-base text-black dark:text-white truncate">{{ memo.title }}</h3>
        <input 
          v-else
          v-model="editableTitle"
          @blur="saveTitle"
          @keyup.enter="($event.target as HTMLInputElement).blur()"
          @click.stop
          class="font-medium text-base text-black dark:text-white bg-transparent outline-none border-b border-dotted border-red-400 w-full"
        />
        <span v-if="!isSelected" class="text-sm text-gray-500 dark:text-gray-400 ml-4 flex-shrink-0">{{ memo.duration }}</span>
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{ memo.time }}</p>

      <div v-if="isSelected" class="mt-4 space-y-3 animate-fade-in">
        <!-- Playback Slider -->
        <div class="flex items-center space-x-2">
          <span class="text-xs text-gray-500 dark:text-gray-400">0:00</span>
          <CustomSlider v-model="store.playbackProgress" :min="0" :max="100" />
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ memo.duration }}</span>
        </div>
        <!-- Controls -->
        <div class="flex justify-between items-center">
          <button class="text-blue-500 p-2"><Upload class="w-5 h-5" /></button>
          <div class="flex items-center space-x-6">
            <button class="text-black dark:text-white p-2"><Rewind class="w-6 h-6" fill="currentColor" /></button>
            <button @click.stop="store.togglePlayback()" class="text-black dark:text-white p-2">
              <Pause v-if="store.isPlaying" class="w-8 h-8" fill="currentColor" />
              <Play v-else class="w-8 h-8" fill="currentColor" />
            </button>
            <button class="text-black dark:text-white p-2"><FastForward class="w-6 h-6" fill="currentColor" /></button>
          </div>
          <button @click.stop="$emit('delete')" class="text-blue-500 p-2"><Trash2 class="w-5 h-5" /></button>
        </div>
      </div>
    </div>
    <div v-if="!isLast" class="border-b border-gray-200 dark:border-gray-700/60 ml-4"></div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

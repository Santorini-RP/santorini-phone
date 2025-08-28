<script setup lang="ts">
import { useVoicememoStore } from './store/app-store';
import PageLayout from '@core/nui/components/PageLayout.vue';
import SearchInput from '@core/nui/components/SearchInput.vue';
import VoiceMemoItem from './components/VoiceMemoItem.vue';

const store = useVoicememoStore();
</script>

<template>
  <div class="h-full w-full bg-gray-100 dark:bg-ios-dark-bg flex flex-col font-sans">
    <PageLayout page-title="Voice Recordings">
      <div class="px-4 -mt-2">
        <SearchInput v-model="store.searchQuery" placeholder="Search recordings" />
      </div>

      <div class="mt-4 mx-2">
        <div class="bg-white dark:bg-ios-dark-card rounded-xl overflow-hidden">
          <VoiceMemoItem 
            v-for="(memo, index) in store.filteredMemos"
            :key="memo.id"
            :memo="memo"
            :is-selected="store.selectedMemoId === memo.id"
            :is-last="index === store.filteredMemos.length - 1"
            @select="store.selectMemo(memo.id)"
            @delete="store.deleteMemo(memo.id)"
          />
          <div v-if="store.filteredMemos.length === 0" class="p-4 text-center text-gray-500">
            No recordings found.
          </div>
        </div>
      </div>
    </PageLayout>

    <footer class="sticky bottom-0 z-10 bg-gray-100/80 dark:bg-ios-dark-bg/80 backdrop-blur-md flex flex-col justify-center items-center h-28">
      <!-- Timer Display -->
      <div class="h-6 mb-2">
        <span v-if="store.isRecording" class="text-lg text-gray-500 dark:text-gray-400 font-mono animate-fade-in">
          {{ store.formattedElapsedTime }}
        </span>
      </div>
      
      <!-- Record Button -->
      <button @click="store.toggleRecording" class="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center shadow-md active:scale-95 transition-transform">
        <div 
          class="bg-red-500 transition-all duration-300 ease-in-out"
          :class="{
            'w-14 h-14 rounded-full': !store.isRecording,
            'w-8 h-8 rounded-md': store.isRecording
          }"
        ></div>
      </button>
    </footer>
  </div>
</template>

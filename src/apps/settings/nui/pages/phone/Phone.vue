<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSystemStore } from '@core/nui/store/system';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { ChevronRight, Copy } from 'lucide-vue-next';
import { useClipboard } from '@vueuse/core';

const systemStore = useSystemStore();
const router = useRouter();
const { copy } = useClipboard({ source: systemStore.myNumber });

const handleCopy = () => {
  copy(systemStore.myNumber);
  alert('Phone number copied!');
};
</script>

<template>
  <PageLayout page-title="Phone" previous-title="Settings">
    <div class="p-4 space-y-6">
      <!-- My Number Section -->
      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
        <div class="flex items-center justify-between p-3">
          <span class="text-black dark:text-white">My Number</span>
          <div class="flex items-center space-x-2">
            <span class="text-gray-500 dark:text-gray-400">{{ systemStore.myNumber }}</span>
            <button @click="handleCopy" class="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <Copy class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Settings Section -->
      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
        <!-- Show Caller ID -->
        <div class="p-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700/60">
          <span class="font-medium text-black dark:text-white">Show Caller ID</span>
          <button
            @click="systemStore.toggleShowCallerId()"
            class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5"
            :class="systemStore.showCallerId ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'"
          >
            <span
              class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
              :class="{ 'translate-x-5': systemStore.showCallerId }"
            ></span>
          </button>
        </div>
        <!-- Blocked Contacts -->
        <div
          @click="router.push('/app/settings/phone/blocked-contacts')"
          class="flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <p class="flex-1 text-black dark:text-white">Blocked Contacts</p>
          <ChevronRight class="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  </PageLayout>
</template>

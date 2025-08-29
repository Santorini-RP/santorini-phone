<script setup lang="ts">
import { ref } from 'vue';
import { useServicesStore } from '../store/app-store';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { ChevronRight, User } from 'lucide-vue-next';

const servicesStore = useServicesStore();
const activeTab = ref('Personal');
</script>

<template>
  <PageLayout page-title="Messages">
    <div class="px-4 -mt-2 space-y-4">
      <!-- Tabs -->
      <div class="flex justify-center">
        <div class="flex space-x-1 bg-gray-200 dark:bg-ios-dark-card p-1 rounded-lg">
          <button 
            @click="activeTab = 'Personal'"
            class="px-6 py-1 text-sm font-semibold rounded-md transition-colors"
            :class="activeTab === 'Personal' ? 'bg-white dark:bg-gray-500 text-black dark:text-white shadow' : 'text-gray-600 dark:text-gray-400'"
          >
            Personal
          </button>
          <button 
            @click="activeTab = 'Job'"
            class="px-6 py-1 text-sm font-semibold rounded-md transition-colors"
            :class="activeTab === 'Job' ? 'bg-white dark:bg-gray-500 text-black dark:text-white shadow' : 'text-gray-600 dark:text-gray-400'"
          >
            Job
          </button>
        </div>
      </div>

      <!-- Personal Message List -->
      <div v-if="activeTab === 'Personal'" class="bg-white dark:bg-ios-dark-card rounded-xl">
        <div 
          v-for="message in servicesStore.messages" 
          :key="message.id"
          class="flex items-center p-3 space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
        >
          <div 
            class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            :class="message.iconBgColor"
          >
            <component :is="message.icon" class="w-7 h-7 text-white" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-center">
              <p class="font-semibold text-black dark:text-white">{{ message.sender }}</p>
              <div class="flex items-center text-sm text-gray-400">
                <span>{{ message.time }}</span>
                <ChevronRight class="w-4 h-4 ml-1" />
              </div>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 truncate">{{ message.preview }}</p>
          </div>
        </div>
      </div>

      <!-- Job Message List -->
      <div v-if="activeTab === 'Job'" class="bg-white dark:bg-ios-dark-card rounded-xl">
        <div 
          v-for="(message, index) in servicesStore.jobMessages" 
          :key="message.id"
          class="flex items-center p-3 space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
          :class="{ 'border-b border-gray-200 dark:border-gray-700/60': index < servicesStore.jobMessages.length - 1 }"
        >
          <div class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
            <User class="w-7 h-7 text-gray-500 dark:text-gray-400" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-center">
              <p class="font-semibold text-black dark:text-white">{{ message.sender }}</p>
              <div class="flex items-center text-sm text-gray-400">
                <span>{{ message.time }}</span>
                <ChevronRight class="w-4 h-4 ml-1" />
              </div>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 truncate">{{ message.preview }}</p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

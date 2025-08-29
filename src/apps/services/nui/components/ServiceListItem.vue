<script setup lang="ts">
import { computed } from 'vue';
import type { Service } from '../store/app-store';
import { useCallStore } from '@core/nui/store/callStore';
import { Building2, Send, Phone, MessageSquare } from 'lucide-vue-next';

const props = defineProps<{
  service: Service;
}>();

const callStore = useCallStore();

const handleAction = (action: string, serviceName: string) => {
  if (action === 'Call' && props.service.isOpen) {
    callStore.startCall({
      contactName: serviceName,
      contactLabel: 'Mobile',
      callType: 'voice'
    });
  } else if (action !== 'Call') {
    alert(`${action} button clicked for ${serviceName}`);
  }
};

const cardClasses = computed(() => {
  if (props.service.isOpen) {
    return 'bg-ios-light-open dark:bg-ios-dark-card';
  } else {
    return 'bg-ios-light-closed dark:bg-ios-dark-input';
  }
});
</script>

<template>
  <div class="relative group rounded-xl shadow-sm overflow-hidden">
    <!-- Main Content Card -->
    <div 
      class="p-4 flex items-center space-x-4 transition-colors duration-200"
      :class="cardClasses"
    >
      <!-- Left side: Icon and Text -->
      <div 
        class="flex items-center space-x-4 flex-1 min-w-0 transition-opacity duration-200"
        :class="{ 'group-hover:opacity-20': !service.isOpen }"
      >
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          :class="service.iconBgColor"
        >
          <component :is="service.icon" class="w-7 h-7 text-white" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-base text-black dark:text-white truncate">{{ service.name }}</p>
          <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Building2 class="w-3.5 h-3.5 mr-1.5" />
            <span class="truncate">{{ service.location }}</span>
          </div>
        </div>
      </div>
      
      <!-- Right side: Action Buttons -->
      <div class="flex items-center space-x-2">
        <button
          v-if="service.actions.send"
          @click.stop="handleAction('Send', service.name)"
          class="w-8 h-8 rounded-lg bg-orange-400 text-white flex items-center justify-center hover:bg-orange-500 transition-colors"
        >
          <Send class="w-4 h-4" />
        </button>
        <button
          v-if="service.actions.call && service.isOpen"
          @click.stop="handleAction('Call', service.name)"
          class="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
        >
          <Phone class="w-4 h-4" />
        </button>
        <button
          v-if="service.actions.message"
          @click.stop="handleAction('Message', service.name)"
          class="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
        >
          <MessageSquare class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Closed Overlay on Hover -->
    <div 
      v-if="!service.isOpen"
      class="absolute inset-0 bg-red-500/70 flex items-center justify-center text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
    >
      Closed
    </div>
  </div>
</template>

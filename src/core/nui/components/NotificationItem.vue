<script setup lang="ts">
import type { Notification } from '@core/nui/store/notifications'

defineProps<{
  notification: Notification
}>()
</script>

<template>
  <div class="w-full max-w-sm mx-auto bg-black/25 backdrop-blur-xl rounded-2xl p-3 text-white shadow-lg border border-white/10">
    <!-- Header -->
    <div class="flex items-center text-xs mb-2">
      <div class="w-5 h-5 rounded-md flex items-center justify-center mr-2" :class="notification.iconBgColor">
        <component :is="notification.appIcon" class="w-3.5 h-3.5 text-white" />
      </div>
      <span class="font-semibold">{{ notification.title }}</span>
      <span class="ml-auto opacity-70">{{ notification.time }}</span>
    </div>
    
    <!-- Body -->
    <p class="text-sm opacity-90 ml-7">{{ notification.body }}</p>
    
    <!-- Actions -->
    <div v-if="notification.actions && notification.actions.length > 0" class="flex gap-2 mt-3 ml-7">
      <button 
        v-for="action in notification.actions" 
        :key="action.label"
        @click.stop="action.action"
        class="flex-1 bg-white/20 hover:bg-white/30 text-white text-sm py-1.5 rounded-lg transition-colors"
      >
        {{ action.label }}
      </button>
    </div>
  </div>
</template>

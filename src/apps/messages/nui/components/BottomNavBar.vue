<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CircleDot, Phone, Users, MessageSquare, Settings } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const tabs = computed(() => [
  { name: 'Updates', icon: CircleDot, path: '/app/messages/updates', active: route.name === 'messages-updates' },
  { name: 'Calls', icon: Phone, path: '/app/messages/calls', active: route.name === 'messages-calls' },
  { name: 'Communities', icon: Users, path: '/app/messages/communities', active: route.name === 'messages-communities' },
  { name: 'Chats', icon: MessageSquare, path: '/app/messages', active: route.name === 'messages-list', hasBadge: true, badgeCount: 1 },
  { name: 'Settings', icon: Settings, path: '/app/messages/settings', active: route.name === 'messages-settings' },
]);

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="w-full bg-[#F4F4F4cc] mb-6 backdrop-blur-lg border-t border-[#0A0A0A08]">
    <div class="flex justify-around items-center pt-1.5 pb-1">
      <button v-for="tab in tabs" :key="tab.name" @click="navigateTo(tab.path)" class="flex flex-col items-center justify-center space-y-0.5 w-16 h-12 relative">
        <component
          :is="tab.icon"
          class="w-6 h-6 transition-colors"
          :class="tab.active ? 'text-[#0A0A0A]' : 'text-[#767779]'"
          :fill="tab.active && (tab.name === 'Chats' || tab.name === 'Settings') ? '#0A0A0A' : 'none'"
        />
        <span
          class="text-[10px] font-medium transition-colors"
          :class="tab.active ? 'text-[#0A0A0A]' : 'text-[#767779]'"
        >
          {{ tab.name }}
        </span>
        <div
          v-if="tab.hasBadge"
          class="absolute top-0 right-3 bg-[#1DAB61] text-white text-[12px] font-normal rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center"
        >
          {{ tab.badgeCount }}
        </div>
      </button>
    </div>
  </div>
</template>

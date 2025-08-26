<script setup lang="ts">
import { ref } from 'vue';
import { CircleDot, Phone, Users, MessageSquare, Settings } from 'lucide-vue-next';

const tabs = ref([
  { name: 'Updates', icon: CircleDot, active: false, hasBadge: false, badgeCount: 0 },
  { name: 'Calls', icon: Phone, active: false, hasBadge: false, badgeCount: 0 },
  { name: 'Communities', icon: Users, active: false, hasBadge: false, badgeCount: 0 },
  { name: 'Chats', icon: MessageSquare, active: true, hasBadge: true, badgeCount: 1 },
  { name: 'Settings', icon: Settings, active: false, hasBadge: false, badgeCount: 0 },
]);
</script>

<template>
  <div class="w-full bg-[#F4F4F4cc] backdrop-blur-lg border-t border-[#0A0A0A08]">
    <div class="flex justify-around items-center pt-1.5 pb-1">
      <button v-for="tab in tabs" :key="tab.name" class="flex flex-col items-center justify-center space-y-0.5 w-16 h-12 relative">
        <component
          :is="tab.icon"
          class="w-6 h-6 transition-colors"
          :class="tab.active ? 'text-[#0A0A0A]' : 'text-[#767779]'"
          :fill="tab.active && tab.name === 'Chats' ? '#0A0A0A' : 'none'"
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
    <div class="flex justify-center pb-2">
      <div class="w-[140px] h-[5px] bg-[#0A0A0A] rounded-full"></div>
    </div>
  </div>
</template>

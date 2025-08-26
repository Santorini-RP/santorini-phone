<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Contact, GroupInfo } from '../store/chatStore';
import { ChevronLeft, Video, Phone, Users } from 'lucide-vue-next';

const props = defineProps<{
  contact: Contact | null,
  groupInfo: GroupInfo | null
}>();

const router = useRouter();
const goBack = () => router.back();

const goToContactInfo = () => {
  if (props.contact) {
    router.push(`/app/messages/${props.contact.id}/info`);
  }
  // Could add group info navigation later
};
</script>

<template>
  <header class="sticky top-0 z-20 bg-[#F5F2EBcc] backdrop-blur-lg border-b border-[#0000001a] pt-10 pb-2">
    <div class="flex items-center justify-between px-2">
      <!-- Back and Contact/Group Info -->
      <div class="flex items-center">
        <button @click="goBack" class="flex items-center text-[#0A0A0A]">
          <ChevronLeft class="w-8 h-8" />
          <span class="text-lg -ml-1.5">1</span>
        </button>
        
        <!-- One-on-One Chat Info -->
        <div v-if="contact" @click="goToContactInfo" class="flex items-center ml-2 cursor-pointer">
          <img :src="contact.avatarUrl" :alt="contact.name" class="w-9 h-9 rounded-full object-cover" />
          <div class="ml-2">
            <p class="font-semibold text-base text-[#0A0A0A] leading-tight">{{ contact.name }}</p>
            <p class="text-xs text-[#767779] leading-tight">{{ contact.status }}</p>
          </div>
        </div>

        <!-- Group Chat Info -->
        <div v-if="groupInfo" class="flex items-center ml-2">
          <div class="w-9 h-9 rounded-full bg-[#B1B5C0] flex items-center justify-center">
            <Users class="w-5 h-5 text-white" />
          </div>
          <div class="ml-2">
            <p class="font-semibold text-base text-[#0A0A0A] leading-tight">{{ groupInfo.name }}</p>
            <p class="text-xs text-[#767779] leading-tight truncate max-w-[150px]">{{ groupInfo.participants }}</p>
          </div>
        </div>
      </div>
      
      <!-- Action Icons -->
      <div class="flex items-center space-x-5 pr-2">
        <Video class="w-6 h-6 text-[#0A0A0A]" />
        <Phone class="w-5 h-5 text-[#0A0A0A]" />
      </div>
    </div>
  </header>
</template>

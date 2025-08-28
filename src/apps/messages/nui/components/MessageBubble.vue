<script setup lang="ts">
import { computed } from 'vue';
import type { Message } from '../store/chatStore';
import { Check, CheckCheck, Play, MapPin } from 'lucide-vue-next';

const props = defineProps<{
  message: Message;
  isGroupChat: boolean;
  showAvatar: boolean;
  showName: boolean;
  showTail: boolean;
}>();

const isMe = computed(() => props.message.senderId === 'me');

const bubbleClass = computed(() => {
  const classes = ['rounded-xl', 'shadow-sm', 'relative'];
  if (props.message.type !== 'location' && props.message.type !== 'media' && props.message.type !== 'voice') {
    classes.push('px-3', 'py-1.5');
  }
  if (isMe.value) {
    classes.push('bg-[#D0FECF]');
    if (props.showTail) classes.push('rounded-br-sm');
  } else {
    classes.push('bg-white');
    if (props.showTail) classes.push('rounded-bl-sm');
  }
  return classes;
});

const statusIcon = computed(() => {
  if (!isMe.value) return null;
  if (props.message.status === 'read') return CheckCheck;
  if (props.message.status === 'delivered') return CheckCheck;
  if (props.message.status === 'sent') return Check;
  return null;
});

const statusIconColor = computed(() => {
  if (props.message.status === 'read') return 'text-[#007BFC]';
  return 'text-black/50';
});
</script>

<template>
  <div
    class="w-full flex items-end gap-2"
    :class="[
      isMe ? 'justify-end' : 'justify-start'
    ]"
  >
    <!-- Avatar (for received messages in group chats) -->
    <div v-if="!isMe && isGroupChat" class="w-7 h-7 flex-shrink-0 self-end">
      <img
        v-if="showAvatar && message.senderAvatarUrl"
        :src="message.senderAvatarUrl"
        alt=""
        class="w-full h-full rounded-full object-cover"
      />
    </div>

    <!-- Bubble and meta content -->
    <div class="flex flex-col max-w-[85%]" :class="isMe ? 'items-end' : 'items-start'">
      <!-- Sender Name (for received group messages) -->
      <p v-if="!isMe && isGroupChat && showName" class="text-sm font-semibold mb-0.5 ml-3" :style="{ color: message.senderColor }">
        {{ message.senderName }}
      </p>

      <!-- The actual bubble -->
      <div class="relative" :class="{'mb-4': message.reaction}">
        <div :class="bubbleClass">
          <!-- Bubble Tail -->
          <div v-if="showTail && message.type !== 'location' && message.type !== 'media'" class="absolute -bottom-px" :class="isMe ? '-right-2' : '-left-2'">
            <svg width="9" height="11" viewBox="0 0 9 11" class="transform" :class="isMe ? '' : 'scale-x-[-1]'">
              <path d="M0 11C4.97056 11 9 6.97056 9 2V0L0 11Z" :class="isMe ? 'fill-[#D0FECF]' : 'fill-white'"/>
            </svg>
          </div>
          
          <!-- Quoted Message -->
          <div v-if="message.quote" class="bg-[#0A0A0A0A] border-l-2 pl-2 py-1 pr-4 rounded-md mb-1" :style="{ borderColor: message.quote.color }">
            <p class="font-semibold text-sm" :style="{ color: message.quote.color }">{{ message.quote.sender }}</p>
            <p class="text-sm text-black/70">{{ message.quote.text }}</p>
          </div>
          
          <!-- Text Content -->
          <div v-if="message.type === 'text'" class="flex justify-end items-end flex-wrap min-w-[80px]">
            <p class="text-[#0A0A0A] text-base whitespace-pre-wrap break-words mr-2 text-left flex-grow">{{ message.content }}</p>
            <div class="flex-shrink-0 self-end ml-auto h-4">
              <div class="flex items-center gap-1.5">
                <span class="text-[11px] text-black/50">{{ message.timestamp }}</span>
                <component v-if="statusIcon" :is="statusIcon" :class="statusIconColor" class="w-4 h-4" />
              </div>
            </div>
          </div>

          <!-- Voice Message -->
          <div v-else-if="message.type === 'voice'" class="flex items-center gap-2 w-[200px] p-1.5">
            <button>
              <Play class="w-7 h-7 flex-shrink-0" :class="isMe ? 'text-gray-700' : 'text-gray-700'" fill="currentColor"/>
            </button>
            <div class="flex-1 flex items-center gap-1">
              <div class="h-1 flex-1 rounded-full" :class="isMe ? 'bg-green-300' : 'bg-gray-300'">
                <div class="w-[70%] h-full rounded-full" :class="isMe ? 'bg-green-500' : 'bg-gray-500'"></div>
              </div>
              <div class="w-3 h-3 bg-white rounded-full shadow-md"></div>
            </div>
            <span class="text-sm text-gray-600 w-12 text-right">{{ message.content }}</span>
          </div>

          <!-- Location Message -->
          <div v-else-if="message.type === 'location'" class="w-60 h-36 rounded-xl overflow-hidden relative">
            <img :src="message.mediaUrl" class="w-full h-full object-cover" alt="Location Map" />
            <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
              <MapPin class="w-8 h-8 text-white drop-shadow-lg" />
            </div>
          </div>

          <!-- Media Message -->
          <div v-else-if="message.type === 'media'" class="w-60 rounded-xl overflow-hidden">
            <img :src="message.mediaUrl" class="w-full h-auto" alt="Media content" />
          </div>
        </div>

        <!-- Reaction -->
        <div v-if="message.reaction"
            class="absolute -bottom-3 flex items-center space-x-1 bg-white shadow-md rounded-full px-2 py-0.5 border border-gray-200 z-10"
            :class="isMe ? 'right-2' : 'left-2'">
            <span class="text-sm">{{ message.reaction.emoji }}</span>
            <span v-if="message.reaction.count > 1" class="text-xs text-gray-600 font-medium">{{ message.reaction.count }}</span>
        </div>
      </div>
      
      <!-- Timestamp for non-text messages (sent by me) -->
      <div v-if="message.type !== 'text' && isMe" class="flex items-center gap-1.5 mt-0.5 pr-1 self-end">
        <span class="text-[11px] text-black/50">{{ message.timestamp }}</span>
        <component v-if="statusIcon" :is="statusIcon" :class="statusIconColor" class="w-4 h-4" />
      </div>
    </div>
  </div>
</template>

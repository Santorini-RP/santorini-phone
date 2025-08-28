<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Chat } from '../store/messagesStore';
import SwipeAction from './SwipeAction.vue';
import { useActionSheetStore } from '@core/nui/store/actionSheet';
import { 
  Star, Check, CheckCheck, MapPin, BarChart2, Users, CircleSlash, Archive, MoreHorizontal, BellOff, Pin, Info, Trash2, XCircle, CheckSquare 
} from 'lucide-vue-next';

const props = defineProps<{
  chat: Chat;
  isSelectionMode: boolean;
  isSelected: boolean;
}>();

const emit = defineEmits(['toggle-selection']);
const router = useRouter();
const actionSheetStore = useActionSheetStore();

const itemRef = ref<HTMLElement | null>(null);
const offset = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const startOffset = ref(0);
const wasDragged = ref(false);

const ACTION_WIDTH = 85;
const MAX_SWIPE_LEFT = -ACTION_WIDTH * 2;
const MAX_SWIPE_RIGHT = ACTION_WIDTH * 2;

const contentStyle = computed(() => ({
  transform: `translateX(${offset.value}px)`,
  transition: isDragging.value ? 'none' : 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
  cursor: !props.isSelectionMode ? (isDragging.value ? 'grabbing' : 'grab') : 'pointer',
  userSelect: 'none' as const,
  touchAction: 'pan-y'
}));

const getPointerX = (e: MouseEvent | TouchEvent) => 'touches' in e ? e.touches[0].clientX : e.clientX;

const onPointerDown = (e: MouseEvent | TouchEvent) => {
  if (props.isSelectionMode || ('button' in e && e.button !== 0)) return;

  isDragging.value = true;
  wasDragged.value = false;
  startX.value = getPointerX(e);
  startOffset.value = offset.value;

  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('touchmove', onPointerMove, { passive: false });
  window.addEventListener('mouseup', onPointerUp);
  window.addEventListener('touchend', onPointerUp);
  window.addEventListener('contextmenu', onPointerUp);
};

const onPointerMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;

  const currentX = getPointerX(e);
  const deltaX = currentX - startX.value;
  
  if (!wasDragged.value && Math.abs(deltaX) > 5) {
    wasDragged.value = true;
  }

  if (wasDragged.value) {
    e.preventDefault();
    const newOffset = startOffset.value + deltaX;
    offset.value = Math.max(MAX_SWIPE_LEFT, Math.min(MAX_SWIPE_RIGHT, newOffset));
  }
};

const onPointerUp = () => {
  if (!isDragging.value) return;
  isDragging.value = false;

  window.removeEventListener('mousemove', onPointerMove);
  window.removeEventListener('touchmove', onPointerMove);
  window.removeEventListener('mouseup', onPointerUp);
  window.removeEventListener('touchend', onPointerUp);
  window.removeEventListener('contextmenu', onPointerUp);

  if (wasDragged.value) {
    const snapThreshold = ACTION_WIDTH * 0.6;
    if (offset.value < -snapThreshold) {
      offset.value = MAX_SWIPE_LEFT;
      console.log('Swipe left');
    } else if (offset.value > snapThreshold) {
      offset.value = MAX_SWIPE_RIGHT;
      console.log('Swipe right');
    } else {
      offset.value = 0;
    }
  } else {
    handleItemClick();
  }
};

const handleItemClick = () => {
  if (offset.value !== 0) {
    offset.value = 0;
    return;
  }

  if (props.isSelectionMode) {
    emit('toggle-selection');
  } else {
    router.push(`/app/messages/${props.chat.id}`);
  }
};

const cleanupEventListeners = () => {
  window.removeEventListener('mousemove', onPointerMove);
  window.removeEventListener('mouseup', onPointerUp);
  window.removeEventListener('touchmove', onPointerMove);
  window.removeEventListener('touchend', onPointerUp);
  window.removeEventListener('contextmenu', onPointerUp);
};

onUnmounted(cleanupEventListeners);

const isGroupChat = computed(() => !props.chat.avatarUrl);
const lastMessagePreview = computed(() => props.chat.isTyping ? 'typing...' : props.chat.lastMessage);
const lastMessageColor = computed(() => props.chat.isTyping || props.chat.mention ? 'text-[#1DAB61]' : 'text-[#767779]');

const statusIcon = computed(() => {
  if (!props.chat.lastMessageByMe) return null;
  if (props.chat.status === 'read') return CheckCheck;
  if (props.chat.status === 'delivered') return CheckCheck;
  if (props.chat.status === 'sent') return Check;
  return null;
});

const statusIconColor = computed(() => props.chat.status === 'read' ? 'text-[#007BFC]' : 'text-[#767779]');

const messageTypeIcon = computed(() => {
  switch (props.chat.messageType) {
    case 'poll': return BarChart2;
    case 'location': return MapPin;
    case 'deleted': return CircleSlash;
    default: return null;
  }
});

const handleSwipeAction = async (action: string) => {
  offset.value = 0;

  if (action === 'More') {
    await actionSheetStore.show([
      [
        { id: 'info', text: 'Contact Info', icon: Info, action: () => router.push('#') },
        { id: 'select', text: 'Select Messages', icon: CheckSquare, action: () => alert('Select Messages clicked') },
        { id: 'close', text: 'Close Chat', icon: XCircle, action: () => alert('Close Chat clicked') },
        { id: 'clear', text: 'Clear Chat', style: 'destructive', icon: Archive, action: () => alert('Clear Chat clicked') },
        { id: 'delete', text: 'Delete Chat', style: 'destructive', icon: Trash2, action: () => alert('Delete Chat clicked') },
      ]
    ]);
  } else {
    alert(`${action} clicked for ${props.chat.name}`);
  }
};
</script>

<template>
  <div class="relative w-full overflow-hidden bg-white">
    <div class="absolute inset-0 flex justify-between">
      <!-- Left swipe actions (revealed by dragging right) -->
      <div class="flex">
        <div @click.stop="handleSwipeAction('Unread')">
          <SwipeAction label="Unread" :icon="BellOff" bgColor="bg-blue-500" />
        </div>
        <div @click.stop="handleSwipeAction('Pin')">
          <SwipeAction label="Pin" :icon="Pin" bgColor="bg-gray-400" />
        </div>
      </div>
      <!-- Right swipe actions (revealed by dragging left) -->
      <div class="flex ml-auto">
        <div @click.stop="handleSwipeAction('More')">
          <SwipeAction label="More" :icon="MoreHorizontal" bgColor="bg-[#959394]" />
        </div>
        <div @click.stop="handleSwipeAction('Archive')">
          <SwipeAction label="Archive" :icon="Archive" bgColor="bg-[#1C8854]" />
        </div>
      </div>
    </div>

    <!-- Conteúdo Principal (Arrastável) -->
    <div
      ref="itemRef"
      @mousedown.prevent="onPointerDown"
      @touchstart.prevent="onPointerDown"
      class="flex items-center space-x-3 py-2.5 px-4 bg-white relative z-10"
      :style="contentStyle"
    >
      <div v-if="isSelectionMode" class="w-6 h-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all"
        :class="isSelected ? 'bg-[#1DAB61] border-[#1DAB61]' : 'border-gray-300'"
        @click.stop="emit('toggle-selection')"
      >
        <Check v-if="isSelected" class="w-4 h-4 text-white" />
      </div>
      
      <div class="relative flex-shrink-0">
        <div class="relative w-14 h-14">
          <img
            v-if="!isGroupChat"
            :src="chat.avatarUrl"
            :alt="chat.name"
            class="w-full h-full rounded-full object-cover pointer-events-none"
          />
          <div v-else class="w-full h-full rounded-full bg-[#B1B5C0] flex items-center justify-center">
              <Users class="w-8 h-8 text-white" />
          </div>
          <div
            v-if="chat.hasStatusUpdate"
            class="absolute inset-0 rounded-full border-2 border-white"
            :style="{ 'box-shadow': '0 0 0 2px #1DAB61' }"
          ></div>
           <div
            v-if="chat.isDisappearing"
            class="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm"
          >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#767779" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6 3.5V6L7.25 7.25" stroke="#767779" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </div>
        </div>
      </div>

      <div class="flex-1 min-w-0 border-b border-gray-200 pb-2.5">
        <div class="flex justify-between items-start">
          <span class="font-semibold text-base text-[#0A0A0A] truncate">{{ chat.name }}</span>
          <span class="text-sm flex-shrink-0" :class="chat.unreadCount > 0 || chat.mention ? 'text-[#1DAB61]' : 'text-[#767779]'">
            {{ chat.lastMessageTime }}
          </span>
        </div>
        <div class="flex justify-between items-center mt-0.5">
          <div class="flex items-center space-x-1 text-sm truncate">
            <component v-if="statusIcon" :is="statusIcon" :class="statusIconColor" class="w-4 h-4 flex-shrink-0" />
            <component v-if="messageTypeIcon" :is="messageTypeIcon" class="w-4 h-4 text-[#767779] flex-shrink-0" />
            <span :class="lastMessageColor" class="truncate">
              {{ lastMessagePreview }}
            </span>
          </div>
          <div class="flex items-center space-x-2 flex-shrink-0 pl-2">
            <Star v-if="chat.isPinned" class="w-4 h-4 text-[#767779]" fill="#767779" />
            <span v-if="chat.mention" class="text-lg font-semibold text-[#1DAB61] -mt-1">@</span>
            <div
              v-if="chat.unreadCount > 0"
              class="bg-[#1DAB61] text-white text-xs font-semibold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center"
            >
              {{ chat.unreadCount }}
            </div>
            <div
              v-if="chat.specialBadgeCount && chat.specialBadgeCount > 0"
              class="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br from-[#EFA3E4] via-[#036BE4] to-[#65F9C2]"
            >
              <span class="text-white text-xs font-semibold">{{ chat.specialBadgeCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

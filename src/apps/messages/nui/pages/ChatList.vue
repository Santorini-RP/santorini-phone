<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMessagesStore } from '../store/messagesStore';
import { useMessagesUiStore } from '../store/uiStore';
import ChatListItem from '../components/ChatListItem.vue';
import SearchInput from '@core/nui/components/SearchInput.vue';
import { Camera, Plus, Archive } from 'lucide-vue-next';

const messagesStore = useMessagesStore();
const uiStore = useMessagesUiStore();
const router = useRouter();

const activeFilter = ref('All');
const searchQuery = ref('');
const filters = ['All', 'Unread', 'Favourites', 'Groups'];

const unarchivedChats = computed(() => messagesStore.chats.filter(c => !c.isArchived));
const hasArchivedChats = computed(() => messagesStore.chats.some(c => c.isArchived));

const headerTitle = computed(() => uiStore.isSelectionMode ? `${uiStore.selectedCount} Selected` : 'Chats');
</script>

<template>
  <div class="h-full w-full bg-white flex flex-col font-sans">
    <!-- Header Section (Fixed) -->
    <header class="pt-12 pb-2 px-4 bg-white sticky top-0 z-10">
      <div class="flex items-center h-9">
        <div class="flex-1 flex justify-start">
          <button v-if="!uiStore.isSelectionMode" @click="uiStore.toggleSelectionMode" class="text-lg text-[#0A0A0A] px-2">Edit</button>
        </div>
        <div class="flex-1 flex justify-end">
          <button v-if="uiStore.isSelectionMode" @click="uiStore.toggleSelectionMode" class="text-lg text-[#0A0A0A] px-2 font-semibold">Done</button>
          <div v-if="!uiStore.isSelectionMode" class="flex items-center space-x-4">
            <button class="p-1.5 bg-[#0A0A0A08] rounded-full text-[#0A0A0A]"><Camera class="w-5 h-5" /></button>
            <button class="p-1.5 bg-[#1DAB61] rounded-full text-white"><Plus class="w-5 h-5" /></button>
          </div>
        </div>
      </div>
      
      <h1 class="text-3xl font-bold text-[#0A0A0A] mt-2">{{ headerTitle }}</h1>
      
      <div v-if="!uiStore.isSelectionMode" class="mt-3">
        <SearchInput v-model="searchQuery" placeholder="Search" />
      </div>
    </header>

    <!-- Main Content (Scrollable) -->
    <div class="flex-1 flex flex-col overflow-y-auto">
      <!-- Filters (Horizontally scrollable) -->
      <div class="px-4 py-3 bg-white">
        <div class="flex space-x-2 items-center overflow-x-auto no-scrollbar">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="activeFilter = filter"
            class="px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors flex-shrink-0"
            :disabled="uiStore.isSelectionMode"
            :class="uiStore.isSelectionMode 
              ? 'bg-[#F4F4F4] text-[#BDBDBD]' 
              : activeFilter === filter ? 'bg-[#D0FECF] text-[#15603E]' : 'bg-[#F4F4F4] text-[#767779]'"
          >
            {{ filter }}
          </button>
          <button class="w-8 h-8 flex-shrink-0 bg-[#F4F4F4] rounded-full flex items-center justify-center" :disabled="uiStore.isSelectionMode">
            <Plus class="w-4 h-4" :class="uiStore.isSelectionMode ? 'text-[#BDBDBD]' : 'text-[#767779]'" />
          </button>
        </div>
      </div>

      <!-- Chat List -->
      <div class="flex flex-col">
        <div 
            v-if="hasArchivedChats"
            @click="!uiStore.isSelectionMode && router.push('/app/messages/archived')"
            class="flex items-center space-x-3 py-2.5 px-4"
            :class="{ 
              'text-[#0A0A0A] font-semibold cursor-pointer hover:bg-gray-50 transition-colors': !uiStore.isSelectionMode,
              'text-gray-400': uiStore.isSelectionMode
            }"
        >
            <Archive class="w-5 h-5" :class="uiStore.isSelectionMode ? 'text-gray-400' : 'text-[#767779]'" />
            <span>Archived</span>
        </div>
        <ChatListItem 
          v-for="chat in unarchivedChats" 
          :key="chat.id" 
          :chat="chat"
          :is-selection-mode="uiStore.isSelectionMode"
          :is-selected="uiStore.selectedChatIds.includes(chat.id)"
          @toggle-selection="uiStore.toggleSelection(chat.id)"
        />
      </div>
    </div>
  </div>
</template>

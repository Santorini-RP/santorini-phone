<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMessagesStore } from '../store/messagesStore';
import PageLayout from '@core/nui/components/PageLayout.vue';
import ChatListItem from '../components/ChatListItem.vue';
import SelectionActionFooter from '../components/SelectionActionFooter.vue';

const messagesStore = useMessagesStore();

const isSelectionMode = ref(false);
const selectedChats = ref<number[]>([]);

const archivedChats = computed(() => messagesStore.chats.filter(c => c.isArchived));
const isAnythingSelected = computed(() => selectedChats.value.length > 0);
const selectedCount = computed(() => selectedChats.value.length);
const pageTitle = computed(() => isSelectionMode.value ? `${selectedCount.value} Selected` : 'Archived');

const toggleSelectionMode = () => {
  isSelectionMode.value = !isSelectionMode.value;
  if (!isSelectionMode.value) {
    selectedChats.value = [];
  }
};

const toggleSelection = (chatId: number) => {
  const index = selectedChats.value.indexOf(chatId);
  if (index > -1) {
    selectedChats.value.splice(index, 1);
  } else {
    selectedChats.value.push(chatId);
  }
};

const handleUnarchive = () => {
  alert(`Unarchiving ${selectedCount.value} chats.`);
  // Logic to unarchive chats in the store would go here
  toggleSelectionMode();
};

const handleDelete = () => {
  alert(`Deleting ${selectedCount.value} chats.`);
  // Logic to delete chats in the store would go here
  toggleSelectionMode();
};
</script>

<template>
  <div class="h-full w-full bg-white flex flex-col font-sans">
    <PageLayout :page-title="pageTitle" previous-title="Chats">
      <template #header-actions>
        <button @click="toggleSelectionMode" class="text-lg text-[#0A0A0A] px-2" :class="{'font-semibold': isSelectionMode}">
          {{ isSelectionMode ? 'Done' : 'Edit' }}
        </button>
      </template>
      
      <div class="flex flex-col h-full">
        <div v-if="!isSelectionMode" class="px-8 py-3.5 border-b border-gray-200">
          <p class="text-center text-xs text-[#767779]">
            These chats are unarchived when new messages are received. Tap to change
          </p>
        </div>
        
        <div class="flex-1 overflow-y-auto">
          <div v-if="archivedChats.length > 0">
            <ChatListItem 
              v-for="chat in archivedChats" 
              :key="chat.id" 
              :chat="chat"
              :is-selection-mode="isSelectionMode"
              :is-selected="selectedChats.includes(chat.id)"
              @toggle-selection="toggleSelection(chat.id)"
            />
          </div>
          <div v-else class="text-center text-gray-500 pt-10">
            No archived chats.
          </div>
        </div>
      </div>
    </PageLayout>
    
    <footer v-if="isSelectionMode" class="sticky bottom-0 z-10">
      <SelectionActionFooter
        :disabled="!isAnythingSelected"
        @unarchive="handleUnarchive"
        @delete="handleDelete"
      />
    </footer>
  </div>
</template>

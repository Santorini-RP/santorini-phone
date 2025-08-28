import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useMessagesUiStore = defineStore('messages-ui', () => {
  const isSelectionMode = ref(false);
  const selectedChatIds = ref<number[]>([]);

  const isAnythingSelected = computed(() => selectedChatIds.value.length > 0);
  const selectedCount = computed(() => selectedChatIds.value.length);

  const toggleSelectionMode = () => {
    isSelectionMode.value = !isSelectionMode.value;
    if (!isSelectionMode.value) {
      selectedChatIds.value = [];
    }
  };

  const toggleSelection = (chatId: number) => {
    const index = selectedChatIds.value.indexOf(chatId);
    if (index > -1) {
      selectedChatIds.value.splice(index, 1);
    } else {
      selectedChatIds.value.push(chatId);
    }
  };
  
  const clearSelection = () => {
    selectedChatIds.value = [];
  }

  return {
    isSelectionMode,
    selectedChatIds,
    isAnythingSelected,
    selectedCount,
    toggleSelectionMode,
    toggleSelection,
    clearSelection,
  };
});

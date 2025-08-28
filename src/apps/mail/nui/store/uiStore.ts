import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Email } from './app-store';

export const useMailUiStore = defineStore('mail-ui', () => {
  const isNewMessageModalVisible = ref(false);
  const replyToEmail = ref<Email | null>(null);

  const openNewMessageModal = (email: Email) => {
    replyToEmail.value = email;
    isNewMessageModalVisible.value = true;
  };

  const closeNewMessageModal = () => {
    isNewMessageModalVisible.value = false;
    // Reset after transition
    setTimeout(() => {
      replyToEmail.value = null;
    }, 300);
  };

  return {
    isNewMessageModalVisible,
    replyToEmail,
    openNewMessageModal,
    closeNewMessageModal,
  };
});

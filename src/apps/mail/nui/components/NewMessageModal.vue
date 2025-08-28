<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMailStore } from '../store/app-store';
import { useMailUiStore } from '../store/uiStore';
import { Paperclip } from 'lucide-vue-next';

const mailStore = useMailStore();
const mailUiStore = useMailUiStore();

const messageBody = ref('');

const isSendDisabled = computed(() => {
  return messageBody.value.trim() === '';
});

const handleSend = () => {
  if (isSendDisabled.value) return;
  alert('Sending message...');
  mailUiStore.closeNewMessageModal();
};

const handleAttachment = () => {
  alert('Attachment functionality not implemented.');
};
</script>

<template>
  <transition name="modal-slide">
    <div v-if="mailUiStore.isNewMessageModalVisible" class="fixed inset-0 z-[100] flex flex-col justify-end font-sans">
      <!-- 
        This inner div represents the visible modal. 
        It's constrained to 95% height and has rounded corners to simulate
        starting below the status bar, respecting the safe area.
      -->
      <div class="w-full h-[95%] flex flex-col bg-gray-100 dark:bg-black rounded-t-2xl overflow-hidden shadow-2xl">
      
        <!-- Header -->
        <header class="flex-shrink-0 bg-gray-100 dark:bg-ios-dark-card border-b border-gray-200 dark:border-gray-700/60">
          <div class="w-full flex items-center justify-between px-4 py-3 relative">
            <button @click="mailUiStore.closeNewMessageModal()" class="text-lg text-blue-500">Cancel</button>
            <h2 class="font-semibold text-lg text-black dark:text-white">New Message</h2>
            <button @click="handleSend" class="text-lg text-blue-500" :class="isSendDisabled ? 'opacity-50' : 'font-semibold'" :disabled="isSendDisabled">Send</button>
          </div>
        </header>

        <!-- Scrollable Main Content -->
        <main class="flex-1 overflow-y-auto bg-white dark:bg-black">
          <div class="px-4 border-b border-gray-200 dark:border-gray-700/60">
            <!-- To -->
            <div class="flex items-center py-2.5 border-b border-gray-200 dark:border-gray-700/60">
              <span class="text-gray-500 dark:text-gray-400 mr-4">To:</span>
              <span class="text-black dark:text-white">{{ mailUiStore.replyToEmail?.sender }}</span>
            </div>
            <!-- From -->
            <div class="flex items-center py-2.5 border-b border-gray-200 dark:border-gray-700/60">
              <span class="text-gray-500 dark:text-gray-400 mr-4">From:</span>
              <span class="text-black dark:text-white">{{ mailStore.currentUserEmail }}</span>
            </div>
            <!-- Subject -->
            <div class="flex items-center py-2.5">
              <span class="text-gray-500 dark:text-gray-400 mr-4">Subject:</span>
              <span class="text-black dark:text-white">Re: {{ mailUiStore.replyToEmail?.subject }}</span>
            </div>
          </div>

          <!-- Message Body -->
          <textarea
            v-model="messageBody"
            placeholder=""
            class="w-full p-4 text-lg bg-transparent text-black dark:text-white outline-none resize-none min-h-[300px]"
          ></textarea>
        </main>

        <!-- Footer -->
        <footer class="flex-shrink-0 border-t border-gray-200 dark:border-gray-700/60 bg-gray-100 dark:bg-ios-dark-card">
          <!-- Safe area padding for the home indicator is added here -->
          <div class="pb-8">
            <div class="flex items-center justify-start px-4 py-2">
              <button @click="handleAttachment" class="text-blue-500">
                <Paperclip class="w-7 h-7" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
}
.modal-slide-enter-from,
.modal-slide-leave-to {
  transform: translateY(100%);
}
</style>

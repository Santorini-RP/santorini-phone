<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMailStore } from '../store/app-store';
import { useMailUiStore } from '../store/uiStore';
import { ChevronLeft, CornerUpLeft } from 'lucide-vue-next';

const props = defineProps<{
  emailId: string;
}>();

const router = useRouter();
const mailStore = useMailStore();
const mailUiStore = useMailUiStore();

const email = computed(() => {
  return mailStore.getEmailById(Number(props.emailId));
});

const goBack = () => {
  router.back();
};

const handleReply = () => {
  if (email.value) {
    mailUiStore.openNewMessageModal(email.value);
  }
};

// Simple markdown parser
const parsedBody = computed(() => {
  if (!email.value?.preview) return '';

  let html = email.value.preview
    // Sanitize basic HTML
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // **bold**
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // *italic*
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Newlines
    .replace(/\n/g, '<br />');

  return html;
});
</script>

<template>
  <div v-if="email" class="h-full w-full bg-white dark:bg-ios-dark-bg flex flex-col font-sans">
    <!-- Header -->
    <header class="sticky top-0 z-20 pt-10 bg-white/80 dark:bg-ios-dark-bg/80 backdrop-blur-md">
      <div class="w-full flex items-center justify-between px-2 pb-2 relative border-b border-gray-200 dark:border-gray-700/60">
        <button @click="goBack" class="flex items-center text-blue-500 text-lg">
          <ChevronLeft class="w-8 h-8 -ml-2" />
          <span class="-ml-2">Inbox</span>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-4">
      <div class="flex justify-between items-start">
        <div>
          <p class="font-semibold text-black dark:text-white">{{ email.sender }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">To: mail@lbphone.com</p>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0 ml-4">{{ email.time }}</p>
      </div>

      <h1 class="text-2xl font-bold mt-4 text-black dark:text-white">{{ email.subject }}</h1>

      <div class="mt-6 text-base text-black dark:text-white leading-relaxed" v-html="parsedBody"></div>
    </main>

    <!-- Footer -->
    <footer class="sticky bottom-0 z-10 border-t border-gray-200 dark:border-gray-700/60 bg-white/80 dark:bg-ios-dark-card/80 backdrop-blur-md">
      <div class="flex justify-end items-center px-6 py-2">
        <button @click="handleReply" class="text-blue-500">
          <CornerUpLeft class="w-7 h-7" />
        </button>
      </div>
    </footer>
  </div>
  <div v-else class="h-full flex items-center justify-center text-gray-500">
    Email not found.
  </div>
</template>

<script setup lang="ts">
import type { Email } from '../store/app-store';
import { ChevronRight } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const props = defineProps<{
  email: Email;
}>();

const router = useRouter();

const openEmail = () => {
  router.push(`/app/mail/inbox/${props.email.id}`);
};
</script>

<template>
  <div @click="openEmail" class="flex items-start space-x-4 px-4 py-3 border-b border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
    <div class="w-2.5 h-2.5 mt-1.5">
      <div v-if="!email.isRead" class="w-full h-full bg-blue-500 rounded-full"></div>
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex justify-between items-center">
        <p class="font-semibold text-black dark:text-white truncate">{{ email.sender }}</p>
        <div class="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
          <span>{{ email.time }}</span>
          <ChevronRight class="w-4 h-4 text-gray-400" />
        </div>
      </div>
      <p class="font-semibold text-black dark:text-white truncate">{{ email.subject }}</p>
      <p class="text-gray-600 dark:text-gray-400 truncate">{{ email.preview }}</p>
    </div>
  </div>
</template>

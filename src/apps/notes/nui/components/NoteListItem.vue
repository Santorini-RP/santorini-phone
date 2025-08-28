<script setup lang="ts">
import type { Note } from '../store/app-store';
import { useRouter } from 'vue-router';

const props = defineProps<{
  note: Note;
  isLast: boolean;
}>();

const router = useRouter();

const openNote = () => {
  router.push(`/app/notes/${props.note.id}`);
};
</script>

<template>
  <div @click="openNote" class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
    <div class="px-4 py-2">
      <h3 class="font-semibold text-base text-black dark:text-white truncate">{{ note.title }}</h3>
      <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
        <span>{{ note.lastEdited }}</span>
        <p class="truncate">{{ note.content }}</p>
      </div>
    </div>
    <div v-if="!isLast" class="border-b border-gray-200 dark:border-gray-700/60 ml-4"></div>
  </div>
</template>

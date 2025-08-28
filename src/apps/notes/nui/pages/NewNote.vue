<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNotesStore } from '../store/app-store';

const router = useRouter();
const notesStore = useNotesStore();

onMounted(() => {
  const newNoteId = notesStore.createNoteAndGetId();
  router.replace(`/app/notes/${newNoteId}`);
});
</script>

<template>
  <div class="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-ios-dark-bg">
    <p class="text-gray-500 dark:text-gray-400">Creating new note...</p>
  </div>
</template>

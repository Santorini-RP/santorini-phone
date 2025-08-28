<script setup lang="ts">
import { useNotesStore } from '../store/app-store';
import { useRouter } from 'vue-router';
import PageLayout from '@core/nui/components/PageLayout.vue';
import SearchInput from '@core/nui/components/SearchInput.vue';
import NoteListItem from '../components/NoteListItem.vue';
import { SquarePen } from 'lucide-vue-next';

const notesStore = useNotesStore();
const router = useRouter();

const createNewNote = () => {
  router.push('/app/notes/new');
};
</script>

<template>
  <div class="h-full w-full bg-gray-100 dark:bg-ios-dark-bg flex flex-col font-sans">
    <PageLayout page-title="Notes">
      <div class="px-4 -mt-2">
        <SearchInput v-model="notesStore.searchQuery" placeholder="Search" />
      </div>

      <div class="mt-4 mx-2">
        <div class="bg-white dark:bg-ios-dark-card rounded-xl overflow-hidden">
          <NoteListItem 
            v-for="(note, index) in notesStore.filteredNotes"
            :key="note.id"
            :note="note"
            :is-last="index === notesStore.filteredNotes.length - 1"
          />
        </div>
      </div>
    </PageLayout>

    <footer class="sticky bottom-0 z-10 border-t border-gray-200 dark:border-gray-700/60 bg-gray-100/80 dark:bg-ios-dark-bg/80 backdrop-blur-md">
      <div class="flex justify-between items-center px-6 py-2">
        <div></div>
        <span class="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {{ notesStore.totalNotes }} Notes
        </span>
        <button @click="createNewNote" class="text-yellow-500">
          <SquarePen class="w-7 h-7" />
        </button>
      </div>
    </footer>
  </div>
</template>

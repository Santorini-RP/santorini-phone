<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotesStore } from '../store/app-store';
import { useDebounceFn, useTextareaAutosize } from '@vueuse/core';
import { useModalStore } from '@core/nui/store/modal';
import { ChevronLeft, Trash2, Upload } from 'lucide-vue-next';

const props = defineProps<{
  noteId: string;
}>();

const router = useRouter();
const notesStore = useNotesStore();
const modalStore = useModalStore();

const note = computed(() => notesStore.getNoteById(Number(props.noteId)));

const editableTitle = ref('');
const editableContent = ref('');

const { textarea: contentTextarea } = useTextareaAutosize({ input: editableContent });
const { textarea: titleTextarea } = useTextareaAutosize({ input: editableTitle });

const debouncedUpdate = useDebounceFn(() => {
  if (note.value) {
    notesStore.updateNote({ 
        ...note.value, 
        title: editableTitle.value || 'New Note', // Default title if empty
        content: editableContent.value 
    });
  }
}, 500);

watch([editableTitle, editableContent], () => {
  debouncedUpdate();
});

watch(note, (newNote) => {
  if (newNote) {
    editableTitle.value = newNote.title;
    editableContent.value = newNote.content;
  }
}, { immediate: true, deep: true });


const handleDelete = async () => {
  if (note.value) {
    const result = await modalStore.showModal({
      title: `Delete Note`,
      message: `Are you sure you want to delete this note?`,
      buttons: [
        { id: 'cancel', text: 'Cancel', style: 'cancel' },
        { id: 'delete', text: 'Delete', style: 'destructive' },
      ]
    });

    if (result.buttonId === 'delete') {
      notesStore.deleteNote(note.value.id);
      router.back();
    }
  }
};

const handleShare = () => {
  alert('Share functionality not implemented.');
};

const goBack = () => {
  // If the note is completely empty, delete it when going back
  if (note.value && !note.value.title.trim() && !note.value.content.trim()) {
    notesStore.deleteNote(note.value.id);
  }
  router.back();
};
</script>

<template>
  <div v-if="note" class="h-full w-full bg-white dark:bg-ios-dark-bg flex flex-col font-sans text-black dark:text-white">
    <!-- Header -->
    <header class="sticky top-0 z-20 pt-10 bg-white/80 dark:bg-ios-dark-bg/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700/60">
      <div class="w-full flex items-center justify-between px-2 pb-2 relative h-11">
        <button @click="goBack" class="flex items-center text-yellow-500 text-lg">
          <ChevronLeft class="w-8 h-8 -ml-2" />
          <span class="-ml-2">Notes</span>
        </button>
        <button @click="handleShare" class="text-yellow-500 px-2">
          <Upload class="w-6 h-6" />
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-y-auto px-4 pt-4">
      <textarea
        ref="titleTextarea"
        v-model="editableTitle"
        placeholder="Title"
        class="w-full bg-transparent text-3xl font-bold outline-none resize-none no-scrollbar mb-2"
        rows="1"
      ></textarea>
      <textarea
        ref="contentTextarea"
        v-model="editableContent"
        class="w-full h-full flex-1 bg-transparent text-base outline-none resize-none no-scrollbar"
        placeholder="Start typing..."
      ></textarea>
    </main>

    <!-- Footer -->
    <footer class="sticky bottom-0 z-10 border-t border-gray-200 dark:border-gray-700/60 bg-white/80 dark:bg-ios-dark-bg/80 backdrop-blur-md">
      <div class="flex justify-between items-center px-6 py-2">
        <button @click="handleDelete" class="text-yellow-500">
          <Trash2 class="w-6 h-6" />
        </button>
        <span class="text-xs text-gray-600 dark:text-gray-400 font-medium">
          Last Edited: {{ note.lastEdited }}
        </span>
        <button @click="handleShare" class="text-yellow-500">
          <Upload class="w-6 h-6" />
        </button>
      </div>
    </footer>
  </div>
  <div v-else class="h-full flex items-center justify-center text-gray-500">
    Note not found.
  </div>
</template>

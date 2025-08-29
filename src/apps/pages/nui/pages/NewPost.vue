<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePagesStore, type NewPageData } from '../store/app-store';
import { Plus } from 'lucide-vue-next';

const router = useRouter();
const store = usePagesStore();

const newPost = ref<NewPageData>({
  title: '',
  description: '',
  price: undefined,
});

const isFormValid = computed(() => {
  return newPost.value.title.trim() !== '' && newPost.value.description.trim() !== '';
});

const goBack = () => {
  router.back();
};

const handlePost = () => {
  if (!isFormValid.value) return;
  store.addPage(newPost.value);
  goBack();
};
</script>

<template>
  <div class="h-full w-full bg-gray-100 dark:bg-ios-dark-bg flex flex-col font-sans text-black dark:text-white">
    <!-- Header -->
    <header class="sticky top-0 z-20 pt-10 bg-gray-100/80 dark:bg-ios-dark-bg/80 backdrop-blur-md">
      <div class="w-full flex items-center justify-between px-2 pb-2 relative h-11">
        <button @click="goBack" class="text-blue-500 text-lg px-2">Cancel</button>
        <h2 class="font-semibold text-lg absolute left-1/2 -translate-x-1/2">New Post</h2>
        <button 
          @click="handlePost" 
          class="text-lg px-2"
          :class="isFormValid ? 'text-blue-500 font-semibold' : 'text-gray-400 dark:text-gray-600'"
          :disabled="!isFormValid"
        >
          Post
        </button>
      </div>
    </header>

    <!-- Form Content -->
    <main class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- Title -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
        <input
          v-model="newPost.title"
          id="title"
          type="text"
          placeholder="Title"
          class="w-full p-3 bg-white dark:bg-ios-dark-card rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
        <textarea
          v-model="newPost.description"
          id="description"
          placeholder="Description"
          rows="5"
          class="w-full p-3 bg-white dark:bg-ios-dark-card rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
      </div>

      <!-- Image Upload -->
      <div class="w-24 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800/50">
        <Plus class="w-8 h-8" />
      </div>

      <!-- Price -->
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (Optional)</label>
        <input
          v-model.number="newPost.price"
          id="price"
          type="number"
          placeholder="0"
          class="w-full p-3 bg-white dark:bg-ios-dark-card rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <!-- Post Button -->
      <div class="pt-4">
        <button 
          @click="handlePost"
          :disabled="!isFormValid"
          class="w-full py-3 text-lg font-semibold rounded-lg transition-colors"
          :class="isFormValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'"
        >
          Post
        </button>
      </div>
    </main>
  </div>
</template>

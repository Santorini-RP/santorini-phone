<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMarketplaceStore, type NewListingData } from '../store/app-store';
import { Camera, Plus } from 'lucide-vue-next';

const router = useRouter();
const store = useMarketplaceStore();

const newListing = ref<NewListingData>({
  title: '',
  description: '',
  price: 0,
});

const isFormValid = computed(() => {
  return newListing.value.title.trim() !== '' && newListing.value.price > 0;
});

const goBack = () => {
  router.back();
};

const handlePost = () => {
  if (!isFormValid.value) return;
  store.addListing(newListing.value);
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
      <!-- Add Photos -->
      <div class="bg-white dark:bg-ios-dark-card rounded-xl p-4">
        <div class="flex items-center space-x-3">
          <button class="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500">
            <Camera class="w-8 h-8" />
          </button>
          <div class="w-20 h-20 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500">
            <Plus class="w-8 h-8" />
          </div>
        </div>
      </div>

      <!-- Details -->
      <div class="bg-white dark:bg-ios-dark-card rounded-xl overflow-hidden">
        <!-- Price -->
        <div class="flex items-center p-3 border-b border-gray-200 dark:border-gray-700/60">
          <label for="price" class="w-20 text-gray-600 dark:text-gray-400">Price</label>
          <div class="flex-1 flex items-center">
            <span class="text-gray-400 dark:text-gray-500 mr-1">$</span>
            <input
              v-model.number="newListing.price"
              id="price"
              type="number"
              placeholder="0"
              class="w-full bg-transparent text-black dark:text-white text-right focus:outline-none"
            />
          </div>
        </div>
        <!-- Title -->
        <div class="flex items-center p-3 border-b border-gray-200 dark:border-gray-700/60">
          <label for="title" class="w-20 text-gray-600 dark:text-gray-400">Title</label>
          <input
            v-model="newListing.title"
            id="title"
            type="text"
            placeholder="What are you selling?"
            class="w-full bg-transparent text-black dark:text-white focus:outline-none"
          />
        </div>
        <!-- Description -->
        <div class="p-3">
          <textarea
            v-model="newListing.description"
            id="description"
            placeholder="Description"
            rows="4"
            class="w-full bg-transparent text-black dark:text-white focus:outline-none resize-none"
          ></textarea>
        </div>
      </div>
    </main>
  </div>
</template>

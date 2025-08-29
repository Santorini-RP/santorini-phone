<script setup lang="ts">
import type { Listing } from '../store/app-store';
import { useMarketplaceStore } from '../store/app-store';
import { Trash2 } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const props = defineProps<{
  listing: Listing;
  showDeleteButton?: boolean;
}>();

const emit = defineEmits(['delete']);
const store = useMarketplaceStore();
const router = useRouter();

const handleDelete = () => {
  emit('delete', props.listing.id);
};

const goToDetail = () => {
  router.push(`/app/marketplace/${props.listing.id}`);
};
</script>

<template>
  <div @click="goToDetail" class="bg-white dark:bg-ios-dark-card rounded-xl p-4 space-y-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
    <div class="flex justify-between items-start">
      <h3 class="font-bold text-lg text-black dark:text-white">{{ listing.title }}</h3>
      <span class="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">{{ listing.timestamp }}</span>
    </div>
    <div class="flex items-start space-x-4">
      <div class="flex-1 min-w-0">
        <p class="text-sm text-gray-600 dark:text-gray-300 leading-snug">
          {{ listing.description }}
        </p>
        <p class="font-bold text-base text-black dark:text-white mt-3">
          {{ store.formatPrice(listing.price) }}
        </p>
      </div>
      <div class="w-24 flex-shrink-0 flex flex-col items-end space-y-2">
        <div class="w-24 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
            <img :src="listing.imageUrls[0]" :alt="listing.title" class="w-full h-full object-cover" />
        </div>
        <button v-if="showDeleteButton" @click.stop="handleDelete" class="w-7 h-7 bg-red-500 rounded-lg flex items-center justify-center text-white shadow-md hover:bg-red-600 transition-colors">
            <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

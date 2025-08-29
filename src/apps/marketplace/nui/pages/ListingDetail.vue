<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMarketplaceStore } from '../store/app-store';
import { useModalStore } from '@core/nui/store/modal';
import { useCallStore } from '@core/nui/store/callStore';
import { useCycleList } from '@vueuse/core';
import { ChevronLeft, ChevronRight, MessageSquare, Phone } from 'lucide-vue-next';

const props = defineProps<{
  listingId: string;
}>();

const router = useRouter();
const store = useMarketplaceStore();
const modalStore = useModalStore();
const callStore = useCallStore();

const listing = computed(() => {
  return store.getListingById(Number(props.listingId));
});

const { state: currentImage, next, prev, index } = useCycleList(
  listing.value?.imageUrls || [],
  { initialValue: listing.value?.imageUrls[0] }
);

const goBack = () => {
  router.back();
};

const handleMessage = () => {
  alert('Messaging seller...');
};

const handleCall = async () => {
  if (!listing.value || !listing.value.sellerPhone) {
    alert('Seller phone number is not available.');
    return;
  }

  const result = await modalStore.showModal({
    title: 'Call',
    message: `Are you sure you want to call\n${listing.value.sellerPhone}?`,
    buttons: [
      { id: 'cancel', text: 'Cancel', style: 'cancel' },
      { id: 'proceed', text: 'Proceed', style: 'default' },
    ]
  });

  if (result.buttonId === 'proceed') {
    callStore.startCall({
      contactName: listing.value.title,
      contactLabel: 'Marketplace Seller',
      callType: 'voice'
    });
  }
};
</script>

<template>
  <div v-if="listing" class="h-full w-full bg-gray-100 dark:bg-ios-dark-bg flex flex-col font-sans text-black dark:text-white">
    <!-- Header -->
    <header class="sticky top-0 z-20 pt-10 bg-gray-100/80 dark:bg-ios-dark-bg/80 backdrop-blur-md">
      <div class="w-full flex items-center justify-between px-2 pb-2 relative h-11">
        <button @click="goBack" class="flex items-center text-blue-500 text-lg">
          <ChevronLeft class="w-8 h-8 -ml-2" />
          <span class="-ml-2">Home</span>
        </button>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 overflow-y-auto no-scrollbar">
      <!-- Image Carousel -->
      <div class="relative w-full aspect-[4/3] bg-gray-200 dark:bg-gray-800">
        <img :src="currentImage" :alt="listing.title" class="w-full h-full object-cover" />
        <div v-if="listing.imageUrls.length > 1" class="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          {{ index + 1 }} of {{ listing.imageUrls.length }}
        </div>
        <button @click="prev" v-if="listing.imageUrls.length > 1" class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors">
          <ChevronLeft class="w-5 h-5" />
        </button>
        <button @click="next" v-if="listing.imageUrls.length > 1" class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors">
          <ChevronRight class="w-5 h-5" />
        </button>
      </div>

      <!-- Details -->
      <div class="p-4 space-y-4">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ listing.timestamp }}</p>
          <h1 class="text-2xl font-bold mt-1">{{ listing.title }}</h1>
          <p class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-1">{{ store.formatPrice(listing.price) }}</p>
          <p class="text-base text-gray-600 dark:text-gray-300 mt-2">{{ listing.description }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <button @click="handleMessage" class="w-full flex items-center justify-center space-x-2 bg-green-500 text-white font-semibold py-3 rounded-xl hover:bg-green-600 transition-colors">
            <MessageSquare class="w-5 h-5" />
            <span>Message</span>
          </button>
          <button @click="handleCall" class="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition-colors">
            <Phone class="w-5 h-5" />
            <span>Call</span>
          </button>
        </div>
      </div>
    </main>
  </div>
  <div v-else class="h-full flex items-center justify-center text-gray-500">
    Listing not found.
  </div>
</template>

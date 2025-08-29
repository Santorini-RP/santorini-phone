<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useMarketplaceStore } from '../store/app-store';
import PageLayout from '@core/nui/components/PageLayout.vue';
import SearchInput from '@core/nui/components/SearchInput.vue';
import ListingItem from '../components/ListingItem.vue';
import { SquarePen } from 'lucide-vue-next';

const store = useMarketplaceStore();
const router = useRouter();

const goToNewPost = () => {
  router.push('/app/marketplace/new');
};

const handleDelete = (listingId: number) => {
  store.deleteListing(listingId);
};
</script>

<template>
  <PageLayout page-title="Marketplace">
    <template #header-actions>
      <button @click="goToNewPost" class="text-blue-500">
        <SquarePen class="w-6 h-6" />
      </button>
    </template>

    <div class="px-4 -mt-2 space-y-3">
      <SearchInput v-model="store.searchQuery" placeholder="Search for listings or numbers" />
      <div v-if="store.userListings.length > 0" class="space-y-3">
        <ListingItem
          v-for="listing in store.userListings"
          :key="listing.id"
          :listing="listing"
          :show-delete-button="true"
          @delete="handleDelete"
        />
      </div>
      <div v-else class="text-center py-10 text-gray-500 dark:text-gray-400">
        You have no active posts.
      </div>
    </div>
  </PageLayout>
</template>

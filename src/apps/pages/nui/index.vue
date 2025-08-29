<script setup lang="ts">
import { useRouter } from 'vue-router';
import { usePagesStore } from './store/app-store';
import PageLayout from '@core/nui/components/PageLayout.vue';
import SearchInput from '@core/nui/components/SearchInput.vue';
import PageItem from './components/PageItem.vue';
import { SquarePen } from 'lucide-vue-next';

const store = usePagesStore();
const router = useRouter();

const handleNewPost = () => {
  router.push('/app/pages/new');
};
</script>

<template>
  <PageLayout page-title="Pages">
    <template #header-actions>
      <button @click="handleNewPost" class="text-blue-500">
        <SquarePen class="w-6 h-6" />
      </button>
    </template>

    <div class="px-4 -mt-2 space-y-3">
      <SearchInput v-model="store.searchQuery" placeholder="Search for posts or numbers" />
      <div class="space-y-3">
        <PageItem
          v-for="page in store.filteredPages"
          :key="page.id"
          :page="page"
        />
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import PageLayout from '@core/nui/components/PageLayout.vue'
import { useAppsStore } from '../store/app-store';
import AppListItem from '../components/AppListItem.vue';
import SearchInput from '@core/nui/components/SearchInput.vue';

const appsStore = useAppsStore();

onMounted(() => {
  appsStore.fetchStoreApps();
});
</script>

<template>
  <PageLayout page-title="Apps">
    <div class="px-4 space-y-4">
      <!-- Search Bar -->
      <div class="px-2">
        <SearchInput
          v-model="appsStore.searchQuery"
          placeholder="Search apps"
        />
      </div>

      <!-- Loading State -->
      <div v-if="appsStore.isLoading" class="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading apps...
      </div>

      <!-- App List -->
      <div v-else-if="appsStore.filteredApps.length > 0" class="mx-2">
        <AppListItem
          v-for="(app, index) in appsStore.filteredApps"
          :key="app.id"
          :app="app"
          :is-last="index === appsStore.filteredApps.length - 1"
        />
      </div>
      
      <!-- Empty State -->
      <div v-else class="text-center py-10 text-gray-500 dark:text-gray-400">
        No apps found.
      </div>
    </div>
  </PageLayout>
</template>

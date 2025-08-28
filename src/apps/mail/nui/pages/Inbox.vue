<script setup lang="ts">
import { ref } from 'vue';
import { useMailStore } from '../store/app-store';
import { useActionSheetStore } from '@core/nui/store/actionSheet';
import PageLayout from '@core/nui/components/PageLayout.vue';
import SearchInput from '@core/nui/components/SearchInput.vue';
import EmailListItem from '../components/EmailListItem.vue';
import { MoreHorizontal, Archive, SquarePen } from 'lucide-vue-next';

const mailStore = useMailStore();
const actionSheetStore = useActionSheetStore();
const searchQuery = ref('');

const showMoreOptions = async () => {
  const result = await actionSheetStore.show([
    [
      { id: 'change-account', text: 'Change Account', style: 'default' },
      { id: 'change-password', text: 'Change Password', style: 'default' },
      { id: 'delete-account', text: 'Delete Account', style: 'destructive' },
    ]
  ]);

  if (result) {
    alert(`Action selected: ${result}`);
  }
};
</script>

<template>
  <div class="h-full w-full bg-white dark:bg-ios-dark-bg flex flex-col font-sans">
    <PageLayout page-title="Mail">
      <template #header-actions>
        <button @click="showMoreOptions" class="text-blue-500">
          <MoreHorizontal class="w-6 h-6" />
        </button>
      </template>

      <div class="px-4 -mt-2">
        <SearchInput v-model="searchQuery" placeholder="Search" />
      </div>

      <div class="mt-4">
        <EmailListItem 
          v-for="email in mailStore.emails"
          :key="email.id"
          :email="email"
        />
      </div>
    </PageLayout>

    <footer class="sticky bottom-0 z-10 border-t border-gray-200 dark:border-gray-700/60 bg-white/80 dark:bg-ios-dark-card/80 backdrop-blur-md">
      <div class="flex justify-between items-center px-6 py-2">
        <button class="text-blue-500">
          <Archive class="w-7 h-7" />
        </button>
        <span class="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {{ mailStore.unreadCount }} Unread
        </span>
        <button class="text-blue-500">
          <SquarePen class="w-7 h-7" />
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { useModalStore } from '@core/nui/store/modal';

const modalStore = useModalStore();
const isEditing = ref(false);

const backups = ref([
  { id: 1, name: '(123) 456-7890' },
  { id: 2, name: '(131) 441-22' },
]);

const createBackup = async () => {
  await modalStore.showModal({
    title: 'Warning',
    message: 'You already have a backup for this number',
    buttons: [
      { id: 'ok', text: 'OK', style: 'default' }
    ]
  });
};

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const confirmDeleteBackup = async (backupId: number) => {
  const result = await modalStore.showModal({
    title: 'Remove Backup',
    message: 'Are you sure you want to remove this backup?',
    buttons: [
      { id: 'cancel', text: 'Cancel', style: 'cancel' },
      { id: 'remove', text: 'Remove', style: 'destructive' },
    ]
  });

  if (result === 'remove') {
    backups.value = backups.value.filter(b => b.id !== backupId);
    alert('Backup removed.');
  }
};
</script>

<template>
  <PageLayout page-title="Cloud Backup" previous-title="Settings">
    <template #header-actions>
      <button @click="toggleEdit" class="text-blue-500 text-lg px-2">
        {{ isEditing ? 'Done' : 'Edit' }}
      </button>
    </template>

    <div class="p-4 space-y-6">
      <!-- Create Backup Section -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-4 mb-2">Your Profile</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
          <div
            @click="createBackup"
            class="flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <p class="text-blue-500 w-full">Create Backup</p>
          </div>
        </div>
      </div>

      <!-- Backups List Section -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-4 mb-2">Backups</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
          <div
            v-for="(backup, index) in backups"
            :key="backup.id"
            class="flex items-center p-3 space-x-3"
            :class="{ 'border-b border-gray-200 dark:border-gray-700/60': index < backups.length - 1 }"
          >
            <button
              v-if="isEditing"
              @click="confirmDeleteBackup(backup.id)"
              class="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-lg font-bold leading-none flex-shrink-0 animate-fade-in"
            >
              -
            </button>
            <p class="text-black dark:text-white flex-1 transition-all duration-200" :class="{'pl-9': !isEditing}">{{ backup.name }}</p>
          </div>
          <div v-if="backups.length === 0" class="p-3 text-center text-gray-500 dark:text-gray-400">
            No backups found.
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSystemStore } from '@core/nui/store/system';
import { useModalStore } from '@core/nui/store/modal';
import PageLayout from '@core/nui/components/PageLayout.vue';

const systemStore = useSystemStore();
const modalStore = useModalStore();
const isEditing = ref(false);

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const confirmUnblockContact = async (contactId: number) => {
  const result = await modalStore.showModal({
    title: 'Unblock Number',
    message: 'Are you sure you want to unblock this number?',
    buttons: [
      { id: 'cancel', text: 'Cancel', style: 'cancel' },
      { id: 'unblock', text: 'Unblock', style: 'destructive' },
    ]
  });

  if (result === 'unblock') {
    systemStore.unblockContact(contactId);
  }
};

const handleAddNew = () => {
  alert('Adding new blocked contacts is not yet implemented.');
};
</script>

<template>
  <PageLayout page-title="Blocked Contacts" previous-title="Phone">
    <template #header-actions>
      <button 
        v-if="systemStore.blockedContacts.length > 0"
        @click="toggleEdit" 
        class="text-blue-500 text-lg px-2"
      >
        {{ isEditing ? 'Done' : 'Edit' }}
      </button>
    </template>

    <div class="p-4 space-y-6">
      <!-- Blocked Contacts List -->
      <div v-if="systemStore.blockedContacts.length > 0">
        <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
          <div
            v-for="(contact, index) in systemStore.blockedContacts"
            :key="contact.id"
            class="flex items-center p-3 space-x-3"
            :class="{ 'border-b border-gray-200 dark:border-gray-700/60': index < systemStore.blockedContacts.length - 1 }"
          >
            <button
              v-if="isEditing"
              @click="confirmUnblockContact(contact.id)"
              class="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-lg font-bold leading-none flex-shrink-0 animate-fade-in"
            >
              -
            </button>
            <p class="text-black dark:text-white flex-1 transition-all duration-200" :class="{'pl-9': !isEditing}">
              {{ contact.number }}
            </p>
          </div>
        </div>

        <!-- Add New Contact -->
        <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2 mt-6">
          <div
            @click="handleAddNew"
            class="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <p class="text-blue-500 text-center">Add New...</p>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="pt-10 text-center text-gray-500 dark:text-gray-400">
        <p>You haven't blocked any contacts.</p>
        <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2 mt-6">
          <div
            @click="handleAddNew"
            class="p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <p class="text-blue-500">Add New...</p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

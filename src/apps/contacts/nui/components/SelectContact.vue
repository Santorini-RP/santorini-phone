<script setup lang="ts">
import { useContactsStore, type Contact } from '../store/contactsStore';
import { useBottomSheetStore } from '@core/nui/store/bottomSheet';

const contactsStore = useContactsStore();
const bottomSheetStore = useBottomSheetStore();

const handleSelect = (contact: Contact) => {
  bottomSheetStore.close(contact);
};
</script>

<template>
  <div class="w-full">
    <div 
      v-for="contact in contactsStore.contacts" 
      :key="contact.id"
      @click="handleSelect(contact)"
      class="flex items-center p-3 space-x-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800/50 transition-colors"
    >
      <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
        <span class="text-base font-semibold text-gray-600 dark:text-gray-300">
          {{ contactsStore.getInitials(contact.name) }}
        </span>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-base font-medium text-black dark:text-white truncate">{{ contact.name }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ contact.phone }}</p>
      </div>
    </div>
  </div>
</template>

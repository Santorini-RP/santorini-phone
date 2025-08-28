<script setup lang="ts">
import { useContactsStore } from './store/contactsStore';
import PageLayout from '@core/nui/components/PageLayout.vue';
import SearchInput from '@core/nui/components/SearchInput.vue';
import { Plus } from 'lucide-vue-next';

const contactsStore = useContactsStore();
</script>

<template>
  <div class="h-full w-full bg-gray-100 dark:bg-ios-dark-bg flex flex-col font-sans">
    <PageLayout page-title="Contacts">
      <template #header-actions>
        <button class="text-blue-500">
          <Plus class="w-7 h-7" />
        </button>
      </template>

      <div class="px-4 -mt-2">
        <SearchInput v-model="contactsStore.searchQuery" placeholder="Search" />
      </div>

      <div class="flex-1 overflow-y-auto pt-4">
        <div v-for="group in contactsStore.groupedContacts" :key="group.letter" class="mb-4">
          <h2 class="px-4 pb-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
            {{ group.letter }}
          </h2>
          <div class="bg-white dark:bg-ios-dark-card rounded-xl mx-2">
            <div 
              v-for="(contact, index) in group.contacts" 
              :key="contact.id"
              class="flex items-center p-2.5 space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                <span class="text-base font-semibold text-gray-600 dark:text-gray-300">
                  {{ contactsStore.getInitials(contact.name) }}
                </span>
              </div>
              <div class="flex-1 min-w-0" :class="{ 'border-b border-gray-200 dark:border-gray-700/60 pb-2.5': index < group.contacts.length - 1 }">
                <p class="text-base font-medium text-black dark:text-white truncate">{{ contact.name }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ contact.phone }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="contactsStore.groupedContacts.length === 0" class="text-center text-gray-500 pt-10">
            No contacts found.
        </div>
      </div>
    </PageLayout>
    
    <footer class="sticky bottom-0 z-10 border-t border-gray-200 dark:border-gray-700/60 bg-gray-100/80 dark:bg-ios-dark-bg/80 backdrop-blur-md">
      <div class="text-center py-2">
        <span class="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {{ contactsStore.totalContacts }} Contacts
        </span>
      </div>
    </footer>
  </div>
</template>

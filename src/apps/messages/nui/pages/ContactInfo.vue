<script setup lang="ts">
import { ref, computed, markRaw } from 'vue';
import { useRoute } from 'vue-router';
import { useChatStore } from '../store/chatStore';
import PageLayout from '@core/nui/components/PageLayout.vue';
import ContactInfoGroup from '../components/ContactInfoGroup.vue';
import EditContactModal from '../components/EditContactModal.vue';

import {
  Phone,
  Video,
  Search,
  Star,
  Bell,
  Lock,
  User,
  Plus,
  Users,
} from 'lucide-vue-next';

import MediaLinksDocsIcon from '../components/icons/MediaLinksDocsIcon.vue';
import ThemeIcon from '../components/icons/ThemeIcon.vue';
import SaveToPhotosIcon from '../components/icons/SaveToPhotosIcon.vue';
import TimerIcon from '../components/icons/TimerIcon.vue';
import ChatLockIcon from '../components/icons/ChatLockIcon.vue';

const route = useRoute();
const chatStore = useChatStore();
const chatId = route.params.chatId as string;

const isEditModalVisible = ref(false);

// In a real app, you would fetch contact details based on chatId
const contact = computed(() => chatStore.contact);

const lockChatEnabled = ref(false);

const actionButtons = ref([
  { id: 'audio', label: 'Audio', icon: Phone },
  { id: 'video', label: 'Video', icon: Video },
  { id: 'search', label: 'Search', icon: Search },
]);

const settingGroups = ref([
  {
    items: [
      { id: 'media', label: 'Media, link and docs', detail: '76', icon: markRaw(MediaLinksDocsIcon) },
      { id: 'starred', label: 'Starred messages', detail: '2', icon: markRaw(Star) },
    ],
  },
  {
    items: [
      { id: 'notifications', label: 'Notifications', icon: markRaw(Bell) },
      { id: 'theme', label: 'Chat theme', icon: markRaw(ThemeIcon) },
      { id: 'save', label: 'Save to Photos', detail: 'Default', icon: markRaw(SaveToPhotosIcon) },
    ],
  },
  {
    items: [
      { id: 'disappearing', label: 'Disappearing Messages', detail: 'Off', icon: markRaw(TimerIcon) },
      { id: 'lock', label: 'Lock Chat', info: 'Lock and hide this chat on this device.', type: 'toggle' as const, state: lockChatEnabled, icon: markRaw(ChatLockIcon) },
      { id: 'encryption', label: 'Encryption', info: 'Message and calls are and-to-end encrypted. Tap to verify.', icon: markRaw(Lock) },
    ],
  },
  {
    items: [
      { id: 'details', label: 'Contact Details', icon: markRaw(User) },
    ],
  },
]);

const commonGroups = ref([
    { id: 'create', label: 'Create Group with Emmett', icon: markRaw(Plus), type: 'create' as const },
    { id: 'travelers', label: 'The time travelers ⏰', detail: 'Titor, Amy, Marty, Donny, James, William, Joseph, You', icon: markRaw(Users), type: 'group' as const }
]);

const chatActions = ref([
    { id: 'share', label: 'Share Contact', style: 'action' as const },
    { id: 'favorite', label: 'Add to Favourites', style: 'action' as const },
    { id: 'addtolist', label: 'Add to list', style: 'action' as const },
    { id: 'export', label: 'Export Chat', style: 'action' as const },
    { id: 'clear', label: 'Clear Chat', style: 'destructive' as const },
]);

const userActions = ref([
    { id: 'block', label: `Block ${contact.value?.name}`, style: 'destructive' as const },
    { id: 'report', label: `Report ${contact.value?.name}`, style: 'destructive' as const },
]);

const handleAction = (actionId: string) => {
  alert(`Action: ${actionId}`);
};

const handleSaveContact = (updatedContact: any) => {
  console.log('Saving contact:', updatedContact);
  // Here you would update the chatStore or make an API call
  if (contact.value) {
    contact.value.name = `${updatedContact.firstName} ${updatedContact.lastName}`.trim();
  }
};
</script>

<template>
  <div class="h-full w-full bg-[#F4F4F4] dark:bg-ios-dark-bg flex flex-col">
    <PageLayout v-if="contact" page-title="Contact Info" previous-title="1">
      <template #header-actions>
        <button @click="isEditModalVisible = true" class="text-lg text-blue-500 px-2">
          Edit
        </button>
      </template>
      <div class="pt-4 pb-28 px-4 space-y-4">
        <!-- Profile Info -->
        <div class="flex flex-col items-center text-center space-y-3">
          <img :src="contact.avatarUrl" :alt="contact.name" class="w-32 h-32 rounded-full object-cover shadow-lg" />
          <div>
            <h2 class="text-2xl font-bold text-black dark:text-white">{{ contact.name }}</h2>
            <p class="text-base text-gray-500 dark:text-gray-400 mt-1">{{ contact.phone }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-center space-x-2">
          <button v-for="button in actionButtons" :key="button.id" @click="handleAction(button.id)" class="flex-1 bg-white dark:bg-ios-dark-card rounded-lg py-2 flex flex-col items-center justify-center space-y-1 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <component :is="button.icon" class="w-6 h-6 text-green-600" />
            <span class="text-sm text-black dark:text-white">{{ button.label }}</span>
          </button>
        </div>

        <!-- Status -->
        <ContactInfoGroup>
          <div class="px-4 py-2">
            <p class="text-base text-black dark:text-white">Great Scott! ☢️</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">18 Mar 1993</p>
          </div>
        </ContactInfoGroup>

        <!-- Settings -->
        <ContactInfoGroup v-for="(group, index) in settingGroups" :key="`settings-${index}`" :items="group.items" @item-click="handleAction" />

        <!-- Groups in Common -->
        <div>
          <h3 class="text-sm text-gray-500 dark:text-gray-400 px-4 mb-2">No Groups in Common</h3>
          <ContactInfoGroup :items="commonGroups" @item-click="handleAction" />
        </div>
        
        <!-- Chat Actions -->
        <ContactInfoGroup :items="chatActions" @item-click="handleAction" />
        
        <!-- User Actions -->
        <ContactInfoGroup :items="userActions" @item-click="handleAction" />
      </div>
    </PageLayout>
    
    <EditContactModal
      :is-visible="isEditModalVisible"
      :contact="contact"
      @close="isEditModalVisible = false"
      @save="handleSaveContact"
      @delete="handleAction('delete-contact')"
    />
  </div>
</template>

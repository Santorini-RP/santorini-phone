<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useModalStore } from '@core/nui/store/modal';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { ChevronRight } from 'lucide-vue-next';

const router = useRouter();
const modalStore = useModalStore();

const settingGroups = ref([
  [
    { id: 'about', title: 'About', action: '/app/settings/general/about' },
    { id: 'software-update', title: 'Software Update', action: '/app/settings/general/software-update' },
    { id: 'phone-storage', title: 'Phone Storage', action: '/app/settings/general/storage' },
  ],
  [
    { id: 'date-time', title: 'Date & Time', action: '/app/settings/general/date-time' },
    { id: 'language-region', title: 'Language & Region', action: '/app/settings/general/language-region' },
  ],
  [
    { id: 'reset-phone', title: 'Reset Phone', action: '#' },
  ]
]);

const confirmResetPhone = async () => {
  const result = await modalStore.showModal({
    title: 'Reset Phone',
    message: 'Are you sure you want to reset your\nphone? [THIS WILL REMOVE\nEVERYTHING]',
    buttons: [
      { id: 'cancel', text: 'Cancel', style: 'cancel' },
      { id: 'reset', text: 'Reset', style: 'destructive' },
    ]
  });

  if (result === 'reset') {
    // Placeholder for actual reset logic
    alert('Phone has been reset.');
    // Optional: Navigate to home screen after reset
    router.push('/');
  }
};

const handleItemClick = (item: { id: string, action: string }) => {
  if (item.id === 'reset-phone') {
    confirmResetPhone();
  } else if (item.action !== '#') {
    router.push(item.action);
  } else {
    alert('This page is not yet implemented.');
  }
};
</script>

<template>
  <PageLayout page-title="General" previous-title="Settings">
    <div class="p-4 space-y-6">
      <div v-for="(group, groupIndex) in settingGroups" :key="groupIndex">
        <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
          <div
            v-for="(item, itemIndex) in group"
            :key="item.id"
            @click="handleItemClick(item)"
            class="flex items-center p-3 space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            :class="{ 'border-b border-gray-200 dark:border-gray-700/60': itemIndex < group.length - 1 }"
          >
            <p 
              class="flex-1 text-black dark:text-white"
              :class="{ 'text-red-500': item.id === 'reset-phone' }"
            >
              {{ item.title }}
            </p>
            <ChevronRight v-if="item.id !== 'reset-phone'" class="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

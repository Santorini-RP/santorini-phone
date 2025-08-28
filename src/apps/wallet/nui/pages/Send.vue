<script setup lang="ts">
import { onUnmounted, markRaw } from 'vue';
import { useRouter } from 'vue-router';
import { useSendStore } from '../store/sendStore';
import { useBottomSheetStore } from '@core/nui/store/bottomSheet';
import type { Contact } from '@apps/contacts/nui/store/contactsStore';
import SelectContact from '@apps/contacts/nui/components/SelectContact.vue';
import { ChevronLeft, Delete } from 'lucide-vue-next';

const router = useRouter();
const sendStore = useSendStore();
const bottomSheetStore = useBottomSheetStore();

const keypad = [
  { main: '1', sub: '' },
  { main: '2', sub: 'ABC' },
  { main: '3', sub: 'DEF' },
  { main: '4', sub: 'GHI' },
  { main: '5', sub: 'JKL' },
  { main: '6', sub: 'MNO' },
  { main: '7', sub: 'PQRS' },
  { main: '8', sub: 'TUV' },
  { main: '9', sub: 'WXYZ' },
  { main: ' ', sub: '' }, // Empty placeholder for layout
  { main: '0', sub: '' },
  { main: 'backspace', sub: '' },
];

const handleKeyClick = (key: string) => {
  if (key === 'backspace') {
    sendStore.deleteDigit();
  } else if (key !== ' ') {
    sendStore.appendDigit(key);
  }
};

const goBack = () => {
  router.push('/app/wallet');
};

const goToNext = () => {
  if (sendStore.isNextEnabled) {
    router.push('/app/wallet/send/amount');
  }
};

const handleContactSelection = (contact: Contact) => {
  if (contact && contact.phone) {
    sendStore.phoneNumber = contact.phone.replace(/\D/g, '');
  }
};

const openContactSheet = async () => {
  const selectedContact = await bottomSheetStore.open(markRaw(SelectContact));
  if (selectedContact) {
    handleContactSelection(selectedContact);
  }
};

// Clear the phone number when the component is unmounted
onUnmounted(() => {
  sendStore.clearNumber();
});
</script>

<template>
  <div class="h-full w-full bg-gray-100 text-black flex flex-col font-sans">
    <!-- Header -->
    <header class="sticky top-0 z-20 pt-10 bg-gray-100/80 backdrop-blur-md">
      <div class="w-full flex items-center justify-between px-2 pb-2">
        <button @click="goBack" class="flex items-center text-blue-500 text-lg">
          <ChevronLeft class="w-8 h-8 -ml-2" />
          <span class="-ml-2">Home</span>
        </button>
        <button 
          @click="goToNext"
          class="text-lg px-2"
          :class="sendStore.isNextEnabled ? 'text-blue-500 font-semibold' : 'text-gray-400'"
          :disabled="!sendStore.isNextEnabled"
        >
          Next
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col items-center justify-between pt-16">
      <div class="text-center">
        <div class="h-12 flex items-center justify-center">
          <p v-if="sendStore.phoneNumber" class="text-4xl text-gray-700 tracking-wider">
            {{ sendStore.formattedPhoneNumber }}
          </p>
          <p v-else class="text-4xl text-gray-400 tracking-wider">
            (123) 456-7890
          </p>
        </div>
        <button 
          @click="openContactSheet"
          class="mt-4 bg-gray-200 text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors"
        >
          Select Contact
        </button>
        <p class="mt-4 text-xs text-gray-400 max-w-[200px] mx-auto">
          Payments are non refundable, double check the number.
        </p>
      </div>

      <!-- Keypad -->
      <div class="w-full max-w-xs pb-12">
        <div class="grid grid-cols-3 gap-x-8 gap-y-4">
          <button
            v-for="key in keypad"
            :key="key.main"
            @click="handleKeyClick(key.main)"
            class="h-20 rounded-lg bg-white flex flex-col items-center justify-center text-black transition-all active:scale-95 disabled:opacity-0"
            :disabled="key.main === ' '"
          >
            <template v-if="key.main === 'backspace'">
              <Delete class="w-7 h-7 text-gray-600" />
            </template>
            <template v-else>
              <span class="text-3xl font-light">{{ key.main }}</span>
              <span v-if="key.sub" class="text-[10px] font-bold tracking-widest text-gray-500">{{ key.sub }}</span>
            </template>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

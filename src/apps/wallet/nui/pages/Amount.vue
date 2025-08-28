<script setup lang="ts">
import { onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSendStore } from '../store/sendStore';
import { useWalletStore } from '../store/app-store';
import { ChevronLeft, Delete } from 'lucide-vue-next';

const router = useRouter();
const sendStore = useSendStore();
const walletStore = useWalletStore();

const keypad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', '0', 'backspace'];

const handleKeyClick = (key: string) => {
  if (key === 'backspace') {
    sendStore.deleteAmountDigit();
  } else if (key !== ' ') {
    sendStore.appendAmountDigit(key);
  }
};

const goBack = () => {
  router.back();
};

const goToNext = () => {
  if (sendStore.isAmountNextEnabled) {
    walletStore.processTransaction(
      sendStore.amountNumber,
      sendStore.formattedPhoneNumber
    );
    router.push('/app/wallet/send/confirmation');
  }
};

// Clear the amount when the component is unmounted
onUnmounted(() => {
  sendStore.clearAmount();
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
          :class="sendStore.isAmountNextEnabled ? 'text-blue-500 font-semibold' : 'text-gray-400'"
          :disabled="!sendStore.isAmountNextEnabled"
        >
          Next
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col items-center justify-between pt-24">
      <div class="text-center">
        <div class="h-20 flex items-center justify-center">
          <p class="text-6xl text-gray-700 tracking-wider">
            {{ sendStore.formattedAmount }}
          </p>
        </div>
        <p v-if="sendStore.isAmountNextEnabled" class="mt-2 text-sm text-gray-400">
          New Balance: {{ sendStore.formattedNewBalance }}
        </p>
      </div>

      <!-- Keypad -->
      <div class="w-full max-w-xs pb-12">
        <div class="grid grid-cols-3 gap-x-8 gap-y-4">
          <button
            v-for="key in keypad"
            :key="key"
            @click="handleKeyClick(key)"
            class="h-20 rounded-lg bg-white flex flex-col items-center justify-center text-black transition-all active:scale-95 disabled:opacity-0"
            :disabled="key === ' '"
          >
            <template v-if="key === 'backspace'">
              <Delete class="w-7 h-7 text-gray-600" />
            </template>
            <template v-else>
              <span class="text-3xl font-light">{{ key }}</span>
            </template>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

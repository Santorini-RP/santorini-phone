<script setup lang="ts">
import { computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSystemStore } from '@core/nui/store/system';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { Delete } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const systemStore = useSystemStore();

const action = computed(() => route.query.action as 'turn-off' | 'change');

const handleNumberPress = (num: string) => {
  if (systemStore.isPinBlocked) return;
  systemStore.addPinDigit(num);
};

const handleDelete = () => {
  systemStore.removePinDigit();
};

// Reset attempts when the page is loaded
onMounted(() => {
  systemStore.pinAttempts = 0;
  systemStore.enteredPin = '';
});

watch(() => systemStore.enteredPin, (newPin) => {
  if (newPin.length === 4) {
    setTimeout(() => {
      const isCorrect = systemStore.verifyPin(newPin);
      if (isCorrect) {
        if (action.value === 'turn-off') {
          systemStore.togglePasscode();
        } else if (action.value === 'change') {
          alert('Passcode change flow is not yet implemented.');
        }
        router.back();
      }
    }, 200);
  }
});
</script>

<template>
  <PageLayout page-title="Face Unlock & Passcode" previous-title="Settings">
    <div class="h-full flex flex-col justify-center items-center p-8 text-center text-black dark:text-white">
      <div class="flex-1 flex flex-col justify-center items-center">
        <div class="text-lg mb-4">Enter Passcode</div>
        <div class="flex justify-center space-x-4 mb-2 h-8 items-center" :class="{ 'animate-shake': systemStore.pinAttempts > 0 }">
          <div
            v-for="i in 4"
            :key="i"
            class="w-4 h-4 rounded-full border border-black dark:border-white transition-all"
            :class="i <= systemStore.enteredPin.length ? 'bg-black dark:bg-white' : 'bg-transparent'"
          ></div>
        </div>
        <div class="text-red-500 text-sm h-5 mb-4">
          <span v-if="systemStore.pinAttempts > 0">Passcode Incorrect</span>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-x-8 gap-y-4 max-w-xs mx-auto pb-12">
        <button
          v-for="num in ['1','2','3','4','5','6','7','8','9']"
          :key="num"
          @click="handleNumberPress(num)"
          class="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-3xl font-light hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500 transition-all"
        >{{ num }}</button>
        <div></div>
        <button
          @click="handleNumberPress('0')"
          class="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-3xl font-light hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500 transition-all"
        >0</button>
        <button
          @click="handleDelete"
          :disabled="systemStore.enteredPin.length === 0"
          class="w-20 h-20 rounded-full flex items-center justify-center text-3xl hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 transition-all disabled:opacity-50"
        >
          <Delete class="w-8 h-8" />
        </button>
      </div>
    </div>
  </PageLayout>
</template>

<style scoped>
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
.animate-shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
}
</style>

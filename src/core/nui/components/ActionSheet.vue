<script setup lang="ts">
import { computed } from 'vue';
import { useModalStore, type ModalButton } from '@core/nui/store/modal';

const modalStore = useModalStore();

const getButtonClass = (button: ModalButton) => {
  switch (button.style) {
    case 'destructive':
      return 'font-semibold text-red-500 hover:bg-black/5 dark:hover:bg-white/5';
    case 'cancel':
      return 'font-bold text-blue-500 hover:bg-black/5 dark:hover:bg-white/5';
    default:
      return 'text-blue-500 hover:bg-black/5 dark:hover:bg-white/5';
  }
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="modalStore.isVisible"
      class="fixed inset-0 bg-black/30 dark:bg-black/50 z-[100] flex items-center justify-center p-4"
      @click.self="modalStore.handleButtonClick('cancel')"
    >
      <transition name="zoom">
        <div
          v-if="modalStore.isVisible"
          class="w-full max-w-[270px] bg-gray-200/90 dark:bg-zinc-800/90 backdrop-blur-xl rounded-2xl text-center shadow-lg overflow-hidden"
        >
          <!-- Content -->
          <div class="p-4 pb-3">
            <h3 class="font-bold text-lg text-black dark:text-white">{{ modalStore.title }}</h3>
            <p v-if="modalStore.message" class="text-sm mt-1 text-black/90 dark:text-white/90 whitespace-pre-line">{{ modalStore.message }}</p>
          </div>
          <!-- Actions -->
          <div class="flex border-t border-gray-400/40 dark:border-gray-600/60">
            <button
              v-for="(button, index) in modalStore.buttons"
              :key="button.id"
              @click="modalStore.handleButtonClick(button.id)"
              class="flex-1 py-3 text-lg transition-colors duration-100"
              :class="[getButtonClass(button), { 'border-l border-gray-400/40 dark:border-gray-600/60': index > 0 }]"
            >
              {{ button.text }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.zoom-enter-active {
  transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.zoom-leave-active {
  transition: transform 0.15s ease-in;
}
.zoom-enter-from, .zoom-leave-to {
  transform: scale(1.1);
}
</style>

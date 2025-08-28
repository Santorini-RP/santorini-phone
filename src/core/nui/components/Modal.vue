<script setup lang="ts">
import { useModalStore, type ModalButton } from '@core/nui/store/modal';

const modalStore = useModalStore();

const getButtonClass = (button: ModalButton) => {
  const isDisabled = button.style === 'default' && modalStore.isDefaultActionDisabled;

  if (isDisabled) {
    return 'font-normal text-gray-400 dark:text-gray-600';
  }

  switch (button.style) {
    case 'destructive':
      return 'font-semibold text-red-500 hover:bg-black/5 dark:hover:bg-white/5';
    case 'cancel':
      return 'font-bold text-blue-500 hover:bg-black/5 dark:hover:bg-white/5';
    default:
      return 'text-blue-500 hover:bg-black/5 dark:hover:bg-white/5';
  }
};

const handleBackgroundClick = () => {
  const cancelButton = modalStore.buttons.find(b => b.style === 'cancel');
  if (cancelButton) {
    modalStore.handleButtonClick(cancelButton.id);
  }
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="modalStore.isVisible"
      class="absolute inset-0 bg-black/30 dark:bg-black/50 z-[100] flex items-center justify-center p-4"
      @click.self="handleBackgroundClick"
    >
      <transition name="zoom">
        <div
          v-if="modalStore.isVisible"
          class="w-full max-w-[270px] bg-gray-200/80 dark:bg-zinc-800/80 backdrop-blur-xl rounded-2xl text-center shadow-lg overflow-hidden"
        >
          <!-- Content -->
          <div class="p-4 pb-3">
            <h3 class="font-bold text-lg text-black dark:text-white">{{ modalStore.title }}</h3>
            <p v-if="modalStore.message" class="text-sm mt-1 text-black/90 dark:text-white/90 whitespace-pre-line">{{ modalStore.message }}</p>
            
            <!-- Input Fields -->
            <div v-if="modalStore.inputs.length > 0" class="mt-4 bg-white/50 dark:bg-black/20 rounded-md border border-gray-400/50 dark:border-gray-600/50 divide-y divide-gray-400/50 dark:divide-gray-600/50">
              <input
                v-for="input in modalStore.inputs"
                :key="input.id"
                v-model="input.value"
                :type="input.type || 'text'"
                :placeholder="input.placeholder || ''"
                class="w-full px-2 py-1.5 text-sm text-center text-black dark:text-white bg-transparent focus:outline-none"
              />
            </div>
          </div>
          <!-- Actions -->
          <div
            class="border-t border-gray-400/40 dark:border-gray-600/60"
            :class="{
              'flex': modalStore.buttons.length <= 2,
              'flex flex-col': modalStore.buttons.length > 2
            }"
          >
            <button
              v-for="(button, index) in modalStore.buttons"
              :key="button.id"
              @click="modalStore.handleButtonClick(button.id)"
              :disabled="button.style === 'default' && modalStore.isDefaultActionDisabled"
              class="py-3 text-lg transition-colors duration-100"
              :class="[
                getButtonClass(button),
                { 'flex-1': modalStore.buttons.length <= 2 },
                { 'border-l border-gray-400/40 dark:border-gray-600/60': modalStore.buttons.length === 2 && index > 0 },
                { 'w-full': modalStore.buttons.length > 2 },
                { 'border-t border-gray-400/40 dark:border-gray-600/60': modalStore.buttons.length > 2 && index > 0 }
              ]"
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
  transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.2s ease;
}
.zoom-leave-active {
  transition: transform 0.15s ease-in, opacity 0.15s ease-in;
}
.zoom-enter-from, .zoom-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>

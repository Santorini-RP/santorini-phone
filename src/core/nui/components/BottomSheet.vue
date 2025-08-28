<script setup lang="ts">
import { ref } from 'vue';
import { useBottomSheetStore } from '../store/bottomSheet';
import { useSwipe } from '@vueuse/core';

const bottomSheetStore = useBottomSheetStore();
const sheetRef = ref<HTMLElement | null>(null);

useSwipe(sheetRef, {
  onSwipeEnd: (e, direction) => {
    if (direction === 'down') {
      bottomSheetStore.close();
    }
  },
});
</script>

<template>
  <transition name="fade">
    <div
      v-if="bottomSheetStore.isVisible"
      class="absolute inset-0 bg-black/40 z-[140] flex items-end"
      @click.self="bottomSheetStore.close()"
    >
      <transition name="slide-up">
        <div
          v-if="bottomSheetStore.isVisible"
          ref="sheetRef"
          class="w-full bg-gray-100 dark:bg-ios-dark-card rounded-t-2xl flex flex-col max-h-[85vh]"
        >
          <!-- Handle -->
          <div class="w-full py-3 flex-shrink-0 cursor-grab">
            <div class="w-10 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto"></div>
          </div>
          
          <!-- Content -->
          <div class="flex-1 overflow-y-auto no-scrollbar">
            <component 
              :is="bottomSheetStore.contentComponent" 
              v-bind="bottomSheetStore.contentProps" 
            />
          </div>

          <!-- Safe Area -->
          <div class="h-8 flex-shrink-0"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
}
</style>

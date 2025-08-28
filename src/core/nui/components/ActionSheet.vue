<script setup lang="ts">
import { useActionSheetStore, type ActionSheetOption } from '@core/nui/store/actionSheet';

const actionSheetStore = useActionSheetStore();

const getButtonClass = (option: ActionSheetOption) => {
  if (option.style === 'destructive') {
    return 'text-red-500';
  }
  return 'text-blue-500';
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="actionSheetStore.isVisible"
      class="fixed inset-0 bg-black/40 z-[150] flex items-end justify-center p-2"
      @click.self="actionSheetStore.handleCancel"
    >
      <transition name="slide-up">
        <div v-if="actionSheetStore.isVisible" class="w-full max-w-md flex flex-col gap-2">
          <!-- Option Groups -->
          <div 
            v-for="(group, groupIndex) in actionSheetStore.optionsGroups" 
            :key="groupIndex"
            class="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl rounded-xl text-center shadow-lg overflow-hidden"
          >
            <button
              v-for="(option, optionIndex) in group"
              :key="option.id"
              @click="actionSheetStore.handleSelect(option.id)"
              class="w-full py-3 text-xl transition-colors duration-100 flex items-center justify-center px-4 active:bg-black/5 dark:active:bg-white/5"
              :class="[
                getButtonClass(option),
                { 'border-t border-gray-400/30 dark:border-gray-600/50': optionIndex > 0 }
              ]"
            >
              <span class="flex-1 text-center">{{ option.text }}</span>
              <component v-if="option.icon" :is="option.icon" class="w-6 h-6 ml-3 flex-shrink-0" />
            </button>
          </div>

          <!-- Cancel Button -->
          <div class="bg-white/95 dark:bg-zinc-800/95 backdrop-blur-xl rounded-xl text-center shadow-lg overflow-hidden">
            <button
              @click="actionSheetStore.handleCancel"
              class="w-full py-3 text-xl font-semibold text-blue-500 transition-colors duration-100 active:bg-black/5 dark:active:bg-white/5"
            >
              Cancel
            </button>
          </div>
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
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
}
</style>

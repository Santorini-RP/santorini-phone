<script setup lang="ts">
import { computed, type PropType } from 'vue';
import type { Alarm } from '../store/app-store';
import { ChevronRight } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const props = defineProps({
  alarm: {
    type: Object as PropType<Alarm>,
    required: true,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['toggle', 'delete']);
const router = useRouter();

const textColorClass = computed(() => {
  if (props.isEditing) {
    return 'text-black dark:text-white';
  }
  return props.alarm.isEnabled
    ? 'text-black dark:text-white'
    : 'text-gray-400 dark:text-gray-500';
});

const handleItemClick = () => {
  if (props.isEditing) {
    router.push(`/app/clock/edit-alarm/${props.alarm.id}`);
  }
};
</script>

<template>
  <div 
    @click="handleItemClick"
    class="bg-white dark:bg-ios-dark-card rounded-xl p-4 flex items-center justify-between transition-colors"
    :class="{ 'cursor-pointer': isEditing }"
  >
    <div class="flex items-center space-x-4">
      <button 
        v-if="isEditing"
        @click.stop="$emit('delete', alarm.id)"
        class="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-lg font-bold leading-none flex-shrink-0 animate-fade-in"
      >
        -
      </button>
      <div :class="textColorClass" class="transition-colors">
        <p class="text-5xl font-light">{{ alarm.time }}</p>
        <p class="text-lg mt-1">{{ alarm.label }}</p>
      </div>
    </div>
    
    <button
      v-if="!isEditing"
      @click.stop="$emit('toggle', alarm.id)"
      class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5"
      :class="alarm.isEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'"
    >
      <span
        class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
        :class="{ 'translate-x-5': alarm.isEnabled }"
      ></span>
    </button>
    <ChevronRight v-else class="w-6 h-6 text-gray-400" />
  </div>
</template>

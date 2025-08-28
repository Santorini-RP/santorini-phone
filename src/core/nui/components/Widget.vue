<script setup lang="ts">
import { computed } from 'vue';
import type { Widget } from '../store/widgetManager';

const props = defineProps<{
  widget: Widget;
}>();

const widgetBaseClass = computed(() => {
  const classes = [
    'bg-black/20',
    'backdrop-blur-lg', 'rounded-2xl', 'p-4',
    'border', 'border-white/10', 'shadow-lg', 'cursor-pointer',
    'hover:bg-black/30',
    'active:scale-95', 'transition-all', 'duration-150'
  ];
  return classes;
});

const widgetSizeClass = computed(() => {
  switch (props.widget.size) {
    case 'small':
      return 'col-span-1 aspect-square';
    case 'medium':
      return 'col-span-2 aspect-[2/1]';
    case 'large':
      return 'col-span-2 aspect-square';
    case 'list':
      return 'col-span-2'; // Full width for list items
    default:
      return 'col-span-1';
  }
});
</script>

<template>
  <button 
    @click="widget.action" 
    :class="[widgetBaseClass, widgetSizeClass]"
  >
    <!-- List Layout -->
    <div v-if="widget.size === 'list'" class="flex items-center space-x-4 h-full">
      <div 
        class="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" 
        :class="widget.iconBgColor || 'bg-cyan-400/80'"
      >
        <component :is="widget.icon" class="w-6 h-6 text-white" />
      </div>
      <div class="flex-1 min-w-0 text-left">
        <p class="font-semibold text-base truncate text-white">{{ widget.title }}</p>
        <p v-if="widget.subtitle" class="text-sm text-gray-300 truncate">{{ widget.subtitle }}</p>
      </div>
    </div>

    <!-- Small Layout -->
    <div v-else-if="widget.size === 'small'" class="flex flex-col justify-between h-full text-left">
       <div 
        class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" 
        :class="widget.iconBgColor || 'bg-cyan-400/80'"
      >
        <component :is="widget.icon" class="w-5 h-5 text-white" />
      </div>
       <div class="mt-auto">
        <p class="font-semibold text-sm truncate text-white">{{ widget.title }}</p>
        <p v-if="widget.subtitle" class="text-xs text-gray-300 truncate">{{ widget.subtitle }}</p>
      </div>
    </div>
    
    <!-- Placeholder for other sizes -->
    <div v-else class="text-white">
      <p>{{ widget.title }}</p>
      <p class="text-xs">({{ widget.size }})</p>
    </div>
  </button>
</template>

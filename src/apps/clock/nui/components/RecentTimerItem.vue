<script setup lang="ts">
import { computed } from 'vue';
import { Trash2, Play } from 'lucide-vue-next';

const props = defineProps<{
  duration: number;
}>();

defineEmits(['start', 'delete']);

const formattedDuration = computed(() => {
  const hours = Math.floor(props.duration / 3600);
  const minutes = Math.floor((props.duration % 3600) / 60);
  const seconds = props.duration % 60;

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');
});
</script>

<template>
  <div class="p-3 flex items-center justify-between">
    <span class="text-lg font-mono text-black dark:text-white">{{ formattedDuration }}</span>
    <div class="flex items-center space-x-4">
      <button @click="$emit('delete')" class="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 active:bg-red-700 transition-colors">
        <Trash2 class="w-5 h-5" />
      </button>
      <button @click="$emit('start')" class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 active:bg-green-700 transition-colors">
        <Play class="w-5 h-5" fill="currentColor" />
      </button>
    </div>
  </div>
</template>

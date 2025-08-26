<script setup lang="ts">
defineProps<{
  disabled: boolean;
}>();

defineEmits(['unarchive', 'delete']);
</script>

<template>
  <div class="w-full bg-[#F4F4F4cc] backdrop-blur-lg border-t border-[#0A0A0A08]">
    <div class="flex justify-between items-center px-6 py-2">
      <button
        @click="$emit('unarchive')"
        :disabled="disabled"
        class="text-lg font-medium transition-colors"
        :class="disabled ? 'text-gray-400' : 'text-blue-500'"
      >
        Unarchive
      </button>
      <button
        @click="$emit('delete')"
        :disabled="disabled"
        class="text-lg font-medium transition-colors"
        :class="disabled ? 'text-gray-400' : 'text-blue-500'"
      >
        Delete
      </button>
    </div>
    <div class="flex justify-center pb-2">
      <div class="w-[140px] h-[5px] bg-[#0A0A0A] rounded-full"></div>
    </div>
  </div>
</template>

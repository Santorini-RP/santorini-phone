<script setup lang="ts">
defineProps<{
  disabled: boolean;
}>();

defineEmits(['archive', 'read', 'delete']);
</script>

<template>
  <div class="w-full bg-[#F4F4F4cc] backdrop-blur-lg border-t border-[#0A0A0A08] pb-6">
    <div class="flex justify-between items-center px-6 py-2">
      <button
        @click="$emit('archive')"
        :disabled="disabled"
        class="text-lg font-medium transition-colors"
        :class="disabled ? 'text-gray-400' : 'text-[#0A0A0A]'"
      >
        Archive
      </button>
      <button
        @click="$emit('read')"
        :disabled="disabled"
        class="text-lg font-medium transition-colors"
        :class="disabled ? 'text-gray-400' : 'text-[#0A0A0A]'"
      >
        Read
      </button>
      <button
        @click="$emit('delete')"
        :disabled="disabled"
        class="text-lg font-medium transition-colors"
        :class="disabled ? 'text-gray-400' : 'text-[#0A0A0A]'"
      >
        Delete
      </button>
    </div>
  </div>
</template>

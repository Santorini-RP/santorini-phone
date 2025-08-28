<script setup lang="ts">
defineProps<{
  date: string;
}>();
</script>

<template>
  <div class="self-center bg-white/80 backdrop-blur-sm shadow-sm rounded-lg px-3 py-1">
    <span class="text-xs font-semibold text-[#0A0A0A]">{{ date }}</span>
  </div>
</template>

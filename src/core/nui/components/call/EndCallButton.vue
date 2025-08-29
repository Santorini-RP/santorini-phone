<script setup lang="ts">
import { Phone } from 'lucide-vue-next';
</script>

<template>
  <button 
    aria-label="End Call"
    class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 active:scale-95 transition-all"
  >
    <Phone class="w-8 h-8 text-white transform -scale-y-100 rotate-[135deg]" />
  </button>
</template>

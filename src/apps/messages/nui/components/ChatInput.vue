<script setup lang="ts">
import { ref } from 'vue';
import { useTextareaAutosize } from '@vueuse/core';
import { Plus, Camera, Mic, Send, Keyboard } from 'lucide-vue-next';
import MediaOptionsPanel from './MediaOptionsPanel.vue';

const { textarea, input } = useTextareaAutosize({
  style: {
    maxHeight: '100px',
  }
});
const emit = defineEmits(['sendMessage']);

const isPanelOpen = ref(false);

const sendMessage = () => {
  if (input.value.trim()) {
    emit('sendMessage', input.value);
    input.value = '';
  }
};

const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value;
};
</script>

<template>
  <footer class="sticky bottom-0 z-20 bg-[#F5F2EBcc] backdrop-blur-lg pt-6 pb-6">
    <div class="flex items-end space-x-2 px-3 py-1.5">
      <button @click="togglePanel" class="w-8 h-8 flex items-center justify-center text-[#0A0A0A] mb-0.5 transition-transform duration-300">
        <Keyboard v-if="isPanelOpen" class="w-7 h-7" />
        <Plus v-else class="w-7 h-7" />
      </button>
      <div class="flex-1 bg-white rounded-2xl border border-gray-300/80 flex items-end px-3 py-1.5 min-h-[36px]">
        <textarea
          ref="textarea"
          v-model="input"
          placeholder=""
          class="flex-1 bg-transparent outline-none text-base text-[#0A0A0A] resize-none no-scrollbar"
          rows="1"
          @keydown.enter.exact.prevent="sendMessage"
          @focus="isPanelOpen = false"
        ></textarea>
        <button class="w-6 h-6 flex items-center justify-center text-[#0A0A0A] ml-2 self-end mb-0.5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 13H15" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 9H10" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 9H15" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C12.3523 3 12.6983 3.02139 13.0333 3.06211" stroke="#0A0A0A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 3.5C16 4.32843 16.6716 5 17.5 5C18.3284 5 19 4.32843 19 3.5C19 2.67157 18.3284 2 17.5 2C16.6716 2 16 2.67157 16 3.5Z" stroke="#0A0A0A" stroke-width="1.5"/>
          </svg>
        </button>
      </div>
      
      <template v-if="!input.trim()">
        <button class="w-8 h-8 flex items-center justify-center text-[#0A0A0A] mb-0.5 transition-opacity duration-200">
          <Camera class="w-6 h-6" />
        </button>
        <button class="w-8 h-8 flex items-center justify-center text-[#0A0A0A] mb-0.5 transition-opacity duration-200">
          <Mic class="w-6 h-6" />
        </button>
      </template>
      <template v-else>
        <button @click="sendMessage" class="w-8 h-8 flex items-center justify-center text-white bg-[#1DAB61] rounded-full mb-0.5 transition-all duration-200 flex-shrink-0">
          <Send class="w-4 h-4" />
        </button>
      </template>
    </div>
    
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[340px] opacity-100"
      leave-from-class="max-h-[340px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-if="isPanelOpen" class="overflow-hidden">
        <MediaOptionsPanel />
      </div>
    </transition>
  </footer>
</template>

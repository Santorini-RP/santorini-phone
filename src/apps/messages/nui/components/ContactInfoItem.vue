<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next';
import type { Component, PropType } from 'vue';

export interface ContactInfoItemProps {
  id: string;
  label: string;
  detail?: string;
  info?: string;
  icon?: Component;
  type?: 'default' | 'toggle' | 'create' | 'group' | 'action';
  style?: 'default' | 'action' | 'destructive';
  state?: any; // for v-model of toggle
  hasSeparator?: boolean;
}

const props = withDefaults(defineProps<ContactInfoItemProps>(), {
  type: 'default',
  style: 'default',
  hasSeparator: false,
});

const emit = defineEmits(['update:state']);

const toggleState = () => {
  if (props.type === 'toggle') {
    emit('update:state', !props.state);
  }
};
</script>

<template>
  <div class="relative">
    <div
      class="flex items-center p-3 space-x-4 cursor-pointer hover:bg-gray-50 transition-colors"
      :class="{ 'justify-center': style === 'action' || style === 'destructive' }"
    >
      <component v-if="icon" :is="icon" class="w-6 h-6 text-gray-500 flex-shrink-0" :class="{
        'p-1.5 bg-gray-100 rounded-full': type === 'create',
        'w-10 h-10 bg-gray-200 rounded-full p-1': type === 'group'
      }" />
      
      <div class="flex-1 min-w-0">
        <p class="text-base" :class="{
          'text-green-600': style === 'action',
          'text-red-500': style === 'destructive',
          'text-black': style === 'default'
        }">
          {{ label }}
        </p>
        <p v-if="info" class="text-xs text-gray-500 mt-0.5">{{ info }}</p>
        <p v-if="type === 'group' && detail" class="text-xs text-gray-500 mt-0.5 truncate">{{ detail }}</p>
      </div>

      <div v-if="type !== 'toggle' && style === 'default'" class="flex items-center space-x-2 text-gray-500">
        <span v-if="detail && type !== 'group'">{{ detail }}</span>
        <ChevronRight class="w-5 h-5 text-gray-400" />
      </div>

      <div v-if="type === 'toggle'">
        <button
          @click.stop="toggleState"
          class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5"
          :class="state ? 'bg-green-500' : 'bg-gray-300'"
        >
          <span
            class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
            :class="{ 'translate-x-5': state }"
          ></span>
        </button>
      </div>
    </div>
    <div v-if="hasSeparator" class="border-b border-gray-200 ml-14"></div>
  </div>
</template>

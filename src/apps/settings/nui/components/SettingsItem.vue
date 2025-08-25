<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSystemStore } from '@core/nui/store/system'
import { useSettingsStore } from '../store/app-store'
import { ChevronRight } from 'lucide-vue-next'

interface SettingItem {
  id: string;
  icon: any;
  color: string;
  title: string;
  subtitle?: string;
  type: 'toggle' | 'navigation';
  stateKey?: keyof typeof systemStore | keyof typeof useSettingsStore;
  action?: (() => void) | string;
}

const props = defineProps<{
  item: SettingItem
}>()

const systemStore = useSystemStore()
const settingsStore = useSettingsStore()
const router = useRouter()

const handleItemClick = () => {
  if (props.item.type === 'navigation' && typeof props.item.action === 'string' && props.item.action !== '#') {
    router.push(props.item.action);
  } else if (props.item.type === 'toggle' && typeof props.item.action === 'function') {
    props.item.action();
  }
}

const isToggleOn = computed(() => {
  if (props.item.type !== 'toggle' || !props.item.stateKey) return false
  
  // Check in both stores
  if (props.item.stateKey in systemStore) {
    return !!systemStore[props.item.stateKey as keyof typeof systemStore]
  }
  if (props.item.stateKey in settingsStore) {
    return !!settingsStore[props.item.stateKey as keyof typeof settingsStore]
  }
  
  return false
})
</script>

<template>
  <div
    @click="handleItemClick"
    class="flex items-center p-3 space-x-3"
    :class="{
      'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors': item.type === 'navigation'
    }"
  >
    <!-- Icon -->
    <div
      class="w-7 h-7 rounded-full flex items-center justify-center text-black dark:text-white"
      :class="item.id === 'profile' ? item.color : ''"
    >
      <div
        v-if="item.id !== 'profile'"
        class="w-full h-full rounded-md flex items-center justify-center text-white"
        :class="item.color"
      >
        <component :is="item.icon" class="w-5 h-5" />
      </div>
      <span v-else class="font-semibold text-sm">{{ item.icon }}</span>
    </div>

    <!-- Text -->
    <div class="flex-1">
      <p class="text-black dark:text-white">{{ item.title }}</p>
      <p v-if="item.subtitle" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ item.subtitle }}</p>
    </div>

    <!-- Action -->
    <div v-if="item.type === 'navigation'">
      <ChevronRight class="w-5 h-5 text-gray-400" />
    </div>
    <div v-else-if="item.type === 'toggle' && item.stateKey">
      <button
        @click.stop="handleItemClick"
        class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5 cursor-pointer"
        :class="isToggleOn ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'"
      >
        <span
          class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
          :class="{ 'translate-x-5': isToggleOn }"
        ></span>
      </button>
    </div>
  </div>
</template>

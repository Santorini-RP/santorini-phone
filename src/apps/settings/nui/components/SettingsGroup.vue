<script setup lang="ts">
import SettingsItem from './SettingsItem.vue'

interface SettingItem {
  id: string;
  icon: any;
  color: string;
  title: string;
  subtitle?: string;
  type: 'toggle' | 'navigation';
  stateKey?: any; // Simplified for prop definition
  action?: (() => void) | string;
}

defineProps<{
  group: SettingItem[]
}>()
</script>

<template>
  <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
    <template v-for="(item, index) in group" :key="item.id">
      <SettingsItem :item="item" />
      <div 
        v-if="index < group.length - 1" 
        class="border-b border-gray-200 dark:border-gray-700/60 ml-14"
      ></div>
    </template>
  </div>
</template>

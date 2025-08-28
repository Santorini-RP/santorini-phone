<script setup lang="ts">
import SettingsItem from './SettingsItem.vue';
import type { Component } from 'vue';

interface Setting {
  id: string;
  title: string;
  icon: Component;
  action?: () => void;
}

defineProps<{
  group: Setting[];
  isFirstGroup?: boolean;
}>();

const emit = defineEmits(['item-click']);

const onItemClick = (item: Setting) => {
  emit('item-click', item);
};
</script>

<template>
  <div class="bg-white rounded-xl mx-0">
    <template v-for="(item, index) in group" :key="item.id">
      <SettingsItem
        :item="item"
        :has-separator="!isFirstGroup && index < group.length - 1"
        @click="onItemClick(item)"
      />
    </template>
  </div>
</template>

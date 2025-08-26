<script setup lang="ts">
import ContactInfoItem from './ContactInfoItem.vue';
import type { ContactInfoItemProps } from './ContactInfoItem.vue';

defineProps<{
  items?: ContactInfoItemProps[];
}>();

const emit = defineEmits(['item-click']);

const onItemClick = (itemId: string) => {
  emit('item-click', itemId);
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm overflow-hidden">
    <slot>
      <template v-if="items">
        <ContactInfoItem
          v-for="(item, index) in items"
          :key="item.id"
          v-bind="item"
          :has-separator="index < items.length - 1"
          @click="onItemClick(item.id)"
        />
      </template>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWidgetManagerStore } from '../store/widgetManager';
import Widget from './Widget.vue';

const props = defineProps<{
  appId: string;
}>();

const widgetManager = useWidgetManagerStore();
const widgets = computed(() => widgetManager.getWidgetsByAppId(props.appId));
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <Widget 
      v-for="widget in widgets" 
      :key="widget.id" 
      :widget="widget" 
    />
  </div>
</template>

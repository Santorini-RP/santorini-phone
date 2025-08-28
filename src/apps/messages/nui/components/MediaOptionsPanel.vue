<script setup lang="ts">
import { ref } from 'vue';
import MediaActionItem from './MediaActionItem.vue';
import { Image, Camera, MapPin, UserSquare, FileText, BarChart3, CalendarDays } from 'lucide-vue-next';

const mediaActions = ref([
  { id: 'photo', icon: Image, label: 'Photo', color: 'text-[#007BFC]' },
  { id: 'camera', icon: Camera, label: 'Camera', color: 'text-[#3B3B3B]' },
  { id: 'location', icon: MapPin, label: 'Location', color: 'text-[#06CF9C]' },
  { id: 'contact', icon: UserSquare, label: 'Contact', color: 'text-[#616066]' },
  { id: 'document', icon: FileText, label: 'Document', color: 'text-[#009DE2]' },
  { id: 'poll', icon: BarChart3, label: 'Poll', color: 'text-[#FFB938]' },
  { id: 'event', icon: CalendarDays, label: 'Event', color: 'text-[#E90039]' },
]);

const handleActionClick = (actionId: string) => {
  alert(`Action clicked: ${actionId}`);
};
</script>

<template>
  <div class="grid grid-cols-4 gap-y-6 gap-x-4 p-8 pt-6">
    <MediaActionItem
      v-for="action in mediaActions"
      :key="action.id"
      :icon="action.icon"
      :label="action.label"
      :icon-color="action.color"
      @click="handleActionClick(action.id)"
    />
  </div>
</template>

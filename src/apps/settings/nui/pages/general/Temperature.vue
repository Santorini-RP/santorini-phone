<script setup lang="ts">
import { computed } from 'vue';
import { useSystemStore } from '@core/nui/store/system';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { Check } from 'lucide-vue-next';

const systemStore = useSystemStore();

type TemperatureUnit = 'Celsius' | 'Fahrenheit';

const availableUnits: TemperatureUnit[] = ['Celsius', 'Fahrenheit'];

const selectUnit = (unit: TemperatureUnit) => {
  systemStore.setTemperatureUnit(unit === 'Celsius' ? 'C' : 'F');
};

const isSelected = (unit: TemperatureUnit) => {
  const storeUnit = systemStore.temperatureUnit;
  return (unit === 'Celsius' && storeUnit === 'C') || (unit === 'Fahrenheit' && storeUnit === 'F');
};
</script>

<template>
  <PageLayout page-title="Temperature" previous-title="Settings">
    <div class="p-4">
      <div class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
        <div
          v-for="(unit, index) in availableUnits"
          :key="unit"
          @click="selectUnit(unit)"
          class="flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          :class="{ 'border-b border-gray-200 dark:border-gray-700/60': index < availableUnits.length - 1 }"
        >
          <div class="w-6">
            <Check v-if="isSelected(unit)" class="w-5 h-5 text-blue-500" />
          </div>
          <p class="text-black dark:text-white">{{ unit }}</p>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

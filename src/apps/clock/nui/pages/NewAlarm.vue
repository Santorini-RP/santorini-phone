<script setup lang="ts">
import { ref } from 'vue';
import { useClockStore } from '../store/app-store';
import { useRouter } from 'vue-router';
import AlarmTimePicker from '../components/AlarmTimePicker.vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const clockStore = useClockStore();
const router = useRouter();

const newAlarm = ref({
  time: '08:00',
  label: 'Alarm',
  sound: true,
  snooze: true,
});

const timePickerModel = ref({ hours: 8, minutes: 0 });

const handleSave = () => {
  const timeString = `${timePickerModel.value.hours.toString().padStart(2, '0')}:${timePickerModel.value.minutes.toString().padStart(2, '0')}`;
  clockStore.addAlarm({
    time: timeString,
    label: newAlarm.value.label,
    sound: newAlarm.value.sound,
    snooze: newAlarm.value.snooze,
  });
  router.back();
};

const handleCancel = () => {
  router.back();
};
</script>

<template>
  <div class="h-full flex flex-col bg-gray-100 dark:bg-ios-dark-bg text-black dark:text-white">
    <!-- Header -->
    <div class="sticky top-0 z-20 pt-10 bg-gray-100/80 dark:bg-ios-dark-bg/80 backdrop-blur-md">
      <div class="w-full flex items-center justify-between px-2 pb-2 relative">
        <button @click="handleCancel" class="flex items-center text-orange-500 text-lg">
          <ChevronLeft class="w-8 h-8 -ml-2" />
          <span class="-ml-2">Alarms</span>
        </button>
        <h2 class="absolute left-1/2 -translate-x-1/2 font-semibold whitespace-nowrap text-lg">
          New Alarm
        </h2>
        <button @click="handleSave" class="text-lg text-orange-500 font-semibold px-2">Save</button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto">
      <div class="pt-8">
        <AlarmTimePicker 
          :modelValue="timePickerModel"
          @update:modelValue="timePickerModel = $event"
        />
      </div>

      <div class="px-4 mt-8">
        <div class="bg-white dark:bg-ios-dark-card rounded-xl">
          <!-- Label -->
          <div class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700/60 cursor-pointer">
            <span class="text-lg">Label</span>
            <div class="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <span>{{ newAlarm.label }}</span>
              <ChevronRight class="w-5 h-5" />
            </div>
          </div>
          <!-- Sound -->
          <div class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700/60">
            <span class="text-lg">Sound</span>
            <button
              @click="newAlarm.sound = !newAlarm.sound"
              class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5"
              :class="newAlarm.sound ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'"
            >
              <span
                class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
                :class="{ 'translate-x-5': newAlarm.sound }"
              ></span>
            </button>
          </div>
          <!-- Snooze -->
          <div class="flex items-center justify-between p-3">
            <span class="text-lg">Snooze</span>
            <button
              @click="newAlarm.snooze = !newAlarm.snooze"
              class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5"
              :class="newAlarm.snooze ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'"
            >
              <span
                class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
                :class="{ 'translate-x-5': newAlarm.snooze }"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

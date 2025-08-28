<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useClockStore } from '../store/app-store';
import { useRouter } from 'vue-router';
import AlarmTimePicker from '../components/AlarmTimePicker.vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps<{
  alarmId: string;
}>();

const clockStore = useClockStore();
const router = useRouter();

const editingAlarm = computed(() => clockStore.editingAlarm);

onMounted(() => {
  clockStore.loadAlarmForEditing(Number(props.alarmId));
});

const handleSave = () => {
  if (editingAlarm.value) {
    const [h, m] = editingAlarm.value.time.split(':');
    editingAlarm.value.time = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
    clockStore.updateAlarm();
  }
  router.back();
};

const handleCancel = () => {
  clockStore.clearEditingAlarm();
  router.back();
};

const handleDelete = async () => {
  const result = await clockStore.deleteAlarm(Number(props.alarmId));
  if (result === 'delete') {
    router.push('/app/clock');
  }
};

const timePickerModel = computed({
  get() {
    if (!editingAlarm.value) return { hours: 0, minutes: 0 };
    const [hours, minutes] = editingAlarm.value.time.split(':').map(Number);
    return { hours, minutes };
  },
  set(newValue) {
    if (editingAlarm.value) {
      editingAlarm.value.time = `${newValue.hours.toString().padStart(2, '0')}:${newValue.minutes.toString().padStart(2, '0')}`;
    }
  }
});
</script>

<template>
  <div v-if="editingAlarm" class="h-full flex flex-col bg-gray-100 dark:bg-ios-dark-bg text-black dark:text-white">
    <!-- Header -->
    <div class="sticky top-0 z-20 pt-10 bg-gray-100/80 dark:bg-ios-dark-bg/80 backdrop-blur-md">
      <div class="w-full flex items-center justify-between px-2 pb-2 relative">
        <button @click="handleCancel" class="flex items-center text-orange-500 text-lg">
          <ChevronLeft class="w-8 h-8 -ml-2" />
          <span class="-ml-2">Alarms</span>
        </button>
        <h2 class="absolute left-1/2 -translate-x-1/2 font-semibold whitespace-nowrap text-lg">
          Edit Alarm
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

      <div class="px-4 mt-8 space-y-4">
        <div class="bg-white dark:bg-ios-dark-card rounded-xl">
          <!-- Label -->
          <div class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700/60 cursor-pointer">
            <span class="text-lg">Label</span>
            <div class="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <input type="text" v-model="editingAlarm.label" class="bg-transparent text-right outline-none w-32" />
              <ChevronRight class="w-5 h-5" />
            </div>
          </div>
          <!-- Sound -->
          <div class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700/60">
            <span class="text-lg">Sound</span>
            <button
              @click="editingAlarm.sound = !editingAlarm.sound"
              class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5"
              :class="editingAlarm.sound ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'"
            >
              <span
                class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
                :class="{ 'translate-x-5': editingAlarm.sound }"
              ></span>
            </button>
          </div>
          <!-- Snooze -->
          <div class="flex items-center justify-between p-3">
            <span class="text-lg">Snooze</span>
            <button
              @click="editingAlarm.snooze = !editingAlarm.snooze"
              class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5"
              :class="editingAlarm.snooze ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'"
            >
              <span
                class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
                :class="{ 'translate-x-5': editingAlarm.snooze }"
              ></span>
            </button>
          </div>
        </div>

        <!-- Delete Button -->
        <div class="bg-white dark:bg-ios-dark-card rounded-xl">
            <button @click="handleDelete" class="w-full p-3 text-red-500 text-lg text-center">
                Delete Alarm
            </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="h-full flex items-center justify-center text-gray-500">
    Loading alarm...
  </div>
</template>

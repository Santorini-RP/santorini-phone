<script setup lang="ts">
import { useModalStore } from '@core/nui/store/modal';
import { useServicesStore } from '../store/app-store';
import type { Employee } from '../store/app-store';

const props = defineProps<{
  employee: Employee;
  isHireButton?: boolean;
}>();

const modalStore = useModalStore();
const servicesStore = useServicesStore();

const hireEmployee = async () => {
  const result = await modalStore.showModal({
    title: 'Hire Employee',
    message: 'Enter the Citizen ID of the person you want to hire.',
    inputs: [
      {
        id: 'citizenId',
        value: '',
        placeholder: 'Citizen ID',
        type: 'number',
        required: true,
      }
    ],
    buttons: [
      { id: 'cancel', text: 'Cancel', style: 'cancel' },
      { id: 'proceed', text: 'Hire', style: 'default' },
    ]
  });

  if (result.buttonId === 'proceed' && result.inputValues?.citizenId) {
    servicesStore.hireEmployee(result.inputValues.citizenId);
  }
};

const handleClick = () => {
  if (props.isHireButton) {
    hireEmployee();
  } else {
    // Placeholder for clicking an existing employee
    alert(`Clicked on ${props.employee.name}`);
  }
};
</script>

<template>
  <div
    @click="handleClick"
    class="flex items-center p-3 space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
  >
    <!-- Icon -->
    <div
      class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
      :class="isHireButton ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'"
    >
      <component
        :is="employee.icon"
        class="w-6 h-6"
        :class="isHireButton ? 'text-white' : 'text-gray-500 dark:text-gray-400'"
      />
    </div>

    <!-- Text -->
    <div class="flex-1 min-w-0">
      <p class="font-medium text-black dark:text-white">{{ employee.name }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ employee.rank }}</p>
    </div>

    <!-- Action / Status -->
    <div v-if="isHireButton" class="text-gray-400 text-2xl font-light">
      +
    </div>
    <div v-else>
      <div
        class="w-2.5 h-2.5 rounded-full"
        :class="employee.status === 'online' ? 'bg-green-500' : 'bg-red-500'"
      ></div>
    </div>
  </div>
</template>

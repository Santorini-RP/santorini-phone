<script setup lang="ts">
import { markRaw } from 'vue';
import { useServicesStore } from '../store/app-store';
import { useModalStore } from '@core/nui/store/modal';
import PageLayout from '@core/nui/components/PageLayout.vue';
import SettingsRow from '../components/SettingsRow.vue';
import EmployeeListItem from '../components/EmployeeListItem.vue';
import { Timer, Phone, Wallet } from 'lucide-vue-next';

const servicesStore = useServicesStore();
const modalStore = useModalStore();

const handleDeposit = async () => {
  const result = await modalStore.showModal({
    title: 'Deposit',
    message: 'Deposit money into the company account',
    inputs: [{ id: 'amount', value: '', placeholder: 'Amount', type: 'number', required: true }],
    buttons: [
      { id: 'cancel', text: 'Cancel', style: 'cancel' },
      { id: 'proceed', text: 'Proceed', style: 'default' },
    ]
  });

  if (result.buttonId === 'proceed' && result.inputValues?.amount) {
    const amount = parseInt(result.inputValues.amount, 10);
    if (!isNaN(amount) && amount > 0) {
      servicesStore.depositToCompany(amount);
    } else {
      alert('Invalid amount entered.');
    }
  }
};

const handleWithdraw = async () => {
  const result = await modalStore.showModal({
    title: 'Withdraw',
    message: 'Withdraw money from the company account',
    inputs: [{ id: 'amount', value: '', placeholder: 'Amount', type: 'number', required: true }],
    buttons: [
      { id: 'cancel', text: 'Cancel', style: 'cancel' },
      { id: 'proceed', text: 'Proceed', style: 'default' },
    ]
  });

  if (result.buttonId === 'proceed' && result.inputValues?.amount) {
    const amount = parseInt(result.inputValues.amount, 10);
    if (!isNaN(amount) && amount > 0) {
      const success = servicesStore.withdrawFromCompany(amount);
      if (!success) {
        alert('Insufficient funds.');
      }
    } else {
      alert('Invalid amount entered.');
    }
  }
};
</script>

<template>
  <PageLayout page-title="Actions">
    <div class="px-4 -mt-2 space-y-6">
      <!-- Settings Section -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-2 mb-2">Settings</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-xl overflow-hidden">
          <SettingsRow
            :icon="markRaw(Timer)"
            icon-bg-color="bg-orange-400"
            title="Duty"
            subtitle="Toggle your duty status"
          >
            <template #action>
              <button
                @click="servicesStore.toggleDuty()"
                class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5"
                :class="servicesStore.isOnDuty ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'"
              >
                <span
                  class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
                  :class="{ 'translate-x-5': servicesStore.isOnDuty }"
                ></span>
              </button>
            </template>
          </SettingsRow>
          <transition name="slide-fade">
            <div v-if="servicesStore.isOnDuty" class="overflow-hidden">
               <div class="border-t border-gray-200 dark:border-gray-700/60"></div>
               <SettingsRow
                 :icon="markRaw(Phone)"
                 icon-bg-color="bg-green-500"
                 title="Job Calls"
                 subtitle="Disable receiving calls from customers."
               >
                 <template #action>
                   <button
                    @click="servicesStore.toggleJobCalls()"
                    class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5"
                    :class="servicesStore.jobCallsEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'"
                  >
                    <span
                      class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
                      :class="{ 'translate-x-5': servicesStore.jobCallsEnabled }"
                    ></span>
                  </button>
                 </template>
               </SettingsRow>
            </div>
          </transition>
        </div>
      </div>

      <!-- Actions Section -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-2 mb-2">Actions</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-xl">
          <div class="flex items-center p-3 space-x-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-green-500">
              <Wallet class="w-6 h-6 text-white" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-black dark:text-white">Balance</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 truncate">Current balance of the company</p>
            </div>
            <span class="text-lg font-semibold text-black dark:text-white">{{ servicesStore.formattedCompanyBalance }}</span>
          </div>
          <div class="border-t border-gray-200 dark:border-gray-700/60 flex">
            <button @click="handleDeposit" class="flex-1 py-3 text-blue-500 font-medium text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              Deposit
            </button>
            <div class="w-px bg-gray-200 dark:bg-gray-700/60"></div>
            <button @click="handleWithdraw" class="flex-1 py-3 text-blue-500 font-medium text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              Withdraw
            </button>
          </div>
        </div>
      </div>

      <!-- Manage Employees Section -->
      <div>
        <h3 class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold px-2 mb-2">Manage Employees</h3>
        <div class="bg-white dark:bg-ios-dark-card rounded-xl divide-y divide-gray-200 dark:divide-gray-700/60 overflow-hidden">
          <EmployeeListItem
            :employee="servicesStore.hireEmployeeItem"
            :is-hire-button="true"
          />
          <EmployeeListItem
            v-for="employee in servicesStore.employees"
            :key="employee.id"
            :employee="employee"
          />
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
  max-height: 0;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 100px; /* Should be larger than the element's height */
}
</style>

<script setup lang="ts">
import { useWalletStore } from '../store/app-store';
import PageLayout from '@core/nui/components/PageLayout.vue';

const walletStore = useWalletStore();

const formatCurrency = (amount: number) => {
  const sign = amount > 0 ? '+' : '';
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(amount));
  return `${sign}${formatted}`;
}
</script>

<template>
  <PageLayout page-title="Transactions" previous-title="Home">
    <div class="p-4 space-y-6">
      <div v-for="group in walletStore.groupedTransactions" :key="group.dateLabel" class="space-y-2">
        <!-- Date Header -->
        <div class="flex justify-between items-center px-2">
          <h2 class="text-lg font-bold text-black">{{ group.dateLabel }}</h2>
          <span class="text-sm text-gray-500">{{ formatCurrency(group.total) }}</span>
        </div>

        <!-- Transactions Card -->
        <div class="bg-white rounded-2xl">
          <div 
            v-for="(transaction, index) in group.transactions" 
            :key="transaction.id"
            class="flex items-center p-3"
            :class="{ 'border-b border-gray-200/80': index < group.transactions.length - 1 }"
          >
            <div class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold mr-4" :class="transaction.iconBg">
              <img v-if="transaction.iconUrl" :src="transaction.iconUrl" :alt="transaction.name" class="w-full h-full object-contain p-1.5" />
              <span v-else>{{ transaction.initials }}</span>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-black">{{ transaction.name }}</p>
              <p class="text-sm text-gray-500">{{ transaction.time }}</p>
            </div>
            <span 
              class="font-semibold"
              :class="transaction.type === 'debit' ? 'text-red-500' : 'text-green-500'"
            >
              {{ walletStore.formatTransactionAmount(transaction.amount, transaction.type) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

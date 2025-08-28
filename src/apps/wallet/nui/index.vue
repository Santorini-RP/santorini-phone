<script setup lang="ts">
import { useWalletStore } from './store/app-store';
import PageLayout from '@core/nui/components/PageLayout.vue';
import { useRouter } from 'vue-router';

const walletStore = useWalletStore();
const router = useRouter();

const goToSendPage = () => {
  router.push('/app/wallet/send');
};
</script>

<template>
  <PageLayout page-title="Wallet">
    <div class="p-4 space-y-6">
      <!-- Debit Card -->
      <div class="aspect-[1.58/1] rounded-2xl p-6 flex flex-col justify-between text-white bg-gradient-to-br from-indigo-600 via-purple-600 to-red-500">
        <div class="flex justify-end">
          <div class="text-right">
            <p class="font-bold text-xl">LB</p>
            <p class="text-xs -mt-1 opacity-80">DEBIT</p>
          </div>
        </div>
        <div>
          <p class="font-mono text-xl tracking-widest">···· ···· ···· {{ walletStore.cardDetails.last4 }}</p>
          <p class="text-right text-sm opacity-80 mt-1">VALID THRU {{ walletStore.cardDetails.expiry }}</p>
        </div>
      </div>

      <!-- Balance Card -->
      <div class="bg-white rounded-2xl p-4 flex justify-between items-center">
        <div>
          <p class="text-gray-500">Balance</p>
          <p class="text-3xl font-bold text-black">{{ walletStore.formattedBalance }}</p>
        </div>
        <button @click="goToSendPage" class="bg-black text-white rounded-full px-6 py-2 font-semibold hover:bg-gray-800 transition-colors">
          Send
        </button>
      </div>

      <!-- Transactions List -->
      <div>
        <div class="flex justify-between items-center mb-2 px-2">
          <h2 class="text-lg font-bold text-black">Latest Transactions</h2>
          <button @click="router.push('/app/wallet/transactions')" class="text-sm text-blue-500 font-medium">All Transactions ></button>
        </div>
        <div class="bg-white rounded-2xl">
          <div 
            v-for="(transaction, index) in walletStore.transactions.slice(0, 3)" 
            :key="transaction.id"
            class="flex items-center p-3"
            :class="{ 'border-b border-gray-200/80': index < walletStore.transactions.slice(0, 3).length - 1 }"
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

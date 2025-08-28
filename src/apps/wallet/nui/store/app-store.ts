import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Transaction {
  id: number;
  name: string;
  time: string; // This will now represent date or time
  amount: number;
  type: 'credit' | 'debit';
  iconUrl?: string;
  initials?: string;
  iconBg?: string;
  date: Date; // Add a proper date object for sorting and grouping
}

export const useWalletStore = defineStore('wallet', () => {
  const balance = ref(10230);
  const cardDetails = ref({
    last4: '5428',
    expiry: '12/28',
  });

  const transactions = ref<Transaction[]>([
    // Today
    { id: 1, name: 'LB', time: '05:05', amount: -99, type: 'debit', iconUrl: '/src/apps/wallet/nui/assets/lb-logo.png', iconBg: 'bg-gray-800', date: new Date() },
    { id: 2, name: 'Burgershot', time: '01:05', amount: -24.45, type: 'debit', iconUrl: '/src/apps/wallet/nui/assets/burgershot-logo.png', date: new Date() },
    // Yesterday
    { id: 3, name: 'Breze', time: '19:05', amount: 10, type: 'credit', initials: 'B', iconBg: 'bg-gray-300', date: new Date(new Date().setDate(new Date().getDate() - 1)) },
    { id: 4, name: 'Breze', time: '27 Aug', amount: -22, type: 'debit', initials: 'B', iconBg: 'bg-gray-300', date: new Date(new Date().setDate(new Date().getDate() - 1)) },
    // Aug 26
    { id: 5, name: 'Breze', time: '26 Aug', amount: -99, type: 'debit', initials: 'B', iconBg: 'bg-gray-300', date: new Date(new Date().setDate(new Date().getDate() - 2)) },
     // Aug 24
    { id: 6, name: 'Salary', time: '24 Aug', amount: 3400, type: 'credit', initials: 'S', iconBg: 'bg-green-500', date: new Date(new Date().setDate(new Date().getDate() - 4)) },
    { id: 7, name: 'Invoice #1234', time: '24 Aug', amount: -700, type: 'debit', initials: 'I', iconBg: 'bg-red-500', date: new Date(new Date().setDate(new Date().getDate() - 4)) },
  ]);

  const formattedBalance = computed(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(balance.value).replace(',', '.');
  });

  const formatTransactionAmount = (amount: number, type: 'credit' | 'debit') => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Math.abs(amount));
    
    return type === 'debit' ? `-${formatted}` : formatted;
  }

  const groupedTransactions = computed(() => {
    const groups: Record<string, { dateLabel: string; total: number; transactions: Transaction[] }> = {};

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isSameDay = (d1: Date, d2: Date) => 
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    // Sort transactions by date descending
    const sortedTransactions = [...transactions.value].sort((a, b) => b.date.getTime() - a.date.getTime());

    sortedTransactions.forEach(tx => {
      let dateKey: string;
      let dateLabel: string;

      if (isSameDay(tx.date, today)) {
        dateKey = 'Today';
        dateLabel = 'Today';
      } else if (isSameDay(tx.date, yesterday)) {
        dateKey = 'Yesterday';
        dateLabel = 'Yesterday';
      } else {
        dateKey = tx.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // e.g., Aug 26
        dateLabel = dateKey;
      }
      
      if (!groups[dateKey]) {
        groups[dateKey] = { dateLabel, total: 0, transactions: [] };
      }
      
      const transactionAmount = tx.type === 'credit' ? tx.amount : -Math.abs(tx.amount);
      groups[dateKey].transactions.push(tx);
      groups[dateKey].total += transactionAmount;
    });

    return Object.values(groups);
  });

  const processTransaction = (amount: number, recipient: string) => {
    if (amount <= 0 || amount > balance.value) {
      console.error("Invalid transaction amount");
      return;
    }

    balance.value -= amount;

    const newTransaction: Transaction = {
      id: Date.now(),
      name: `To: ${recipient}`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      amount: -amount,
      type: 'debit',
      initials: '?',
      iconBg: 'bg-gray-400',
      date: new Date(),
    };
    transactions.value.unshift(newTransaction);
  };

  return {
    balance,
    cardDetails,
    transactions,
    formattedBalance,
    formatTransactionAmount,
    processTransaction,
    groupedTransactions,
  }
})

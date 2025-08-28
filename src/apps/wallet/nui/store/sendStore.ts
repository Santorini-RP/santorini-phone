import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useWalletStore } from './app-store';

export const useSendStore = defineStore('wallet-send', () => {
  // --- Phone Number State ---
  const phoneNumber = ref('');

  const formattedPhoneNumber = computed(() => {
    const digits = phoneNumber.value;
    if (!digits) return '';

    const areaCode = digits.slice(0, 3);
    const middle = digits.slice(3, 6);
    const last = digits.slice(6, 10);

    if (digits.length > 6) {
      return `(${areaCode}) ${middle}-${last}`;
    } else if (digits.length > 3) {
      return `(${areaCode}) ${middle}`;
    } else if (digits.length > 0) {
      return `(${areaCode}`;
    }
    return '';
  });

  const isNextEnabled = computed(() => phoneNumber.value.length === 10);

  const appendDigit = (digit: string) => {
    if (phoneNumber.value.length < 10) {
      phoneNumber.value += digit;
    }
  };

  const deleteDigit = () => {
    phoneNumber.value = phoneNumber.value.slice(0, -1);
  };

  const clearNumber = () => {
    phoneNumber.value = '';
  };

  // --- Amount State ---
  const amountString = ref('');
  const walletStore = useWalletStore();

  const amountNumber = computed(() => {
    return parseInt(amountString.value || '0', 10);
  });

  const formattedAmount = computed(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amountNumber.value);
  });

  const newBalance = computed(() => {
    return walletStore.balance - amountNumber.value;
  });

  const formattedNewBalance = computed(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(newBalance.value);
  });

  const isAmountNextEnabled = computed(() => amountNumber.value > 0 && amountNumber.value <= walletStore.balance);

  const appendAmountDigit = (digit: string) => {
    if (amountString.value.length < 7) { // Limit to 7 digits
      amountString.value += digit;
    }
  };

  const deleteAmountDigit = () => {
    amountString.value = amountString.value.slice(0, -1);
  };

  const clearAmount = () => {
    amountString.value = '';
  };

  const reset = () => {
    phoneNumber.value = '';
    amountString.value = '';
  };

  return {
    // Phone
    phoneNumber,
    formattedPhoneNumber,
    isNextEnabled,
    appendDigit,
    deleteDigit,
    clearNumber,

    // Amount
    amountString,
    formattedAmount,
    newBalance,
    formattedNewBalance,
    isAmountNextEnabled,
    appendAmountDigit,
    deleteAmountDigit,
    clearAmount,
    
    // Control
    reset,
  };
});

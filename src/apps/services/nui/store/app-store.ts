import { defineStore } from 'pinia'
import { ref, computed, markRaw } from 'vue'
import { Shield, HeartPulse, Wrench, CarTaxiFront, Timer, Phone, Wallet, Users, User } from 'lucide-vue-next'

export interface Service {
  id: number;
  name: string;
  location: string;
  icon: any;
  iconBgColor: string;
  isOpen: boolean;
  actions: {
    send: boolean;
    call: boolean;
    message: boolean;
  }
}

export interface ServiceMessage {
  id: number;
  sender: string;
  preview: string;
  time: string;
  icon: any; // lucide icon
  iconBgColor: string;
}

export interface ServiceJobMessage {
  id: number;
  sender: string; // This will be the phone number
  preview: string;
  time: string;
}

export interface Employee {
  id: number;
  name: string;
  rank: string;
  status: 'online' | 'offline';
  icon: any;
}

export const useServicesStore = defineStore('services', () => {
  const services = ref<Service[]>([
    {
      id: 1,
      name: 'Police',
      location: 'Mission Row',
      icon: markRaw(Shield),
      iconBgColor: 'bg-yellow-400',
      isOpen: true,
      actions: { send: true, call: true, message: true }
    },
    {
      id: 2,
      name: 'Ambulance',
      location: 'Pillbox',
      icon: markRaw(HeartPulse),
      iconBgColor: 'bg-red-500',
      isOpen: true,
      actions: { send: true, call: true, message: true }
    },
    {
      id: 3,
      name: 'Mechanic',
      location: 'LS Customs',
      icon: markRaw(Wrench),
      iconBgColor: 'bg-yellow-500',
      isOpen: false,
      actions: { send: true, call: false, message: true }
    },
    {
      id: 4,
      name: 'Taxi',
      location: 'Taxi HQ',
      icon: markRaw(CarTaxiFront),
      iconBgColor: 'bg-green-500',
      isOpen: true,
      actions: { send: true, call: false, message: true }
    }
  ])

  const messages = ref<ServiceMessage[]>([
    {
      id: 1,
      sender: 'Police',
      preview: 'Is anyone available to help me?',
      time: '09:40',
      icon: markRaw(Shield),
      iconBgColor: 'bg-yellow-400'
    }
  ]);

  const jobMessages = ref<ServiceJobMessage[]>([
    {
      id: 1,
      sender: '(480) 294-0940',
      preview: 'Hello, how can i help you?',
      time: '07:40',
    },
    {
      id: 2,
      sender: '(205) 144-0412',
      preview: 'Hey, i need backup at the bank',
      time: '26 Aug',
    }
  ]);

  // New state for Actions page
  const isOnDuty = ref(true);
  const jobCallsEnabled = ref(true);
  const companyBalance = ref(1000000);
  const employees = ref<Employee[]>([
    { id: 1, name: 'Breze', rank: 'Officer', status: 'online', icon: markRaw(User) },
    { id: 2, name: 'Loaf Scripts', rank: 'Sergeant', status: 'online', icon: markRaw(User) },
    { id: 3, name: 'Kash', rank: 'Lieutenant', status: 'offline', icon: markRaw(User) },
  ]);

  const hireEmployeeItem = ref({
    id: 0,
    name: 'Hire',
    rank: 'Hire a new employee',
    status: 'online', // not relevant here
    icon: markRaw(Users)
  });

  // New computed for balance
  const formattedCompanyBalance = computed(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(companyBalance.value);
  });

  // New actions
  const toggleDuty = () => {
    isOnDuty.value = !isOnDuty.value;
  };

  const toggleJobCalls = () => {
    jobCallsEnabled.value = !jobCallsEnabled.value;
  };

  const hireEmployee = (citizenId: string) => {
    const id = parseInt(citizenId);
    if (isNaN(id)) return;
    employees.value.push({
        id: Date.now(),
        name: `Citizen ${id}`,
        rank: 'Recruit',
        status: 'online',
        icon: markRaw(User)
    });
  };

  const depositToCompany = (amount: number) => {
    if (amount > 0) {
      companyBalance.value += amount;
    }
  };

  const withdrawFromCompany = (amount: number): boolean => {
    if (amount > 0 && amount <= companyBalance.value) {
      companyBalance.value -= amount;
      return true;
    }
    return false;
  };

  return {
    services,
    messages,
    jobMessages,
    isOnDuty,
    jobCallsEnabled,
    companyBalance,
    employees,
    hireEmployeeItem,
    formattedCompanyBalance,
    toggleDuty,
    toggleJobCalls,
    hireEmployee,
    depositToCompany,
    withdrawFromCompany,
  }
})

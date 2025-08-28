<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGarageStore } from '../store/app-store';
import { useModalStore } from '@core/nui/store/modal';
import { ChevronRight, X, Send, Lock, Filter, Wrench, Car } from 'lucide-vue-next';

const props = defineProps<{
  carId: string;
}>();

const router = useRouter();
const garageStore = useGarageStore();
const modalStore = useModalStore();

const car = computed(() => {
  return garageStore.getCarById(Number(props.carId));
});

const goBack = () => {
  router.back();
};

const handleLockToggle = async () => {
  if (!car.value) return;
  const action = car.value.isLocked ? 'Unlock' : 'Lock';
  const result = await modalStore.showModal({
    title: `${action} vehicle`,
    message: `Do you want to ${action.toLowerCase()} your vehicle?`,
    buttons: [
      { id: 'cancel', text: 'Cancel', style: 'cancel' },
      { id: 'proceed', text: 'Proceed', style: 'default' },
    ]
  });

  if (result.buttonId === 'proceed') {
    garageStore.toggleLockStatus(car.value.id);
  }
};

const handleEngineToggle = async () => {
  if (!car.value) return;
  const action = car.value.isEngineOn ? 'Turn off' : 'Turn on';
  const result = await modalStore.showModal({
    title: `${action} engine`,
    message: `Do you want to ${action.toLowerCase()} the engine?`,
    buttons: [
      { id: 'cancel', text: 'Cancel', style: 'cancel' },
      { id: 'proceed', text: 'Proceed', style: 'default' },
    ]
  });

  if (result.buttonId === 'proceed') {
    garageStore.toggleEngineStatus(car.value.id);
  }
};

const handleLocationClick = async () => {
  const result = await modalStore.showModal({
    title: 'Share Location',
    message: 'Do you want to share the vehicle location?',
    buttons: [
      { id: 'cancel', text: 'Cancel', style: 'cancel' },
      { id: 'proceed', text: 'Proceed', style: 'default' },
    ]
  });

  if (result.buttonId === 'proceed') {
    alert('Location shared!'); // Placeholder action
  }
};
</script>

<template>
  <div v-if="car" class="h-full w-full text-white overflow-y-auto no-scrollbar relative font-sans">
    <!-- Background -->
    <div 
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/src/core/nui/assets/images/backgrounds/w8.png');"
    ></div>
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col pt-20 pb-8 px-6 space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">{{ car.name }}</h1>
        <button @click="goBack" class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Actions Section -->
      <div class="space-y-3">
        <div class="flex items-center space-x-2 text-lg font-semibold text-gray-300">
          <span>Actions</span>
          <ChevronRight class="w-5 h-5" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <!-- Location Button -->
          <button 
            @click="handleLocationClick"
            class="bg-white/10 backdrop-blur-lg rounded-2xl p-4 flex flex-col justify-between aspect-square border border-white/10 shadow-lg text-left hover:bg-white/20 active:scale-95 transition-all duration-150"
          >
            <Send class="w-7 h-7 text-cyan-300" />
            <div>
              <p class="font-semibold text-base">Location</p>
              <p class="text-sm text-gray-300 truncate">{{ car.location }}</p>
            </div>
          </button>
          
          <!-- Status Button -->
          <button 
            @click="handleLockToggle"
            class="backdrop-blur-lg rounded-2xl p-4 flex flex-col justify-between aspect-square border shadow-lg text-left hover:brightness-110 active:scale-95 transition-all duration-150"
            :class="car.isLocked 
              ? 'bg-gray-200 text-black border-gray-300' 
              : 'bg-white/10 text-white border-white/10'"
          >
            <Lock class="w-7 h-7" :class="car.isLocked ? 'text-cyan-500' : 'text-cyan-300'" />
            <div>
              <p class="font-semibold text-base">Status</p>
              <p class="text-sm" :class="car.isLocked ? 'text-gray-600' : 'text-gray-300'">{{ car.isLocked ? 'Locked' : 'Unlocked' }}</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Statistics Section -->
      <div class="space-y-3">
        <div class="flex items-center space-x-2 text-lg font-semibold text-gray-300">
          <span>Statistics</span>
          <ChevronRight class="w-5 h-5" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <!-- Fuel (Display only) -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-4 flex items-start space-x-3 border border-white/10 shadow-lg">
            <Filter class="w-7 h-7 text-cyan-300 mt-1" />
            <div>
              <p class="font-semibold text-base">Fuel</p>
              <p class="text-sm text-gray-300">{{ car.fuel }}%</p>
            </div>
          </div>
          
          <!-- Engine Button -->
          <button 
            @click="handleEngineToggle"
            class="backdrop-blur-lg rounded-2xl p-4 flex items-start space-x-3 border shadow-lg text-left hover:brightness-110 active:scale-95 transition-all duration-150"
            :class="car.isEngineOn 
              ? 'bg-red-400/90 text-white border-red-400/50' 
              : 'bg-white/10 text-white border-white/10'"
          >
            <Wrench class="w-7 h-7 mt-1" :class="car.isEngineOn ? 'text-white' : 'text-cyan-300'" />
            <div>
              <p class="font-semibold text-base">Engine</p>
              <p class="text-sm" :class="car.isEngineOn ? 'text-red-100' : 'text-gray-300'">{{ car.engine }}%</p>
            </div>
          </button>

          <!-- Body (Display only) -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-4 flex items-start space-x-3 border border-white/10 shadow-lg col-span-2">
            <Car class="w-7 h-7 text-cyan-300 mt-1" />
            <div>
              <p class="font-semibold text-base">Body</p>
              <p class="text-sm text-gray-300">{{ car.body }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="h-full w-full flex items-center justify-center text-white bg-black">
    Car not found.
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGarageStore } from '../store/app-store';
import { Car as CarIcon, ChevronRight } from 'lucide-vue-next';

const garageStore = useGarageStore();
const router = useRouter();

const viewCarDetails = (carId: number) => {
  router.push(`/app/garage/${carId}`);
};
</script>

<template>
  <div class="h-full w-full text-white overflow-y-auto no-scrollbar relative font-sans">
    <!-- Background -->
    <div 
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/src/core/nui/assets/images/backgrounds/w8.png');"
    ></div>
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col pt-20 pb-8 px-6 space-y-6">
      <!-- Header -->
      <div class="flex items-center space-x-3">
        <CarIcon class="w-8 h-8" />
        <h1 class="text-3xl font-bold">My Cars</h1>
      </div>

      <!-- Garage Section -->
      <div v-if="garageStore.garageCars.length > 0" class="space-y-3">
        <div class="flex items-center space-x-2 text-lg font-semibold text-gray-300">
          <span>Garage</span>
          <ChevronRight class="w-5 h-5" />
        </div>
        <div 
          v-for="car in garageStore.garageCars" 
          :key="car.id"
          @click="viewCarDetails(car.id)"
          class="bg-white/10 backdrop-blur-lg rounded-2xl p-4 flex items-center space-x-4 border border-white/10 shadow-lg cursor-pointer hover:bg-white/20 transition-colors"
        >
          <div class="w-11 h-11 rounded-full bg-cyan-400/80 flex items-center justify-center flex-shrink-0">
            <CarIcon class="w-6 h-6 text-white" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-base truncate">{{ car.name }}</p>
            <p class="text-sm text-gray-300 truncate">{{ car.plate }} - {{ car.location }}</p>
          </div>
        </div>
      </div>

      <!-- Impounded Section -->
      <div v-if="garageStore.impoundedCars.length > 0" class="space-y-3 pt-3">
        <div class="flex items-center space-x-2 text-lg font-semibold text-gray-300">
          <span>Impounded</span>
          <ChevronRight class="w-5 h-5" />
        </div>
        <div 
          v-for="car in garageStore.impoundedCars" 
          :key="car.id"
          @click="viewCarDetails(car.id)"
          class="bg-white/10 backdrop-blur-lg rounded-2xl p-4 flex items-center space-x-4 border border-white/10 shadow-lg cursor-pointer hover:bg-white/20 transition-colors"
        >
          <div class="w-11 h-11 rounded-full bg-cyan-400/80 flex items-center justify-center flex-shrink-0">
            <CarIcon class="w-6 h-6 text-white" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-base truncate">{{ car.name }}</p>
            <p class="text-sm text-gray-300 truncate">{{ car.plate }} - {{ car.location }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

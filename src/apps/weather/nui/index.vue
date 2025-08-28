<script setup lang="ts">
import { useWeatherStore } from './store/app-store';
import { Clock } from 'lucide-vue-next';

const weatherStore = useWeatherStore();
</script>

<template>
  <div class="h-full w-full text-white overflow-y-auto no-scrollbar bg-gradient-to-b from-[#4A7CB7] to-[#77A9E0] relative">
    <!-- Sun Flare & Lens Effects -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-24 -mt-24 blur-3xl"></div>
    <div class="absolute top-2 right-2 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
    <div class="absolute top-28 right-24 w-8 h-8 bg-white/10 rounded-full opacity-60 blur-sm"></div>
    <div class="absolute top-36 right-20 w-3 h-3 bg-white/20 rounded-full opacity-50 blur-xs"></div>

    <div class="relative z-10 flex flex-col items-center pt-24 pb-8 px-4 space-y-6">
      <!-- Main Weather Info -->
      <div class="text-center flex flex-col items-center font-light [text-shadow:0_2px_4px_rgba(0,0,0,0.25)]">
        <h1 class="text-4xl">{{ weatherStore.location }}</h1>
        <p class="text-8xl font-thin tracking-tight my-0">{{ weatherStore.currentTemp }}°</p>
        <p class="text-2xl opacity-80 -mt-2">{{ weatherStore.condition }}</p>
      </div>

      <!-- Hourly Forecast Card -->
      <div class="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg">
        <div class="flex items-center text-sm opacity-70 mb-3 px-1">
          <Clock class="w-4 h-4 mr-2" />
          <h2 class="font-semibold uppercase tracking-wider">Hourly Forecast</h2>
        </div>
        <div class="flex justify-between overflow-x-auto no-scrollbar -mx-4 px-4">
          <div v-for="forecast in weatherStore.hourlyForecasts" :key="forecast.time" class="flex flex-col items-center space-y-2 flex-shrink-0 w-16 text-center">
            <span class="text-sm font-semibold">{{ forecast.time }}</span>
            <component :is="forecast.icon" class="w-7 h-7" :class="forecast.icon.name === 'Sun' ? 'text-yellow-300' : 'text-gray-300'" fill="currentColor" />
            <span class="text-xl font-medium">{{ forecast.temp }}°</span>
          </div>
        </div>
      </div>

      <!-- Details Grid -->
      <div class="w-full grid grid-cols-2 gap-4">
        <!-- Feels Like Card -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 shadow-lg">
          <div class="flex items-center text-xs opacity-70 mb-1">
            <component :is="weatherStore.feelsLike.icon" class="w-3 h-3 mr-1.5" />
            <h3 class="font-semibold uppercase tracking-wider">Feels Like</h3>
          </div>
          <p class="text-3xl font-semibold">{{ weatherStore.feelsLike.temp }}°</p>
          <p class="text-xs mt-2 opacity-80">{{ weatherStore.feelsLike.description }}</p>
        </div>

        <!-- Sunset Card -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 shadow-lg">
          <div class="flex items-center text-xs opacity-70 mb-1">
            <component :is="weatherStore.sunTimes.icon" class="w-3 h-3 mr-1.5" />
            <h3 class="font-semibold uppercase tracking-wider">Sunset</h3>
          </div>
          <p class="text-3xl font-semibold">{{ weatherStore.sunTimes.sunset }}</p>
          <p class="text-xs mt-2 opacity-80">Sunrise: {{ weatherStore.sunTimes.sunrise }}</p>
        </div>

        <!-- Wind Card -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 shadow-lg">
          <div class="flex items-center text-xs opacity-70 mb-2">
            <component :is="weatherStore.wind.icon" class="w-3 h-3 mr-1.5" />
            <h3 class="font-semibold uppercase tracking-wider">Wind</h3>
          </div>
          <div class="relative w-24 h-24 mx-auto">
            <div class="absolute inset-0 border-2 border-white/20 rounded-full"></div>
            <div class="absolute inset-2 border border-white/10 rounded-full"></div>
            <div class="absolute top-1/2 left-0 w-full h-px bg-white/10"></div>
            <div class="absolute left-1/2 top-0 h-full w-px bg-white/10"></div>
            <span class="absolute top-1 left-1/2 -translate-x-1/2 text-xs opacity-50">N</span>
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs opacity-50">S</span>
            <span class="absolute left-1 top-1/2 -translate-y-1/2 text-xs opacity-50">W</span>
            <span class="absolute right-1 top-1/2 -translate-y-1/2 text-xs opacity-50">E</span>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="flex flex-col items-center">
                <div class="text-2xl font-bold">{{ weatherStore.wind.speed }}</div>
                <div class="text-sm -mt-1">m/s</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Precipitation Card -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 shadow-lg">
          <div class="flex items-center text-xs opacity-70 mb-1">
            <component :is="weatherStore.precipitation.icon" class="w-3 h-3 mr-1.5" />
            <h3 class="font-semibold uppercase tracking-wider">Precipitation</h3>
          </div>
          <p class="text-3xl font-semibold">{{ weatherStore.precipitation.last24h }} <span class="text-2xl opacity-80">mm</span></p>
          <p class="text-xs mt-1 opacity-80">in the last 24h</p>
          <p class="text-xs mt-2 opacity-80">{{ weatherStore.precipitation.next24h }} mm expected in the next 24h</p>
        </div>
      </div>
    </div>
  </div>
</template>

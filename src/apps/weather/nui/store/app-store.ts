import { defineStore } from 'pinia'
import { ref, markRaw } from 'vue'
import { Sun, Cloud, Thermometer, Sunset, Wind, Droplets } from 'lucide-vue-next'

export interface HourlyForecast {
  time: string;
  icon: any; // Using any for component type
  temp: number;
}

export const useWeatherStore = defineStore('weather', () => {
  const location = ref('Los Santos')
  const currentTemp = ref(80)
  const condition = ref('Clear')

  const hourlyForecasts = ref<HourlyForecast[]>([
    { time: 'Now', icon: markRaw(Sun), temp: 80 },
    { time: '6AM', icon: markRaw(Sun), temp: 80 },
    { time: '7AM', icon: markRaw(Sun), temp: 75 },
    { time: '8AM', icon: markRaw(Sun), temp: 73 },
    { time: '9AM', icon: markRaw(Cloud), temp: 65 },
  ])

  const feelsLike = ref({
    temp: 85,
    description: 'Humidity is making it feel warmer',
    icon: markRaw(Thermometer)
  })

  const sunTimes = ref({
    sunset: '10:09PM',
    sunrise: '3:31AM',
    icon: markRaw(Sunset)
  })

  const wind = ref({
    speed: 4,
    direction: 'N',
    icon: markRaw(Wind)
  })

  const precipitation = ref({
    last24h: 0,
    next24h: 0,
    icon: markRaw(Droplets)
  })

  return {
    location,
    currentTemp,
    condition,
    hourlyForecasts,
    feelsLike,
    sunTimes,
    wind,
    precipitation
  }
})

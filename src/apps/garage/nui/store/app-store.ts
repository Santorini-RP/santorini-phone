import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Car {
  id: number;
  name: string;
  plate: string;
  location: string;
  status: 'garage' | 'impounded';
  isLocked: boolean;
  isEngineOn: boolean;
  fuel: number;
  engine: number;
  body: number;
}

export const useGarageStore = defineStore('garage', () => {
  const cars = ref<Car[]>([
    { id: 1, name: 'Blista Compact', plate: '49XJL722', location: 'Richman Glen', status: 'garage', isLocked: true, isEngineOn: false, fuel: 100, engine: 100, body: 100 },
    { id: 2, name: 'Buccaneer', plate: '49XJL723', location: 'Buccaneer Way', status: 'garage', isLocked: true, isEngineOn: true, fuel: 85, engine: 92, body: 98 },
    { id: 3, name: 'Buffalo', plate: '49XJL724', location: 'Grove Street', status: 'impounded', isLocked: true, isEngineOn: false, fuel: 40, engine: 60, body: 75 },
  ])

  const garageCars = computed(() => cars.value.filter(car => car.status === 'garage'))
  const impoundedCars = computed(() => cars.value.filter(car => car.status === 'impounded'))

  const getCarById = computed(() => {
    return (carId: number) => cars.value.find(car => car.id === carId)
  })

  const toggleLockStatus = (carId: number) => {
    const car = cars.value.find(c => c.id === carId);
    if (car) {
      car.isLocked = !car.isLocked;
    }
  };

  const toggleEngineStatus = (carId: number) => {
    const car = cars.value.find(c => c.id === carId);
    if (car) {
      car.isEngineOn = !car.isEngineOn;
    }
  };

  return {
    cars,
    garageCars,
    impoundedCars,
    getCarById,
    toggleLockStatus,
    toggleEngineStatus,
  }
})

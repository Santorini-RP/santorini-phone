<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
  modelValue: { hours: number, minutes: number, seconds: number }
}>();

const emit = defineEmits(['update:modelValue']);

const hoursRef = ref<HTMLElement | null>(null);
const minutesRef = ref<HTMLElement | null>(null);
const secondsRef = ref<HTMLElement | null>(null);

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutesAndSeconds = Array.from({ length: 60 }, (_, i) => i);

const ITEM_HEIGHT = 48; // Corresponds to h-12
const CONTAINER_HEIGHT = 192; // Corresponds to h-48
const SPACER_HEIGHT = (CONTAINER_HEIGHT - ITEM_HEIGHT) / 2;

let scrollTimeoutHours: number | null = null;
let scrollTimeoutMinutes: number | null = null;
let scrollTimeoutSeconds: number | null = null;

const handleScroll = (type: 'hours' | 'minutes' | 'seconds', event: Event) => {
  let timeoutRef: number | null;
  if (type === 'hours') timeoutRef = scrollTimeoutHours;
  else if (type === 'minutes') timeoutRef = scrollTimeoutMinutes;
  else timeoutRef = scrollTimeoutSeconds;

  if (timeoutRef) clearTimeout(timeoutRef);

  const newTimeout = window.setTimeout(() => {
    const target = event.target as HTMLElement;
    const selectedIndex = Math.round(target.scrollTop / ITEM_HEIGHT);
    
    const newValue = { ...props.modelValue };
    if (type === 'hours') {
      newValue.hours = Math.max(0, Math.min(hours.length - 1, selectedIndex));
    } else if (type === 'minutes') {
      newValue.minutes = Math.max(0, Math.min(minutesAndSeconds.length - 1, selectedIndex));
    } else {
      newValue.seconds = Math.max(0, Math.min(minutesAndSeconds.length - 1, selectedIndex));
    }
    
    emit('update:modelValue', newValue);

  }, 150);

  if (type === 'hours') scrollTimeoutHours = newTimeout;
  else if (type === 'minutes') scrollTimeoutMinutes = newTimeout;
  else scrollTimeoutSeconds = newTimeout;
};

const handleWheel = (type: 'hours' | 'minutes' | 'seconds', event: WheelEvent) => {
  const target = event.currentTarget as HTMLElement;
  if (event.deltaY === 0) return;

  // Prevent default browser scroll to avoid double-scrolling
  event.preventDefault();

  const direction = Math.sign(event.deltaY);
  const currentIndex = Math.round(target.scrollTop / ITEM_HEIGHT);
  const newIndex = currentIndex + direction;

  const maxIndex = (type === 'hours' ? hours.length : minutesAndSeconds.length) - 1;

  // Clamp the index to be within bounds
  const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex));
  
  // Set the scroll position directly to the new item
  target.scrollTop = clampedIndex * ITEM_HEIGHT;
};

const setInitialScroll = () => {
  if (hoursRef.value) hoursRef.value.scrollTop = props.modelValue.hours * ITEM_HEIGHT;
  if (minutesRef.value) minutesRef.value.scrollTop = props.modelValue.minutes * ITEM_HEIGHT;
  if (secondsRef.value) secondsRef.value.scrollTop = props.modelValue.seconds * ITEM_HEIGHT;
};

onMounted(setInitialScroll);

watch(() => props.modelValue, (newValue) => {
    if (newValue.hours === 0 && newValue.minutes === 0 && newValue.seconds === 0) {
        setInitialScroll();
    }
}, { deep: true });
</script>

<template>
  <div class="w-full">
    <div class="flex justify-center items-center h-48 text-center text-4xl font-light text-black dark:text-white">
      <!-- Hours Column -->
      <div class="w-24 h-full relative">
        <div 
          ref="hoursRef"
          @scroll.passive="handleScroll('hours', $event)"
          @wheel.prevent="handleWheel('hours', $event)"
          class="h-full w-full overflow-y-scroll no-scrollbar snap-y snap-mandatory"
        >
          <div class="snap-start shrink-0" :style="{ height: `${SPACER_HEIGHT}px` }"></div>
          <div 
            v-for="hour in hours" 
            :key="`h-${hour}`" 
            class="h-12 flex items-center justify-center snap-center shrink-0"
          >{{ hour }}</div>
          <div class="snap-start shrink-0" :style="{ height: `${SPACER_HEIGHT}px` }"></div>
        </div>
        <div class="absolute inset-0 pointer-events-none z-10">
          <div class="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-gray-100 dark:from-ios-dark-bg to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-100 dark:from-ios-dark-bg to-transparent"></div>
          <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 border-y border-gray-300/80 dark:border-gray-700/60"></div>
        </div>
      </div>
      
      <!-- Minutes Column -->
      <div class="w-24 h-full relative">
        <div 
          ref="minutesRef"
          @scroll.passive="handleScroll('minutes', $event)"
          @wheel.prevent="handleWheel('minutes', $event)"
          class="h-full w-full overflow-y-scroll no-scrollbar snap-y snap-mandatory"
        >
          <div class="snap-start shrink-0" :style="{ height: `${SPACER_HEIGHT}px` }"></div>
          <div 
            v-for="minute in minutesAndSeconds" 
            :key="`m-${minute}`" 
            class="h-12 flex items-center justify-center snap-center shrink-0"
          >{{ minute }}</div>
          <div class="snap-start shrink-0" :style="{ height: `${SPACER_HEIGHT}px` }"></div>
        </div>
        <div class="absolute inset-0 pointer-events-none z-10">
          <div class="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-gray-100 dark:from-ios-dark-bg to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-100 dark:from-ios-dark-bg to-transparent"></div>
          <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 border-y border-gray-300/80 dark:border-gray-700/60"></div>
        </div>
      </div>
      
      <!-- Seconds Column -->
      <div class="w-24 h-full relative">
        <div 
          ref="secondsRef"
          @scroll.passive="handleScroll('seconds', $event)"
          @wheel.prevent="handleWheel('seconds', $event)"
          class="h-full w-full overflow-y-scroll no-scrollbar snap-y snap-mandatory"
        >
          <div class="snap-start shrink-0" :style="{ height: `${SPACER_HEIGHT}px` }"></div>
          <div 
            v-for="second in minutesAndSeconds" 
            :key="`s-${second}`" 
            class="h-12 flex items-center justify-center snap-center shrink-0"
          >{{ second }}</div>
          <div class="snap-start shrink-0" :style="{ height: `${SPACER_HEIGHT}px` }"></div>
        </div>
        <div class="absolute inset-0 pointer-events-none z-10">
          <div class="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-gray-100 dark:from-ios-dark-bg to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-100 dark:from-ios-dark-bg to-transparent"></div>
          <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 border-y border-gray-300/80 dark:border-gray-700/60"></div>
        </div>
      </div>
    </div>
    <div class="flex justify-center w-full text-base text-gray-500 dark:text-gray-400 font-normal -mt-4">
        <div class="w-24 text-center">hours</div>
        <div class="w-24 text-center">min</div>
        <div class="w-24 text-center">sec</div>
    </div>
  </div>
</template>

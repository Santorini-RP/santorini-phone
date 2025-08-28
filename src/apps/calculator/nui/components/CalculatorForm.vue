<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'
import { useCalculatorStore } from '../store'
import { useSettingsStore } from '@apps/settings/nui/store/app-store'
import { Delete } from 'lucide-vue-next'

const calculatorStore = useCalculatorStore()
const settingsStore = useSettingsStore()

const longPressTimer = ref<number | null>(null);
const isLongPress = ref(false);

const displayClass = computed(() => {
  const len = calculatorStore.mainDisplay.length;
  if (len > 14) return 'text-5xl';
  if (len > 9) return 'text-6xl';
  return 'text-8xl';
});

const buttons = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', ',', '=']
]

const getButtonClass = (button: string) => {
  const baseClass = 'rounded-full text-3xl font-medium flex items-center justify-center transition-colors duration-150 focus:outline-none'
  const activeClass = 'active:brightness-90 dark:active:brightness-125'

  const opMap: { [key: string]: string } = { '÷': '/', '×': '*' };
  const operation = opMap[button] || button;

  const isOperator = ['/', '*', '-', '+'].includes(operation);

  if (settingsStore.theme === 'dark') {
    if (['C', '±', '%'].includes(button)) return `${baseClass} ${activeClass} bg-[#A5A5A5] text-black`
    if (isOperator || button === '=') return `${baseClass} ${activeClass} bg-[#FF9500] text-white` // Changed to orange for dark mode consistency
    return `${baseClass} ${activeClass} bg-[#333333] text-white`
  }

  // Light Theme (iOS style)
  if (['C', '±', '%'].includes(button)) return `${baseClass} ${activeClass} bg-[#D4D4D2] text-black`
  if (isOperator || button === '=') return `${baseClass} ${activeClass} bg-[#FF9500] text-white`
  return `${baseClass} ${activeClass} bg-[#F2F2F7] text-black`
}

const handleButtonClick = (button: string) => {
  switch (button) {
    case '±': calculatorStore.toggleSign(); break;
    case '%': calculatorStore.percentage(); break;
    case '=': calculatorStore.calculate(); break;
    case '÷': calculatorStore.inputOperator('/'); break;
    case '×': calculatorStore.inputOperator('*'); break;
    case '-': calculatorStore.inputOperator('-'); break;
    case '+': calculatorStore.inputOperator('+'); break;
    case ',': calculatorStore.inputDecimal(); break;
    default: calculatorStore.inputDigit(button);
  }
}

const cancelClearTimer = () => {
  if (longPressTimer.value) {
    clearTimeout(longPressTimer.value);
    longPressTimer.value = null;
  }
};

const handleClearMouseDown = () => {
  isLongPress.value = false;
  cancelClearTimer();
  longPressTimer.value = window.setTimeout(() => {
    isLongPress.value = true;
    calculatorStore.clear(); // All Clear on long press
  }, 1000); // Reduced to 1 second
};

const handleClearMouseUp = () => {
  cancelClearTimer();
};

const handleClearClick = () => {
  if (isLongPress.value) {
    isLongPress.value = false;
    return;
  }
  
  if (calculatorStore.isDirty && calculatorStore.currentInput !== '0') {
      calculatorStore.backspace();
  } else {
      calculatorStore.clear();
  }
};

onUnmounted(cancelClearTimer);
</script>

<template>
  <div class="h-full p-4 flex flex-col">
    <!-- Display -->
    <div class="flex-1 flex flex-col items-end justify-end p-6 min-h-0">
      <div class="text-4xl text-gray-500 dark:text-gray-400 font-light h-10 truncate w-full text-right">
        {{ calculatorStore.displayExpression }}
      </div>
      <h1 
        class="font-light text-black dark:text-white transition-all duration-200" 
        :class="displayClass"
      >
        {{ calculatorStore.mainDisplay }}
      </h1>
    </div>

    <!-- Buttons Grid -->
    <div class="grid grid-cols-4 gap-3 p-2">
      <template v-for="(row, index) in buttons" :key="index">
        <template v-for="button in row" :key="button">
          <template v-if="button === 'C'">
            <button
              :key="'clear-btn'"
              @mousedown="handleClearMouseDown"
              @mouseup="handleClearMouseUp"
              @mouseleave="handleClearMouseUp"
              @touchstart.prevent="handleClearMouseDown"
              @touchend.prevent="handleClearMouseUp"
              @click="handleClearClick"
              :class="getButtonClass('C')"
              class="aspect-square"
            >
              <span v-if="!calculatorStore.isDirty || calculatorStore.currentInput === '0'">C</span>
              <Delete v-else class="w-8 h-8 pointer-events-none" />
            </button>
          </template>
          <button
            v-else
            @click="handleButtonClick(button)"
            :class="[
              getButtonClass(button),
              button === '0' ? 'col-span-2 !justify-start pl-8' : 'aspect-square'
            ]"
          >
            {{ button }}
          </button>
        </template>
      </template>
    </div>
  </div>
</template>

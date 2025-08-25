<script setup lang="ts">
import { computed } from 'vue'
import { useCalculatorStore } from '../store'

const calculatorStore = useCalculatorStore()

const displayValue = computed(() => {
  return calculatorStore.currentInput || calculatorStore.result?.toString() || '0'
})

const buttons = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '=']
]

const getButtonClass = (button) => {
  const baseClass = 'h-20 rounded-full font-semibold text-xl transition-all active:scale-95'
  
  if (['C', '±', '%'].includes(button)) {
    return `${baseClass} bg-gray-500 text-black hover:bg-gray-400`
  }
  
  if (['÷', '×', '-', '+', '='].includes(button)) {
    return `${baseClass} bg-orange-500 text-white hover:bg-orange-400`
  }
  
  return `${baseClass} bg-gray-700 text-white hover:bg-gray-600`
}

const handleButtonClick = (button) => {
  switch (button) {
    case 'C':
      calculatorStore.clear()
      break
    case '±':
      calculatorStore.toggleSign()
      break
    case '%':
      calculatorStore.percentage()
      break
    case '=':
      calculatorStore.calculate()
      break
    case '÷':
      calculatorStore.setOperation('/')
      break
    case '×':
      calculatorStore.setOperation('*')
      break
    case '-':
      calculatorStore.setOperation('-')
      break
    case '+':
      calculatorStore.setOperation('+')
      break
    default:
      if (button === '.') {
        calculatorStore.addDecimal()
      } else {
        calculatorStore.addDigit(button)
      }
  }
}
</script>

<template>
  <div class="h-full p-4 flex flex-col">
    <!-- Display -->
    <div class="flex-1 flex items-end justify-end p-6">
      <div class="text-right">
        <div class="text-6xl font-light text-white truncate">
          {{ displayValue }}
        </div>
      </div>
    </div>

    <!-- History -->
    <div v-if="calculatorStore.history.length > 0" class="px-6 pb-4">
      <div class="text-gray-400 text-sm">História:</div>
      <div class="max-h-20 overflow-y-auto">
        <div 
          v-for="(entry, index) in calculatorStore.history.slice(-3)" 
          :key="index"
          class="text-gray-400 text-sm"
        >
          {{ entry }}
        </div>
      </div>
    </div>

    <!-- Buttons Grid -->
    <div class="grid grid-cols-4 gap-3 p-4">
      <template v-for="(row, rowIndex) in buttons" :key="rowIndex">
        <template v-for="(button, colIndex) in row" :key="button">
          <button
            v-if="button === '0'"
            @click="handleButtonClick(button)"
            :class="getButtonClass(button)"
            class="col-span-2"
          >
            {{ button }}
          </button>
          <button
            v-else
            @click="handleButtonClick(button)"
            :class="getButtonClass(button)"
          >
            {{ button }}
          </button>
        </template>
      </template>
    </div>
  </div>
</template>

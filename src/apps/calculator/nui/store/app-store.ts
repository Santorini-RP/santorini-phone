import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCalculatorStore = defineStore('calculator', () => {
  // State
  const display = ref('0')
  const previousValue = ref<number | null>(null)
  const operation = ref<string | null>(null)
  const waitingForNewValue = ref(false)

  // Getters
  const displayValue = computed(() => display.value)

  // Actions
  const inputNumber = (num: string) => {
    if (waitingForNewValue.value) {
      display.value = num
      waitingForNewValue.value = false
    } else {
      display.value = display.value === '0' ? num : display.value + num
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display.value)

    if (previousValue.value === null) {
      previousValue.value = inputValue
    } else if (operation.value) {
      const currentValue = previousValue.value || 0
      const newValue = calculate(currentValue, inputValue, operation.value)

      display.value = String(newValue)
      previousValue.value = newValue
    }

    waitingForNewValue.value = true
    operation.value = nextOperation
  }

  const calculate = (firstValue: number, secondValue: number, op: string): number => {
    switch (op) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display.value)

    if (previousValue.value !== null && operation.value) {
      const newValue = calculate(previousValue.value, inputValue, operation.value)
      display.value = String(newValue)
      previousValue.value = null
      operation.value = null
      waitingForNewValue.value = true
    }
  }

  const clear = () => {
    display.value = '0'
    previousValue.value = null
    operation.value = null
    waitingForNewValue.value = false
  }

  const clearEntry = () => {
    display.value = '0'
  }

  const toggleSign = () => {
    const value = parseFloat(display.value)
    display.value = String(-value)
  }

  const percent = () => {
    const value = parseFloat(display.value)
    display.value = String(value / 100)
  }

  return {
    // State
    display,
    previousValue,
    operation,
    waitingForNewValue,
    
    // Getters
    displayValue,
    
    // Actions
    inputNumber,
    inputOperation,
    performCalculation,
    clear,
    clearEntry,
    toggleSign,
    percent
  }
})

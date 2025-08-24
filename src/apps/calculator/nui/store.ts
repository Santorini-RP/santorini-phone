import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCalculatorStore = defineStore('calculator', () => {
  const currentInput = ref('')
  const previousInput = ref('')
  const operation = ref('')
  const result = ref<number | null>(null)
  const history = ref<string[]>([])
  const shouldResetOnNextInput = ref(false)

  const addDigit = (digit: string) => {
    if (shouldResetOnNextInput.value) {
      currentInput.value = ''
      shouldResetOnNextInput.value = false
    }
    
    if (currentInput.value.length < 10) {
      currentInput.value += digit
    }
  }

  const addDecimal = () => {
    if (shouldResetOnNextInput.value) {
      currentInput.value = '0'
      shouldResetOnNextInput.value = false
    }
    
    if (!currentInput.value.includes('.')) {
      currentInput.value = currentInput.value || '0'
      currentInput.value += '.'
    }
  }

  const clear = () => {
    currentInput.value = ''
    previousInput.value = ''
    operation.value = ''
    result.value = null
    shouldResetOnNextInput.value = false
  }

  const toggleSign = () => {
    if (currentInput.value) {
      if (currentInput.value.startsWith('-')) {
        currentInput.value = currentInput.value.slice(1)
      } else {
        currentInput.value = '-' + currentInput.value
      }
    }
  }

  const percentage = () => {
    if (currentInput.value) {
      const num = parseFloat(currentInput.value)
      currentInput.value = (num / 100).toString()
    }
  }

  const setOperation = (op: string) => {
    if (currentInput.value === '' && result.value !== null) {
      operation.value = op
      previousInput.value = result.value.toString()
      return
    }

    if (currentInput.value === '') return

    if (previousInput.value && operation.value && !shouldResetOnNextInput.value) {
      calculate()
    }

    previousInput.value = currentInput.value
    operation.value = op
    shouldResetOnNextInput.value = true
  }

  const calculate = () => {
    if (!previousInput.value || !currentInput.value || !operation.value) return

    const prev = parseFloat(previousInput.value)
    const current = parseFloat(currentInput.value)
    let calculationResult: number

    switch (operation.value) {
      case '+':
        calculationResult = prev + current
        break
      case '-':
        calculationResult = prev - current
        break
      case '*':
        calculationResult = prev * current
        break
      case '/':
        if (current === 0) {
          alert('Erro: Divisão por zero!')
          return
        }
        calculationResult = prev / current
        break
      default:
        return
    }

    // Adicionar ao histórico
    const expression = `${previousInput.value} ${operation.value === '*' ? '×' : operation.value === '/' ? '÷' : operation.value} ${currentInput.value} = ${calculationResult}`
    history.value.push(expression)

    // Manter apenas os últimos 10 cálculos
    if (history.value.length > 10) {
      history.value = history.value.slice(-10)
    }

    result.value = calculationResult
    currentInput.value = calculationResult.toString()
    previousInput.value = ''
    operation.value = ''
    shouldResetOnNextInput.value = true
  }

  return {
    currentInput,
    previousInput,
    operation,
    result,
    history,
    addDigit,
    addDecimal,
    clear,
    toggleSign,
    percentage,
    setOperation,
    calculate
  }
})

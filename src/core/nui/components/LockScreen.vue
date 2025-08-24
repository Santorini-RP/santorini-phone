<script setup lang="ts">
import { computed } from 'vue'
import { useSystemStore } from '@core/nui/store/system'

defineProps<{
  time: string
}>()

defineEmits<{
  unlock: []
}>()

const systemStore = useSystemStore()

const currentDate = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('pt-BR', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const pinDisplay = computed(() => {
  return '●'.repeat(systemStore.enteredPin.length) + '○'.repeat(4 - systemStore.enteredPin.length)
})

const handleNumberPress = (num: string) => {
  if (systemStore.isPinBlocked) return
  
  systemStore.addPinDigit(num)
  
  if (systemStore.enteredPin.length === 4) {
    setTimeout(() => {
      systemStore.validatePin()
    }, 100)
  }
}

const handleDelete = () => {
  systemStore.removePinDigit()
}
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center text-white p-8">
    <!-- Wallpaper Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 opacity-80"></div>
    
    <div class="relative z-10 text-center">
      <!-- Time Display -->
      <div class="text-7xl font-light mb-2">{{ time }}</div>
      <div class="text-lg opacity-80 mb-12">{{ currentDate }}</div>

      <!-- PIN Input -->
      <div class="mb-8">
        <div class="text-lg mb-4">Digite a senha</div>
        <div class="flex justify-center space-x-4 mb-6">
          <div 
            v-for="(dot, index) in pinDisplay" 
            :key="index"
            class="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
            :class="dot === '●' ? 'bg-white' : 'bg-transparent'"
          >
            <div v-if="dot === '●'" class="w-2 h-2 bg-black rounded-full"></div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="systemStore.pinAttempts > 0 && !systemStore.isPinBlocked" class="text-red-400 text-sm mb-4">
          Senha incorreta. Tentativas: {{ systemStore.pinAttempts }}/{{ systemStore.maxPinAttempts }}
        </div>

        <div v-if="systemStore.isPinBlocked" class="text-red-400 text-sm mb-4">
          Muitas tentativas. Tente novamente mais tarde.
        </div>
      </div>

      <!-- Number Pad -->
      <div class="grid grid-cols-3 gap-6 max-w-xs mx-auto">
        <button 
          v-for="num in ['1','2','3','4','5','6','7','8','9']" 
          :key="num"
          @click="handleNumberPress(num)"
          :disabled="systemStore.isPinBlocked"
          class="w-16 h-16 rounded-full border border-white border-opacity-30 flex items-center justify-center text-2xl hover:bg-white hover:bg-opacity-10 transition-all disabled:opacity-50"
        >
          {{ num }}
        </button>
        
        <div></div> <!-- Empty space -->
        
        <button 
          @click="handleNumberPress('0')"
          :disabled="systemStore.isPinBlocked"
          class="w-16 h-16 rounded-full border border-white border-opacity-30 flex items-center justify-center text-2xl hover:bg-white hover:bg-opacity-10 transition-all disabled:opacity-50"
        >
          0
        </button>

        <button 
          @click="handleDelete"
          :disabled="systemStore.isPinBlocked || systemStore.enteredPin.length === 0"
          class="w-16 h-16 rounded-full border border-white border-opacity-30 flex items-center justify-center text-xl hover:bg-white hover:bg-opacity-10 transition-all disabled:opacity-50"
        >
          ⌫
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSystemStore } from '@core/nui/store/system'
import { useNotificationStore } from '@core/nui/store/notifications'
import NotificationItem from './NotificationItem.vue'
import { Flashlight, Camera } from 'lucide-vue-next'
import { useSwipe } from '@vueuse/core'

defineProps<{
  time: string
}>()

const emit = defineEmits<{
  unlock: []
}>()

const systemStore = useSystemStore()
const notificationStore = useNotificationStore()
const showPinPad = ref(false)
const lockScreenRef = ref<HTMLElement | null>(null)

const currentDate = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    day: 'numeric',
    month: 'long',
  }).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
})

const pinDisplay = computed(() => '●'.repeat(systemStore.enteredPin.length))

useSwipe(lockScreenRef, {
  onSwipeEnd: (e, direction) => {
    if (direction === 'up') {
      showPinPad.value = true
    }
  }
})

const handleNumberPress = (num: string) => {
  if (systemStore.isPinBlocked) return
  
  systemStore.addPinDigit(num)
  
  if (systemStore.enteredPin.length === 4) {
    setTimeout(() => {
      const unlocked = systemStore.validatePin()
      if (unlocked) {
        emit('unlock')
      }
    }, 200)
  }
}

const handleDelete = () => {
  systemStore.removePinDigit()
}
</script>

<template>
  <div ref="lockScreenRef" class="h-full flex flex-col text-white overflow-hidden relative" @click.self="showPinPad = true">
    
    <!-- Main Lock Screen Content (Notifications View) -->
    <div class="flex-1 flex flex-col justify-between p-4 pt-12 relative z-10">
      <!-- Time and Date -->
      <div class="text-center pt-8">
        <h1 class="text-8xl font-bold tracking-tight">{{ time }}</h1>
        <p class="text-xl font-medium opacity-80 mt-1">{{ currentDate }}</p>
      </div>
      
      <!-- Notifications -->
      <div class="w-full space-y-3 overflow-y-auto max-h-[45vh] no-scrollbar px-2">
        <NotificationItem 
          v-for="notification in notificationStore.notifications" 
          :key="notification.id"
          :notification="notification"
        />
      </div>
      
      <!-- Bottom Actions -->
      <div class="flex justify-between items-center px-8 pb-10">
        <button class="w-14 h-14 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/50 transition">
          <Flashlight class="w-7 h-7" />
        </button>
        <button class="w-14 h-14 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/50 transition">
          <Camera class="w-7 h-7" />
        </button>
      </div>
    </div>
    
    <!-- PIN Pad View -->
    <div v-if="showPinPad" class="absolute inset-0 bg-black/20 backdrop-blur-2xl flex flex-col justify-center items-center p-8 z-20 animate-fade-in">
      <div class="text-center">
        <div class="text-lg mb-4">Digite a senha</div>
        <div class="flex justify-center space-x-4 mb-2 h-8 items-center" :class="{ 'animate-shake': systemStore.pinAttempts > 0 && !systemStore.isPinBlocked }">
          <div 
            v-for="i in 4" 
            :key="i"
            class="w-3 h-3 rounded-full border border-white transition-all"
            :class="i <= systemStore.enteredPin.length ? 'bg-white' : 'bg-transparent'"
          ></div>
        </div>

        <div class="text-red-400 text-sm h-5 mb-4">
          <span v-if="systemStore.pinAttempts > 0 && !systemStore.isPinBlocked">Senha Incorreta</span>
          <span v-if="systemStore.isPinBlocked">Muitas tentativas. Tente novamente mais tarde.</span>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6 max-w-xs mx-auto">
        <button 
          v-for="num in ['1','2','3','4','5','6','7','8','9']" 
          :key="num"
          @click="handleNumberPress(num)"
          :disabled="systemStore.isPinBlocked"
          class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-light hover:bg-white/30 active:bg-white/40 transition-all disabled:opacity-50"
        >{{ num }}</button>
        
        <div></div>
        
        <button 
          @click="handleNumberPress('0')"
          :disabled="systemStore.isPinBlocked"
          class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-light hover:bg-white/30 active:bg-white/40 transition-all disabled:opacity-50"
        >0</button>

        <button 
          @click="handleDelete"
          :disabled="systemStore.isPinBlocked || systemStore.enteredPin.length === 0"
          class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl hover:bg-white/30 active:bg-white/40 transition-all disabled:opacity-50"
        >⌫</button>
      </div>
      <button @click="showPinPad = false" class="text-white mt-8">Cancelar</button>
    </div>

    <!-- Home indicator -->
    <div class="absolute bottom-2 left-0 right-0 flex justify-center z-20">
        <div 
          @click="showPinPad = true"
          class="w-36 h-1.5 bg-white/80 rounded-full cursor-pointer transition-all hover:bg-white"
        ></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
.animate-shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
}
</style>

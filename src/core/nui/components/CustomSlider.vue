<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:modelValue'])

const slider = ref<HTMLElement | null>(null)
const isDragging = ref(false)

const percentage = computed(() => {
  const range = props.max - props.min
  if (range === 0) return 0
  return ((props.modelValue - props.min) / range) * 100
})

const updateValue = (clientX: number) => {
  if (!slider.value) return

  const rect = slider.value.getBoundingClientRect()
  const newPercentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
  
  const rawValue = props.min + (newPercentage / 100) * (props.max - props.min)
  const steppedValue = Math.round(rawValue / props.step) * props.step
  
  emit('update:modelValue', Math.max(props.min, Math.min(props.max, steppedValue)))
}

const onMouseDown = (event: MouseEvent) => {
  isDragging.value = true
  updateValue(event.clientX)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  document.body.style.userSelect = 'none'
}

const onMouseMove = (event: MouseEvent) => {
  if (isDragging.value) {
    updateValue(event.clientX)
  }
}

const onMouseUp = () => {
  isDragging.value = false
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  document.body.style.userSelect = ''
}

const onTouchStart = (event: TouchEvent) => {
  isDragging.value = true
  updateValue(event.touches[0].clientX)
  window.addEventListener('touchmove', onTouchMove)
  window.addEventListener('touchend', onTouchEnd)
}

const onTouchMove = (event: TouchEvent) => {
  if (isDragging.value) {
    updateValue(event.touches[0].clientX)
  }
}

const onTouchEnd = () => {
  isDragging.value = false
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', onTouchEnd)
}

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', onTouchEnd)
  document.body.style.userSelect = ''
})
</script>

<template>
  <div class="flex items-center space-x-3 w-full">
    <slot name="start"></slot>
    <div
      ref="slider"
      class="relative w-full h-8 flex items-center cursor-pointer"
      @mousedown="onMouseDown"
      @touchstart.passive="onTouchStart"
    >
      <!-- Track -->
      <div class="relative w-full h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full">
        <!-- Filled Track -->
        <div class="absolute top-0 left-0 h-full bg-blue-500 rounded-full" :style="{ width: `${percentage}%` }"></div>
      </div>
      
      <!-- Handle -->
      <div
        class="absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow-lg transition-transform duration-100"
        :class="{ 'scale-110': isDragging }"
        :style="{ left: `calc(${percentage}% - 14px)` }"
      >
      </div>
    </div>
    <slot name="end"></slot>
  </div>
</template>

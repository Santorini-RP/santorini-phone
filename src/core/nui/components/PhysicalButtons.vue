<script setup lang="ts">
import { useSystemStore } from '@core/nui/store/system'

defineEmits<{
  power: []
  'volume-up': []
  'volume-down': []
  'silent-switch': []
}>()

const systemStore = useSystemStore()
</script>

<style scoped>
.physical-buttons {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

/* Power Button (Right Side) */
.power-btn {
  position: absolute;
  right: -4px;
  top: 30%;
  width: 3px;
  height: 60px;
  background: linear-gradient(90deg, #444 0%, #222 50%, #111 100%);
  border: none;
  border-radius: 0 3px 3px 0;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.2s ease;
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.5);
}

.power-btn:hover {
  background: linear-gradient(90deg, #555 0%, #333 50%, #222 100%);
  transform: translateX(1px);
}

.power-btn:active {
  background: linear-gradient(90deg, #222 0%, #111 50%, #000 100%);
  transform: translateX(-1px);
}

/* Volume Controls (Left Side) */
.volume-controls {
  position: absolute;
  left: -4px;
  top: 20%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Silent Switch */
.silent-switch {
  width: 3px;
  height: 25px;
  background: linear-gradient(-90deg, #444 0%, #222 50%, #111 100%);
  border: none;
  border-radius: 3px 0 0 3px;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.2s ease;
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.5);
}

.silent-switch:hover {
  background: linear-gradient(-90deg, #555 0%, #333 50%, #222 100%);
  transform: translateX(-1px);
}

.silent-switch.active {
  background: linear-gradient(-90deg, #ff6b35 0%, #ff4500 50%, #cc3300 100%);
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.2),
    0 0 8px rgba(255, 107, 53, 0.4);
}

/* Volume Buttons */
.volume-btn {
  width: 3px;
  height: 40px;
  background: linear-gradient(-90deg, #444 0%, #222 50%, #111 100%);
  border: none;
  border-radius: 3px 0 0 3px;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.2s ease;
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.5);
}

.volume-btn:hover {
  background: linear-gradient(-90deg, #555 0%, #333 50%, #222 100%);
  transform: translateX(-1px);
}

.volume-btn:active {
  background: linear-gradient(-90deg, #222 0%, #111 50%, #000 100%);
  transform: translateX(1px);
}

/* Volume Up specific styling */
.volume-up {
  /* Inherit from .volume-btn */
}

/* Volume Down specific styling */
.volume-down {
  /* Inherit from .volume-btn */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .power-btn,
  .volume-btn,
  .silent-switch {
    width: 2px;
  }
  
  .power-btn {
    height: 45px;
  }
  
  .volume-btn {
    height: 30px;
  }
  
  .silent-switch {
    height: 20px;
  }
}
</style>

<template>
  <div class="physical-buttons">
    <!-- Power Button (Right Side) -->
    <button 
      @click="$emit('power')"
      class="power-btn"
      title="Power Button"
    ></button>

    <!-- Volume Buttons (Left Side) -->
    <div class="volume-controls">
      <!-- Silent Switch -->
      <button 
        @click="$emit('silent-switch')"
        class="silent-switch"
        :class="{ 'active': systemStore.isSilent }"
        title="Silent Switch"
      ></button>
      
      <!-- Volume Up -->
      <button 
        @click="$emit('volume-up')"
        class="volume-btn volume-up"
        title="Volume Up"
      ></button>

      <!-- Volume Down -->
      <button 
        @click="$emit('volume-down')"
        class="volume-btn volume-down"
        title="Volume Down"
      ></button>
    </div>
  </div>
</template>

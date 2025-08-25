<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '@core/nui/store/layout'
import { useAppsStore } from '@core/nui/store/apps'

const props = defineProps<{
  appId: string
  isDock?: boolean
  pageIndex?: number
  appIndex?: number
}>()

const layout = useLayoutStore()
const appsStore = useAppsStore()
const router = useRouter()

// Busca informações do app
const app = computed(() => {
  const allApps = [...appsStore.systemApps, ...appsStore.storeApps]
  return allApps.find(a => a.id === props.appId)
})

// Caminho para a imagem do app
const getAppIcon = (appId: string) => {
  try {
    return `/src/apps/${appId}/nui/assets/images/AppLogo.jpg`
  } catch {
    return '/src/core/nui/assets/images/UnknownApp.jpg'
  }
}

// Abre o app (só se não estiver em modo edição)
const openApp = () => {
  if (!layout.isEditing && app.value?.route) {
    router.push(app.value.route)
  }
}

// Remove app (se permitido)
const removeApp = () => {
  if (!app.value?.removable) return
  
  if (props.isDock) {
    layout.removeFromDock(props.appId)
  } else {
    layout.removeFromGrid(props.appId)
  }
}

// Handlers para drag & drop
const onDragStart = (event: DragEvent) => {
  if (!layout.isEditing) return
  
  // Inicia o drag no store
  layout.startDrag(
    props.appId, 
    props.isDock ? 'dock' : 'page', 
    props.pageIndex, 
    props.appIndex || 0
  )
  
  // Dados para transferência
  event.dataTransfer?.setData('text/plain', JSON.stringify({
    appId: props.appId,
    fromDock: props.isDock,
    fromPage: props.pageIndex,
    fromIndex: props.appIndex
  }))
  
  // Visual feedback
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

const onDragEnd = () => {
  // Limpa estado do drag
  layout.endDrag()
}

const onDragOver = (event: DragEvent) => {
  if (layout.isEditing && layout.draggedApp) {
    event.preventDefault()
  }
}

const onDrop = (event: DragEvent) => {
  if (!layout.isEditing || !layout.draggedApp) return
  event.preventDefault()
  
  // Se for drop no próprio app, não faz nada
  if (layout.draggedApp === props.appId) return
  
  // Determina posição do drop
  if (props.isDock) {
    layout.dropOnDock(props.appIndex || 0)
  } else if (props.pageIndex !== undefined) {
    layout.dropOnPage(props.pageIndex, props.appIndex || 0)
  }
}

// Long press para entrar em modo edição
let pressTimer: number | null = null

const onTouchStart = () => {
  if (layout.isEditing) return
  
  pressTimer = window.setTimeout(() => {
    layout.toggleEditMode()
  }, 800) // 800ms para ativar modo edição
}

const onTouchEnd = () => {
  if (pressTimer) {
    clearTimeout(pressTimer)
    pressTimer = null
  }
}
</script>

<template>
  <div
    class="app-icon-container relative flex flex-col items-center w-16 cursor-pointer select-none"
    :class="{ 
      'animate-wiggle': layout.isEditing,
      'opacity-90': layout.isEditing,
      'dragging': layout.draggedApp === appId,
      'drag-target': layout.isEditing && layout.draggedApp && layout.draggedApp !== appId
    }"
    :draggable="layout.isEditing"
    @click="openApp"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @dragover="onDragOver"
    @drop="onDrop"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @mousedown="onTouchStart"
    @mouseup="onTouchEnd"
    @mouseleave="onTouchEnd"
  >
    <!-- Ícone do App -->
    <div class="app-icon-wrapper relative">
      <div class="w-14 h-14 rounded-2xl shadow-lg relative overflow-hidden bg-gray-800">
        <img 
          :src="getAppIcon(appId)"
          :alt="app?.name || 'App'"
          class="w-full h-full object-cover"
          @error="($event.target as HTMLImageElement).src = '/src/core/nui/assets/images/UnknownApp.jpg'"
        />
      </div>

      <!-- Botão de remover (modo edição) -->
      <button
        v-if="layout.isEditing && app?.removable"
        @click.stop="removeApp"
        class="remove-button absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center shadow-lg z-10 hover:bg-red-600 transition-colors"
      >
        <span class="text-white text-sm font-bold leading-none">×</span>
      </button>
    </div>

    <!-- Nome do App -->
    <span class="app-name text-white text-xs mt-1 text-center leading-tight max-w-full truncate px-1">
      {{ app?.name || 'Unknown' }}
    </span>
  </div>
</template>

<style scoped>
/* Animação wiggle estilo iPhone */
@keyframes wiggle {
  0% { transform: rotate(-1deg) scale(1); }
  25% { transform: rotate(1deg) scale(1.02); }
  50% { transform: rotate(-1deg) scale(1); }
  75% { transform: rotate(1deg) scale(1.02); }
  100% { transform: rotate(-1deg) scale(1); }
}

.animate-wiggle {
  animation: wiggle 0.5s infinite ease-in-out;
  animation-delay: calc(var(--delay, 0) * 100ms);
}

.app-icon-container {
  transition: all 0.2s ease;
}

.app-icon-container:hover:not(.animate-wiggle) {
  transform: scale(1.05);
}

.app-icon-container:active:not(.animate-wiggle) {
  transform: scale(0.95);
}

/* Estilo do botão remover */
.remove-button {
  animation: none !important;
  transform: none !important;
}

.remove-button:hover {
  transform: scale(1.1) !important;
}

/* Efeito visual durante drag */
.app-icon-container[draggable="true"]:active {
  opacity: 0.7;
  transform: scale(1.1) rotate(5deg);
  z-index: 1000;
}

/* App sendo arrastado */
.dragging {
  opacity: 0.5 !important;
  transform: scale(1.2) rotate(8deg) !important;
  z-index: 1000 !important;
  animation: none !important;
  transition: none !important;
}

/* Zona de drop válida */
.drag-target {
  position: relative;
}

.drag-target::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px dashed #3b82f6;
  border-radius: 20px;
  background: rgba(59, 130, 246, 0.1);
  animation: pulse-border 1s infinite;
  z-index: -1;
}

@keyframes pulse-border {
  0%, 100% { 
    opacity: 0.5;
    transform: scale(1);
  }
  50% { 
    opacity: 1;
    transform: scale(1.05);
  }
}

/* Nome do app no modo edição */
.animate-wiggle .app-name {
  animation: none;
}

/* Disable drag visual em mobile */
@media (max-width: 768px) {
  .dragging {
    opacity: 0.8 !important;
    transform: scale(1.1) !important;
  }
}
</style>

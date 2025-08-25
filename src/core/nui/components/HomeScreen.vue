<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useLayoutStore } from '@core/nui/store/layout'
import { useAppsStore } from '@core/nui/store/apps'
import AppIcon from '@core/nui/components/AppIcon.vue'

const layoutStore = useLayoutStore()
const appsStore = useAppsStore()

// Touch handling para navegação entre páginas
const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const containerRef = ref<HTMLElement>()

// Computed para controlar a transformação das páginas
const pageTransform = computed(() => {
  const offset = -layoutStore.currentPage * 100
  const dragOffset = isDragging.value ? ((currentX.value - startX.value) / 4) : 0
  return `translateX(${offset + dragOffset}%)`
})

// Touch events para swipe entre páginas
const onTouchStart = (event: TouchEvent) => {
  if (layoutStore.isEditing && layoutStore.draggedApp) return // Não interfere com drag & drop
  
  startX.value = event.touches[0].clientX
  currentX.value = startX.value
  isDragging.value = true
}

const onTouchMove = (event: TouchEvent) => {
  if (!isDragging.value || (layoutStore.isEditing && layoutStore.draggedApp)) return
  
  currentX.value = event.touches[0].clientX
}

const onTouchEnd = () => {
  if (!isDragging.value || (layoutStore.isEditing && layoutStore.draggedApp)) return
  
  const deltaX = currentX.value - startX.value
  const threshold = 50 // pixels mínimos para trocar de página
  
  if (deltaX > threshold) {
    layoutStore.prevPage()
  } else if (deltaX < -threshold) {
    layoutStore.nextPage()
  }
  
  isDragging.value = false
}

// Drop zones para as páginas
const onPageDragOver = (event: DragEvent, pageIndex: number) => {
  if (layoutStore.isEditing && layoutStore.draggedApp && layoutStore.canDropOnPage(pageIndex)) {
    event.preventDefault()
  }
}

const onPageDrop = (event: DragEvent, pageIndex: number) => {
  if (layoutStore.isEditing && layoutStore.draggedApp) {
    event.preventDefault()
    
    // Calcula posição de inserção baseada na posição do mouse
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    // Grid 4 colunas, calcula índice baseado na posição
    const colWidth = rect.width / 4
    const rowHeight = 80 // altura aproximada de cada linha
    const col = Math.min(3, Math.floor(x / colWidth))
    const row = Math.floor(y / rowHeight)
    const targetIndex = Math.min(layoutStore.layout.pages[pageIndex].length, (row * 4) + col)
    
    layoutStore.dropOnPage(pageIndex, targetIndex)
  }
}

// Drop zone para dock
const onDockDragOver = (event: DragEvent) => {
  if (layoutStore.isEditing && layoutStore.draggedApp && layoutStore.canDropOnDock()) {
    event.preventDefault()
  }
}

const onDockDrop = (event: DragEvent) => {
  if (layoutStore.isEditing && layoutStore.draggedApp) {
    event.preventDefault()
    
    // Calcula posição no dock (4 slots)
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = event.clientX - rect.left
    const slotWidth = rect.width / 4
    const targetIndex = Math.min(3, Math.floor(x / slotWidth))
    
    layoutStore.dropOnDock(targetIndex)
  }
}

// Click fora para sair do modo edição
const onBackgroundClick = () => {
  if (layoutStore.isEditing) {
    layoutStore.exitEditMode()
  }
}

onMounted(async () => {
  if (!appsStore.isLoaded) {
    await appsStore.loadAppsConfig()
  }
  
  // Carrega layout do usuário
  await layoutStore.loadLayout()
})
</script>

<template>
  <div 
    class="h-full flex flex-col relative select-none"
    @click="onBackgroundClick"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <!-- Loading State -->
    <div v-if="!appsStore.isLoaded || layoutStore.loading" class="relative z-10 flex-1 flex items-center justify-center">
      <div class="text-white text-lg">Carregando apps...</div>
    </div>

    <!-- Main Content -->
    <div v-else class="flex-1 flex flex-col overflow-hidden">
      <!-- Pages Container -->
      <div class="flex-1 relative overflow-hidden pt-16">
        <div 
          ref="containerRef"
          class="pages-container flex h-full transition-transform duration-300 ease-out"
          :style="{ transform: pageTransform }"
        >
          <!-- Page -->
          <div 
            v-for="(page, pageIndex) in layoutStore.layout.pages" 
            :key="pageIndex"
            class="page w-full flex-shrink-0 p-6 relative"
            :class="{
              'drop-zone-active': layoutStore.isEditing && layoutStore.draggedApp && layoutStore.canDropOnPage(pageIndex)
            }"
            @dragover="onPageDragOver($event, pageIndex)"
            @drop="onPageDrop($event, pageIndex)"
          >
            <!-- Drop Zone Overlay -->
            <div 
              v-if="layoutStore.isEditing && layoutStore.draggedApp && layoutStore.canDropOnPage(pageIndex)"
              class="absolute inset-0 border-2 border-dashed border-blue-400 rounded-2xl bg-blue-500 bg-opacity-10 pointer-events-none z-10"
            >
              <div class="flex items-center justify-center h-full">
                <span class="text-blue-400 font-medium text-sm">Solte aqui para mover para esta página</span>
              </div>
            </div>
            
            <div class="grid grid-cols-4 gap-6 h-full content-start relative z-20">
              <AppIcon
                v-for="(appId, appIndex) in page"
                :key="appId"
                :app-id="appId"
                :page-index="pageIndex"
                :app-index="appIndex"
                :style="{ '--delay': appIndex }"
              />
              
              <!-- Empty slots para visual feedback -->
              <div
                v-for="emptySlot in Math.max(0, 8 - page.length)"
                :key="`empty-page-${pageIndex}-${emptySlot}`"
                class="empty-slot w-14 h-14 mx-auto"
                :class="{
                  'show-empty': layoutStore.isEditing && layoutStore.draggedApp && page.length < layoutStore.MAX_APPS_PER_PAGE
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page Indicators -->
      <div v-if="layoutStore.totalPages > 1" class="flex justify-center space-x-2 pb-6 px-4">
        <button
          v-for="(_, pageIndex) in layoutStore.layout.pages"
          :key="pageIndex"
          @click="layoutStore.goToPage(pageIndex)"
          class="page-indicator transition-all duration-200"
          :class="{
            'w-3 h-3 bg-white': pageIndex === layoutStore.currentPage,
            'w-2 h-2 bg-white bg-opacity-40': pageIndex !== layoutStore.currentPage
          }"
        ></button>
      </div>

      <!-- Dock -->
      <div 
        class="dock-container bg-white bg-opacity-15 backdrop-blur-lg mx-4 mb-8 rounded-3xl p-4 shadow-2xl relative"
        :class="{
          'dock-drop-active': layoutStore.isEditing && layoutStore.draggedApp && layoutStore.canDropOnDock()
        }"
        @dragover="onDockDragOver"
        @drop="onDockDrop"
      >
        <!-- Dock Drop Zone Overlay -->
        <div 
          v-if="layoutStore.isEditing && layoutStore.draggedApp && layoutStore.canDropOnDock()"
          class="absolute inset-0 border-2 border-dashed border-green-400 rounded-3xl bg-green-500 bg-opacity-10 pointer-events-none z-10"
        >
          <div class="flex items-center justify-center h-full">
            <span class="text-green-400 font-medium text-sm">Solte aqui para adicionar ao dock</span>
          </div>
        </div>
        
        <div class="grid grid-cols-4 gap-4 place-items-center relative z-20">
          <AppIcon
            v-for="(appId, dockIndex) in layoutStore.layout.dock"
            :key="appId"
            :app-id="appId"
            :is-dock="true"
            :app-index="dockIndex"
            :style="{ '--delay': dockIndex + 8 }"
          />
          
          <!-- Empty dock slots -->
          <div
            v-for="emptySlot in (layoutStore.MAX_DOCK_APPS - layoutStore.layout.dock.length)"
            :key="`empty-dock-${emptySlot}`"
            class="empty-dock-slot w-14 h-14 rounded-2xl border-2 border-dashed border-white border-opacity-20 flex items-center justify-center transition-all duration-200"
            :class="{ 
              'animate-pulse border-green-400 border-opacity-60': layoutStore.isEditing && layoutStore.draggedApp && layoutStore.canDropOnDock(),
              'opacity-30': !layoutStore.isEditing 
            }"
          >
            <span class="text-white text-opacity-30 text-xs" :class="{ 'text-green-400': layoutStore.isEditing && layoutStore.draggedApp && layoutStore.canDropOnDock() }">+</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Mode Overlay -->
    <div 
      v-if="layoutStore.isEditing"
      class="absolute top-0 left-0 right-0 z-50 bg-black bg-opacity-20 p-4 backdrop-blur-sm"
    >
      <div class="flex items-center justify-between">
        <span class="text-white text-sm font-medium">Modo de Edição</span>
        <button 
          @click="layoutStore.exitEditMode"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
        >
          Concluído
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pages-container {
  will-change: transform;
}

.page-indicator {
  border-radius: 50%;
  transition: all 0.2s ease;
  cursor: pointer;
}

.page-indicator:hover {
  transform: scale(1.2);
}

.dock-container {
  position: relative;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
}

/* Suaviza a transição entre páginas */
.page {
  touch-action: pan-x;
}

/* Animação para modo edição */
@keyframes editModeEnter {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.absolute.top-0.left-0.right-0.z-50 {
  animation: editModeEnter 0.3s ease-out;
}

/* Drop zones styles */
.drop-zone-active {
  position: relative;
}

.dock-drop-active {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}

.empty-slot {
  border: 2px dashed transparent;
  border-radius: 16px;
  transition: all 0.2s ease;
}

.empty-slot.show-empty {
  border-color: rgba(59, 130, 246, 0.4);
  background: rgba(59, 130, 246, 0.05);
}

.empty-dock-slot {
  transition: all 0.3s ease;
}

/* Drag feedback overlays */
.absolute.inset-0.border-2 {
  animation: dropZoneEnter 0.2s ease-out;
}

@keyframes dropZoneEnter {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Auto-scroll behavior durante drag */
.pages-container.dragging {
  scroll-behavior: smooth;
}

/* Disable swipe durante drag */
.page.drag-active {
  touch-action: none;
  user-select: none;
}
</style>

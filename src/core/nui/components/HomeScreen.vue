<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useLayoutStore } from '@core/nui/store/layout'
import { isAppManagerInitialized } from '@core/nui/services/appManager'
import AppIcon from '@core/nui/components/AppIcon.vue'

const layoutStore = useLayoutStore()

// Touch handling para navegação entre páginas
const startX = ref(0)
const currentX = ref(0)
const isSwiping = ref(false)
const containerRef = ref<HTMLElement>()

// Computed para controlar a transformação das páginas
const pageTransform = computed(() => {
  const offset = -layoutStore.currentPage * 100
  const dragOffset = isSwiping.value ? ((currentX.value - startX.value) / 4) : 0
  return `translateX(${offset + dragOffset}%)`
})

// Touch events para swipe entre páginas
const onTouchStart = (event: TouchEvent) => {
  if (layoutStore.isEditing) return // Não interfere com drag & drop
  
  startX.value = event.touches[0].clientX
  currentX.value = startX.value
  isSwiping.value = true
}

const onTouchMove = (event: TouchEvent) => {
  if (!isSwiping.value || layoutStore.isEditing) return
  
  currentX.value = event.touches[0].clientX
}

const onTouchEnd = () => {
  if (!isSwiping.value || layoutStore.isEditing) return
  
  const deltaX = currentX.value - startX.value
  const threshold = 50 // pixels mínimos para trocar de página
  
  if (deltaX > threshold) {
    layoutStore.prevPage()
  } else if (deltaX < -threshold) {
    layoutStore.nextPage()
  }
  
  isSwiping.value = false
}

// Lógica para arrastar para a borda e mudar de página
const pageChangeTimeout = ref<number | null>(null);
const EDGE_THRESHOLD = 40; // px
const PAGE_CHANGE_DELAY = 700; // ms

const clearPageChangeTimer = () => {
  if (pageChangeTimeout.value) {
    clearTimeout(pageChangeTimeout.value);
    pageChangeTimeout.value = null;
  }
};

const onPageDragOver = (event: DragEvent, pageIndex: number) => {
  if (layoutStore.isEditing && layoutStore.draggedApp) {
    event.preventDefault();

    if (pageIndex !== layoutStore.currentPage) {
      clearPageChangeTimer();
      return;
    }

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX;

    if (x > rect.right - EDGE_THRESHOLD && layoutStore.currentPage < layoutStore.totalPages - 1) {
      if (!pageChangeTimeout.value) {
        pageChangeTimeout.value = window.setTimeout(() => layoutStore.nextPage(), PAGE_CHANGE_DELAY);
      }
    } else if (x < rect.left + EDGE_THRESHOLD && layoutStore.currentPage > 0) {
      if (!pageChangeTimeout.value) {
        pageChangeTimeout.value = window.setTimeout(() => layoutStore.prevPage(), PAGE_CHANGE_DELAY);
      }
    } else {
      clearPageChangeTimer();
    }
  }
};

const onPageDragLeave = () => {
    clearPageChangeTimer();
}


const onPageDrop = (event: DragEvent, pageIndex: number) => {
  if (layoutStore.isEditing && layoutStore.draggedApp) {
    event.preventDefault()
    
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    const colWidth = rect.width / 4
    const rowHeight = 80
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
    
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = event.clientX - rect.left
    const slotWidth = rect.width / 4
    const targetIndex = Math.min(3, Math.floor(x / slotWidth))
    
    layoutStore.dropOnDock(targetIndex)
  }
}

// Click fora para sair do modo edição
const onBackgroundClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (layoutStore.isEditing && target.classList.contains('home-screen-bg')) {
    layoutStore.exitEditMode()
  }
}

onMounted(async () => {
  if (!layoutStore.isLayoutLoaded) {
    await layoutStore.loadLayout()
  }
})
</script>

<template>
  <div 
    class="home-screen-bg h-full flex flex-col relative select-none"
    @click="onBackgroundClick"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <!-- Loading State -->
    <div v-if="!isAppManagerInitialized() || layoutStore.loading" class="relative z-10 flex-1 flex items-center justify-center">
      <div class="text-white text-lg">Carregando apps...</div>
    </div>

    <!-- Main Content -->
    <div v-else class="flex-1 flex flex-col overflow-hidden">
      <!-- Edit Mode Top Bar -->
      <div 
        v-if="layoutStore.isEditing"
        class="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-center"
      >
        <button class="bg-gray-700/80 backdrop-blur-sm text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center">+</button>
        <button 
          @click="layoutStore.exitEditMode"
          class="bg-gray-700/80 backdrop-blur-sm text-white px-5 py-2 rounded-full text-base font-semibold transition-colors hover:bg-gray-600"
        >
          Done
        </button>
      </div>

      <!-- Pages Container -->
      <div class="flex-1 relative overflow-hidden pt-12">
        <div 
          ref="containerRef"
          class="pages-container flex h-full transition-transform duration-300 ease-out"
          :class="{ '!duration-0': isSwiping }"
          :style="{ transform: pageTransform }"
        >
          <!-- Page -->
          <div 
            v-for="(page, pageIndex) in layoutStore.layout.pages" 
            :key="pageIndex"
            class="page w-full flex-shrink-0 p-6 relative"
            @dragover="onPageDragOver($event, pageIndex)"
            @dragleave="onPageDragLeave"
            @drop="onPageDrop($event, pageIndex)"
          >
            <div class="grid grid-cols-4 gap-y-4 gap-x-6 h-full content-start relative z-20">
              <AppIcon
                v-for="(appId, appIndex) in page"
                :key="appId"
                :app-id="appId"
                :page-index="pageIndex"
                :app-index="appIndex"
                :style="{ '--delay': appIndex }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Page Indicators -->
      <div v-if="layoutStore.totalPages > 1" class="flex justify-center items-center space-x-2 pb-6 px-4 h-8">
        <button
          v-for="(_, pageIndex) in layoutStore.layout.pages"
          :key="pageIndex"
          @click="layoutStore.goToPage(pageIndex)"
          class="page-indicator rounded-full transition-all duration-300"
          :class="{
            'w-2.5 h-2.5 bg-white': pageIndex === layoutStore.currentPage,
            'w-2 h-2 bg-white/40 hover:bg-white/60': pageIndex !== layoutStore.currentPage
          }"
        ></button>
      </div>

      <!-- Dock -->
      <div 
        class="dock-container bg-white/15 backdrop-blur-lg mx-4 mb-8 rounded-3xl p-4 shadow-2xl relative"
        @dragover="onDockDragOver"
        @drop="onDockDrop"
      >
        <div class="grid grid-cols-4 gap-4 place-items-center relative z-20">
          <AppIcon
            v-for="(appId, dockIndex) in layoutStore.layout.dock"
            :key="appId"
            :app-id="appId"
            :is-dock="true"
            :app-index="dockIndex"
            :style="{ '--delay': dockIndex + 20 }"
          />
          
          <!-- Empty dock slots -->
          <div
            v-for="emptySlot in Math.max(0, layoutStore.MAX_DOCK_APPS - layoutStore.layout.dock.length)"
            :key="`empty-dock-${emptySlot}`"
            class="w-14 h-14"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pages-container {
  will-change: transform;
}

.page-indicator {
  cursor: pointer;
}

.dock-container {
  position: relative;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
}

.page {
  touch-action: pan-y;
}

.home-screen-bg.is-editing {
  touch-action: none;
}
</style>

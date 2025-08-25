import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 🔹 Interface do layout (grid + dock)
export interface Layout {
  dock: string[]
  pages: string[][]
}

// 🔹 Mock local inicial (máximo 2 páginas)
const mockLayout: Layout = {
  dock: ["phone", "messages", "camera", "photos"],
  pages: [
    ["settings", "apps", "clock", "mail", "weather", "notes", "calculator", "maps"],
    ["music", "marketplace", "wallet", "garage", "crypto", "birdy", "spark", "trendy", "instapic", "darkchat", "voicememo", "yellowpages", "home"]
  ]
}

export const useLayoutStore = defineStore('layout', () => {
  // State
  const layout = ref<Layout>(mockLayout)
  const isEditing = ref(false)
  const loading = ref(false)
  const currentPage = ref(0)
  const draggedApp = ref<string | null>(null)
  const draggedFrom = ref<{ type: 'page' | 'dock', pageIndex?: number, itemIndex: number } | null>(null)
  
  // Constants
  const MAX_PAGES = 2
  const MAX_APPS_PER_PAGE = 12
  const MAX_DOCK_APPS = 4

  // Getters
  const totalPages = computed(() => Math.min(layout.value.pages.length, MAX_PAGES))
  const currentPageApps = computed(() => layout.value.pages[currentPage.value] || [])
  const canAddPage = computed(() => layout.value.pages.length < MAX_PAGES)
  
  // Actions
  const toggleEditMode = () => {
    isEditing.value = !isEditing.value
  }

  const exitEditMode = () => {
    isEditing.value = false
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value - 1) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 0) {
      currentPage.value--
    }
  }

  const goToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < totalPages.value) {
      currentPage.value = pageIndex
    }
  }

  // 🔹 Drag & Drop Functions
  const startDrag = (appId: string, fromType: 'page' | 'dock', pageIndex?: number, itemIndex: number = 0) => {
    draggedApp.value = appId
    draggedFrom.value = { type: fromType, pageIndex, itemIndex }
  }

  const endDrag = () => {
    draggedApp.value = null
    draggedFrom.value = null
  }

  const dropOnPage = (targetPageIndex: number, targetIndex: number) => {
    if (!draggedApp.value || !draggedFrom.value) return

    const appId = draggedApp.value
    const fromInfo = draggedFrom.value

    // Ensure target page exists
    ensurePageExists(targetPageIndex)

    // Ensure we don't exceed page limit
    if (targetPageIndex >= MAX_PAGES) return

    // Check if target page has space
    if (layout.value.pages[targetPageIndex].length >= MAX_APPS_PER_PAGE) return

    // Remove from source
    if (fromInfo.type === 'page' && fromInfo.pageIndex !== undefined) {
      const fromPage = layout.value.pages[fromInfo.pageIndex]
      const fromIndex = fromPage.indexOf(appId)
      if (fromIndex !== -1) {
        fromPage.splice(fromIndex, 1)
      }
    } else if (fromInfo.type === 'dock') {
      const dockIndex = layout.value.dock.indexOf(appId)
      if (dockIndex !== -1) {
        layout.value.dock.splice(dockIndex, 1)
      }
    }

    // Add to target page
    const targetPage = layout.value.pages[targetPageIndex]
    const insertIndex = Math.min(targetIndex, targetPage.length)
    targetPage.splice(insertIndex, 0, appId)

    endDrag()
    saveLayout()
  }

  const dropOnDock = (targetIndex: number) => {
    if (!draggedApp.value || !draggedFrom.value) return

    const appId = draggedApp.value
    const fromInfo = draggedFrom.value

    // Check if dock has space
    if (layout.value.dock.length >= MAX_DOCK_APPS && fromInfo.type !== 'dock') return

    // Remove from source
    if (fromInfo.type === 'page' && fromInfo.pageIndex !== undefined) {
      const fromPage = layout.value.pages[fromInfo.pageIndex]
      const fromIndex = fromPage.indexOf(appId)
      if (fromIndex !== -1) {
        fromPage.splice(fromIndex, 1)
      }
    } else if (fromInfo.type === 'dock') {
      const dockIndex = layout.value.dock.indexOf(appId)
      if (dockIndex !== -1) {
        layout.value.dock.splice(dockIndex, 1)
      }
    }

    // Add to dock
    const insertIndex = Math.min(targetIndex, layout.value.dock.length)
    layout.value.dock.splice(insertIndex, 0, appId)

    endDrag()
    saveLayout()
  }

  const canDropOnPage = (pageIndex: number) => {
    return pageIndex < MAX_PAGES && layout.value.pages[pageIndex]?.length < MAX_APPS_PER_PAGE
  }

  const canDropOnDock = () => {
    return layout.value.dock.length < MAX_DOCK_APPS || (draggedFrom.value?.type === 'dock')
  }

  // 🔹 Reordena apps dentro da grid
  const moveApp = (appId: string, fromPage: number, toPage: number, toIndex: number) => {
    const fromArr = layout.value.pages[fromPage]
    const idx = fromArr.indexOf(appId)
    if (idx === -1) return

    // Remove da página origem
    fromArr.splice(idx, 1)
    
    // Adiciona na página destino
    if (!layout.value.pages[toPage]) {
      layout.value.pages[toPage] = []
    }
    layout.value.pages[toPage].splice(toIndex, 0, appId)
    
    // Auto-save
    saveLayout()
  }

  // 🔹 Move app para o dock
  const moveAppToDock = (appId: string, fromPage: number, dockIndex: number) => {
    const fromArr = layout.value.pages[fromPage]
    const idx = fromArr.indexOf(appId)
    if (idx === -1) return

    // Remove da página
    fromArr.splice(idx, 1)
    
    // Adiciona ao dock
    layout.value.dock.splice(dockIndex, 0, appId)
    
    // Limita dock a 4 apps
    if (layout.value.dock.length > 4) {
      const removedApp = layout.value.dock.pop()
      if (removedApp) {
        layout.value.pages[0].push(removedApp)
      }
    }
    
    saveLayout()
  }

  // 🔹 Move app do dock para grid
  const moveAppFromDock = (appId: string, toPage: number, toIndex: number) => {
    const dockIdx = layout.value.dock.indexOf(appId)
    if (dockIdx === -1) return

    // Remove do dock
    layout.value.dock.splice(dockIdx, 1)
    
    // Adiciona à página
    layout.value.pages[toPage].splice(toIndex, 0, appId)
    
    saveLayout()
  }

  // 🔹 Remove app do grid
  const removeFromGrid = (appId: string) => {
    for (let i = 0; i < layout.value.pages.length; i++) {
      const idx = layout.value.pages[i].indexOf(appId)
      if (idx !== -1) {
        layout.value.pages[i].splice(idx, 1)
        saveLayout()
        return
      }
    }
  }

  // 🔹 Remove app do dock
  const removeFromDock = (appId: string) => {
    const idx = layout.value.dock.indexOf(appId)
    if (idx !== -1) {
      layout.value.dock.splice(idx, 1)
      saveLayout()
    }
  }

  // 🔹 Adiciona nova página se necessário
  const ensurePageExists = (pageIndex: number) => {
    while (layout.value.pages.length <= pageIndex) {
      layout.value.pages.push([])
    }
  }

  // 🔹 Mock: salvar local (no futuro → API call)
  const saveLayout = async () => {
    console.log('💾 Salvando layout (mock):', JSON.stringify(layout.value))
    
    // Futuro: 
    // try {
    //   await fetch('/api/phone/layout', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       identifier: getPlayerIdentifier(), // do FiveM
    //       layout: layout.value
    //     })
    //   })
    // } catch (error) {
    //   console.error('Erro ao salvar layout:', error)
    // }
  }

  // 🔹 Mock: carregar layout (no futuro → API call)
  const loadLayout = async (identifier?: string) => {
    loading.value = true
    try {
      // Futuro:
      // const response = await fetch(`/api/phone/layout?identifier=${identifier}`)
      // if (response.ok) {
      //   const data = await response.json()
      //   layout.value = data.layout || mockLayout
      // } else {
      //   layout.value = mockLayout
      // }
      
      // Mock atual
      layout.value = mockLayout
      console.log('📱 Layout carregado (mock):', identifier)
    } catch (error) {
      console.error('Erro ao carregar layout:', error)
      layout.value = mockLayout
    } finally {
      loading.value = false
    }
  }

  // 🔹 Instalar novo app (adiciona à primeira página disponível)
  const installApp = (appId: string) => {
    // Procura uma página com espaço (máx 8 apps por página)
    for (let i = 0; i < layout.value.pages.length; i++) {
      if (layout.value.pages[i].length < 8) {
        layout.value.pages[i].push(appId)
        saveLayout()
        return
      }
    }
    
    // Se todas estão cheias, cria nova página
    layout.value.pages.push([appId])
    saveLayout()
  }

  return {
    // State
    layout,
    isEditing,
    loading,
    currentPage,
    draggedApp,
    draggedFrom,
    
    // Constants
    MAX_PAGES,
    MAX_APPS_PER_PAGE,
    MAX_DOCK_APPS,
    
    // Getters
    totalPages,
    currentPageApps,
    canAddPage,
    
    // Actions
    toggleEditMode,
    exitEditMode,
    nextPage,
    prevPage,
    goToPage,
    
    // Drag & Drop
    startDrag,
    endDrag,
    dropOnPage,
    dropOnDock,
    canDropOnPage,
    canDropOnDock,
    
    // Legacy actions (mantidas para compatibilidade)
    moveApp,
    moveAppToDock,
    moveAppFromDock,
    removeFromGrid,
    removeFromDock,
    ensurePageExists,
    saveLayout,
    loadLayout,
    installApp
  }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppsStore = defineStore('apps', () => {
  // State
  const isLoaded = ref(false)
  const data = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  const loadData = async () => {
    loading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data
      data.value = [
        { id: 1, title: 'Sample Item 1' },
        { id: 2, title: 'Sample Item 2' },
        { id: 3, title: 'Sample Item 3' }
      ]
      
      isLoaded.value = true
    } catch (err) {
      error.value = 'Failed to load data'
      console.error('Error loading apps data:', err)
    } finally {
      loading.value = false
    }
  }

  const clearData = () => {
    data.value = []
    isLoaded.value = false
    error.value = null
  }

  const addItem = (item: any) => {
    data.value.push(item)
  }

  const removeItem = (id: number) => {
    data.value = data.value.filter(item => item.id !== id)
  }

  return {
    // State
    isLoaded,
    data,
    loading,
    error,
    
    // Actions
    loadData,
    clearData,
    addItem,
    removeItem
  }
})

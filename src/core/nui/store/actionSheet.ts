import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FunctionalComponent } from 'vue';

export interface ActionSheetOption {
  id: string;
  text: string;
  style?: 'default' | 'destructive';
  icon?: FunctionalComponent;
  action?: () => void;
}

export const useActionSheetStore = defineStore('actionSheet', () => {
  const isVisible = ref(false)
  const optionsGroups = ref<ActionSheetOption[][]>([])
  
  let resolvePromise: ((value: string | null) => void) | null = null

  const show = (groups: ActionSheetOption[][]): Promise<string | null> => {
    optionsGroups.value = groups
    isVisible.value = true
    
    return new Promise((resolve) => {
      resolvePromise = resolve
    })
  }

  const hide = () => {
    isVisible.value = false
    setTimeout(() => {
      optionsGroups.value = []
    }, 300) // Aguarda a animação de saída
  }

  const handleSelect = (optionId: string) => {
    const option = optionsGroups.value.flat().find(opt => opt.id === optionId);
    if (option?.action) {
      option.action();
    }
    if (resolvePromise) {
      resolvePromise(optionId)
      resolvePromise = null
    }
    hide()
  }

  const handleCancel = () => {
    if (resolvePromise) {
      resolvePromise(null)
      resolvePromise = null
    }
    hide()
  }

  return { 
    isVisible, 
    optionsGroups,
    show, 
    hide, 
    handleSelect,
    handleCancel
  }
})

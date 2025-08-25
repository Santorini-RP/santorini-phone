import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ModalButton {
  id: string;
  text: string;
  style: 'default' | 'destructive' | 'cancel';
}

export interface ModalOptions {
  title: string;
  message?: string;
  buttons: ModalButton[];
}

export const useModalStore = defineStore('modal', () => {
  const isVisible = ref(false)
  const title = ref('')
  const message = ref('')
  const buttons = ref<ModalButton[]>([])
  
  let resolvePromise: ((value: string) => void) | null = null

  const showModal = (options: ModalOptions): Promise<string> => {
    title.value = options.title
    message.value = options.message || ''
    buttons.value = options.buttons
    isVisible.value = true
    
    return new Promise((resolve) => {
      resolvePromise = resolve
    })
  }

  const hideModal = () => {
    isVisible.value = false
    // Reset state after hiding
    setTimeout(() => {
        title.value = ''
        message.value = ''
        buttons.value = []
    }, 200)
  }

  const handleButtonClick = (buttonId: string) => {
    if (resolvePromise) {
      resolvePromise(buttonId)
      resolvePromise = null
    }
    hideModal()
  }

  return { 
    isVisible, 
    title, 
    message, 
    buttons, 
    showModal, 
    hideModal, 
    handleButtonClick 
  }
})

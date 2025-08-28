import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface ModalButton {
  id: string;
  text: string;
  style: 'default' | 'destructive' | 'cancel';
}

export interface ModalInput {
  id: string; // Unique identifier for the input
  value: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'password' | 'email';
  required?: boolean;
}

export interface ModalOptions {
  title: string;
  message?: string;
  buttons: ModalButton[];
  inputs?: ModalInput[];
}

export interface ModalResolve {
  buttonId: string;
  inputValues?: Record<string, string>;
}

export const useModalStore = defineStore('modal', () => {
  const isVisible = ref(false)
  const title = ref('')
  const message = ref('')
  const buttons = ref<ModalButton[]>([])
  const inputs = ref<ModalInput[]>([]);
  
  let resolvePromise: ((value: ModalResolve) => void) | null = null

  const isDefaultActionDisabled = computed(() => {
    if (!inputs.value || inputs.value.length === 0) {
      return false; // No inputs, so not disabled
    }
    // Check if any required input is empty
    return inputs.value.some(input => input.required && !String(input.value).trim());
  });

  const showModal = (options: ModalOptions): Promise<ModalResolve> => {
    title.value = options.title
    message.value = options.message || ''
    buttons.value = options.buttons || [] // FIX: Ensure buttons is always an array
    inputs.value = options.inputs ? JSON.parse(JSON.stringify(options.inputs)) : [];
    
    isVisible.value = true
    
    return new Promise((resolve) => {
      resolvePromise = resolve
    })
  }

  const hideModal = () => {
    isVisible.value = false
    setTimeout(() => {
        title.value = ''
        message.value = ''
        buttons.value = []
        inputs.value = [];
    }, 200)
  }

  const handleButtonClick = (buttonId: string) => {
    if (resolvePromise) {
      const inputValues = inputs.value.reduce((acc, input) => {
        acc[input.id] = input.value;
        return acc;
      }, {} as Record<string, string>);

      resolvePromise({
        buttonId,
        inputValues,
      })
      resolvePromise = null
    }
    hideModal()
  }

  return { 
    isVisible, 
    title, 
    message, 
    buttons, 
    inputs, 
    isDefaultActionDisabled,
    showModal, 
    hideModal, 
    handleButtonClick 
  }
})

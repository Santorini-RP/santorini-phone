import { defineStore } from 'pinia';
import { ref, shallowRef, type Component } from 'vue';

export const useBottomSheetStore = defineStore('bottomSheet', () => {
  const isVisible = ref(false);
  const contentComponent = shallowRef<Component | null>(null);
  const contentProps = ref<Record<string, any>>({});
  
  let resolvePromise: ((value: any) => void) | null = null;

  const open = <T extends Component>(component: T, props: Record<string, any> = {}): Promise<any> => {
    contentComponent.value = component;
    contentProps.value = props;
    isVisible.value = true;
    
    return new Promise((resolve) => {
      resolvePromise = resolve;
    });
  };

  const close = (value: any = null) => {
    isVisible.value = false;
    if (resolvePromise) {
      resolvePromise(value);
      resolvePromise = null;
    }
    // Delay clearing content to allow for the closing animation
    setTimeout(() => {
      contentComponent.value = null;
      contentProps.value = {};
    }, 300);
  };

  return {
    isVisible,
    contentComponent,
    contentProps,
    open,
    close,
  };
});

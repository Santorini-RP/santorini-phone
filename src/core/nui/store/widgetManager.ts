import { defineStore } from 'pinia';
import { ref, computed, type Component, shallowRef } from 'vue';

export type WidgetSize = 'small' | 'medium' | 'large' | 'list';

export interface Widget {
  id: string; // Unique ID, e.g., "garage-car-1"
  appId: string; // The app this widget belongs to, e.g., "garage"
  size: WidgetSize;
  icon: Component;
  iconBgColor?: string;
  title: string;
  subtitle?: string;
  action: () => void;
}

export const useWidgetManagerStore = defineStore('widgetManager', () => {
  const widgets = ref<Widget[]>([]);

  const getWidgetsByAppId = computed(() => {
    return (appId: string) => widgets.value.filter(w => w.appId === appId);
  });

  const register = (widgetConfig: Omit<Widget, 'icon'> & { icon: any }) => {
    const existingIndex = widgets.value.findIndex(w => w.id === widgetConfig.id);
    const newWidget = {
      ...widgetConfig,
      icon: shallowRef(widgetConfig.icon) // Use shallowRef for components
    };

    if (existingIndex > -1) {
      // Update existing widget
      widgets.value[existingIndex] = newWidget;
    } else {
      // Add new widget
      widgets.value.push(newWidget);
    }
  };

  const unregister = (widgetId: string) => {
    widgets.value = widgets.value.filter(w => w.id !== widgetId);
  };

  const unregisterAllByAppId = (appId: string) => {
    widgets.value = widgets.value.filter(w => w.appId !== appId);
  }

  return {
    widgets,
    getWidgetsByAppId,
    register,
    unregister,
    unregisterAllByAppId,
  };
});

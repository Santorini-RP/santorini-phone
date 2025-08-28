import { defineStore } from 'pinia'
import { ref, markRaw, type Component } from 'vue'
import { Home, MessageSquare, Music } from 'lucide-vue-next'

export interface NotificationAction {
  label: string;
  action: () => void;
}

export interface Notification {
  id: number;
  appId: string;
  appName: string;
  appIcon: Component;
  iconBgColor: string;
  title: string;
  body: string;
  time: string;
  actions?: NotificationAction[];
}

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([
    {
      id: 1,
      appId: 'garage',
      appName: 'Garage',
      appIcon: markRaw(Home),
      iconBgColor: 'bg-blue-500',
      title: 'Vehicle Update',
      body: 'Your vehicle (ABC 123) is ready for pickup',
      time: '08:24',
    },
    {
      id: 2,
      appId: 'messages',
      appName: 'Messages',
      appIcon: markRaw(MessageSquare),
      iconBgColor: 'bg-green-500',
      title: 'Loaf scripts',
      body: 'Sure Thing!',
      time: '02:16',
    },
    {
      id: 3,
      appId: 'music',
      appName: 'Music',
      appIcon: markRaw(Music),
      iconBgColor: 'bg-black',
      title: 'breze',
      body: 'hey',
      time: '23 Aug',
    },
  ])

  const addNotification = (notification: Omit<Notification, 'id' | 'time'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    }
    notifications.value.unshift(newNotification)
  }

  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  return { notifications, addNotification, removeNotification }
})

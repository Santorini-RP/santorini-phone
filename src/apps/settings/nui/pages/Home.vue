<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSystemStore } from '@core/nui/store/system'
import PageLayout from '@core/nui/components/PageLayout.vue'
import SettingsGroup from '../components/SettingsGroup.vue'
import { 
  Search, 
  Plane, 
  Video, 
  Bell, 
  Volume2, 
  Cog, 
  CaseSensitive, 
  Image as ImageIcon, 
  ScanFace,
  Battery,
  Phone
} from 'lucide-vue-next'

const systemStore = useSystemStore()
const searchQuery = ref('')

type SettingType = 'toggle' | 'navigation';

interface SettingItem {
  id: string;
  icon: any;
  color: string;
  title: string;
  subtitle?: string;
  type: SettingType;
  stateKey?: keyof typeof systemStore;
  action?: (() => void) | string;
}

const settingsGroups: SettingItem[][] = [
  [
    { id: 'profile', icon: 'LP', color: 'bg-gray-300 dark:bg-gray-600', title: "LB's Phone", subtitle: "Cloud Backup, Media", type: 'navigation', action: '#' }
  ],
  [
    { id: 'airplane', icon: Plane, color: 'bg-orange-400', title: 'Airplane Mode', type: 'toggle', action: systemStore.toggleAirplaneMode, stateKey: 'airplaneMode' },
    { id: 'streamer', icon: Video, color: 'bg-indigo-500', title: 'Streamer Mode', type: 'toggle', action: systemStore.toggleStreamerMode, stateKey: 'streamerMode' }
  ],
  [
    { id: 'notifications', icon: Bell, color: 'bg-red-500', title: 'Notifications', type: 'navigation', action: '/app/settings/notifications' },
    { id: 'sound', icon: Volume2, color: 'bg-red-400', title: 'Sound & Haptics', type: 'navigation' }
  ],
  [
    { id: 'general', icon: Cog, color: 'bg-gray-400', title: 'General', type: 'navigation' },
    { id: 'display', icon: CaseSensitive, color: 'bg-blue-500', title: 'Display & Brightness', type: 'navigation', action: '/app/settings/display' },
    { id: 'wallpaper', icon: ImageIcon, color: 'bg-teal-400', title: 'Wallpaper', type: 'navigation' },
    { id: 'faceid', icon: ScanFace, color: 'bg-green-500', title: 'Face Unlock & Passcode', type: 'navigation' },
    { id: 'battery', icon: Battery, color: 'bg-green-500', title: 'Battery', type: 'navigation' }
  ],
  [
    { id: 'phone', icon: Phone, color: 'bg-green-500', title: 'Phone', type: 'navigation' }
  ]
]

const filteredSettingsGroups = computed(() => {
  if (!searchQuery.value) {
    return settingsGroups;
  }
  const lowerCaseQuery = searchQuery.value.toLowerCase();
  return settingsGroups.map(group => 
    group.filter(item => 
      item.title.toLowerCase().includes(lowerCaseQuery) || 
      item.subtitle?.toLowerCase().includes(lowerCaseQuery)
    )
  ).filter(group => group.length > 0);
});
</script>

<template>
  <PageLayout page-title="Settings">
    <div class="p-4 pt-2 space-y-4">
      <!-- Search Bar -->
      <div class="relative px-2">
        <Search class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search"
          class="w-full bg-gray-200 dark:bg-ios-dark-input rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-0"
        />
      </div>

      <!-- Settings Groups -->
      <SettingsGroup 
        v-for="(group, groupIndex) in filteredSettingsGroups" 
        :key="groupIndex"
        :group="group"
      />
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { useSystemStore } from '@core/nui/store/system'
import PageLayout from '@core/nui/components/PageLayout.vue'
import SettingsGroup from '../../components/SettingsGroup.vue'
import { 
  Plane, 
  Video, 
  Bell, 
  Volume2, 
  Cog, 
  CaseSensitive, 
  Image as ImageIcon, 
  ScanFace,
  Battery,
  Phone,
  Search
} from 'lucide-vue-next'

const systemStore = useSystemStore()

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
    { id: 'profile', icon: 'LP', color: 'bg-gray-300 dark:bg-gray-600', title: "LB's Phone", subtitle: 'Cloud Backup', type: 'navigation', action: '/app/settings/cloud-backup' }
  ],
  [
    { id: 'airplane', icon: Plane, color: 'bg-orange-400', title: 'Airplane Mode', subtitle: 'Disable calls, cellular data etc.', type: 'toggle', action: systemStore.toggleAirplaneMode, stateKey: 'airplaneMode' },
    { id: 'streamer', icon: Video, color: 'bg-indigo-500', title: 'Streamer Mode', subtitle: 'Blurs sensitive information', type: 'toggle', action: systemStore.toggleStreamerMode, stateKey: 'streamerMode' }
  ],
  [
    { id: 'notifications', icon: Bell, color: 'bg-red-500', title: 'Notifications', subtitle: 'Choose which apps can send notifications', type: 'navigation', action: '/app/settings/notifications' },
    { id: 'sound', icon: Volume2, color: 'bg-red-400', title: 'Sound & Haptics', subtitle: 'Change sounds and vibrations', type: 'navigation', action: '/app/settings/sound' }
  ],
  [
    { id: 'general', icon: Cog, color: 'bg-gray-400', title: 'General', subtitle: 'General settings for your phone', type: 'navigation', action: '/app/settings/general' },
    { id: 'display', icon: CaseSensitive, color: 'bg-blue-500', title: 'Display & Brightness', subtitle: 'Adjust display & brightness', type: 'navigation', action: '/app/settings/display' },
    { id: 'wallpaper', icon: ImageIcon, color: 'bg-teal-400', title: 'Wallpaper', subtitle: 'Change wallpaper and other background settings', type: 'navigation', action: '/app/settings/wallpaper' },
    { id: 'faceid', icon: ScanFace, color: 'bg-green-500', title: 'Face Unlock & Passcode', subtitle: 'Secure your phone', type: 'navigation', action: '/app/settings/face-unlock' },
    { id: 'battery', icon: Battery, color: 'bg-green-500', title: 'Battery', subtitle: 'View battery life and usage', type: 'navigation', action: '#' }
  ],
  [
    { id: 'phone', icon: Phone, color: 'bg-green-500', title: 'Phone', subtitle: 'Toggle caller id, block numbers etc.', type: 'navigation', action: '/app/settings/phone' }
  ]
];
</script>

<template>
  <PageLayout page-title="Settings">
    <div class="p-4 pt-2 space-y-4">
      <!-- Search Bar -->
      <div class="px-2 pb-2">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search" 
            class="w-full bg-gray-200 dark:bg-gray-700/60 rounded-lg py-2 pl-10 pr-4 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- Settings Groups -->
      <SettingsGroup 
        v-for="(group, groupIndex) in settingsGroups" 
        :key="groupIndex"
        :group="group"
      />
    </div>
  </PageLayout>
</template>

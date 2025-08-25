<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSystemStore } from '@core/nui/store/system'
import PageHeader from '@core/nui/components/PageHeader.vue'
import { 
  Search, 
  ChevronRight, 
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
const router = useRouter()
const searchQuery = ref('')
const isScrolled = ref(false)

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
    { id: 'notifications', icon: Bell, color: 'bg-red-500', title: 'Notifications', type: 'navigation' },
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

const handleItemClick = (item: SettingItem) => {
  if (item.type === 'navigation' && typeof item.action === 'string' && item.action !== '#') {
    router.push(item.action);
  } else if (item.type === 'toggle' && typeof item.action === 'function') {
    item.action();
  }
}

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  isScrolled.value = target.scrollTop > 20;
}
</script>

<template>
  <div class="h-full text-black dark:text-white font-sans relative">
    <!-- Header as an overlay -->
    <PageHeader title="Settings" :is-scrolled="isScrolled" />

    <!-- Main Content -->
    <div 
      class="h-full overflow-y-auto no-scrollbar pt-10"
      @scroll="handleScroll"
    >
      <div class="p-4 pt-12 space-y-4">
        <!-- Large Header -->
        <h1 class="text-3xl font-bold px-2">Settings</h1>

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
        <div v-for="(group, groupIndex) in filteredSettingsGroups" :key="groupIndex" class="bg-white dark:bg-ios-dark-card rounded-lg mx-2">
          <div 
            v-for="(item, itemIndex) in group" 
            :key="item.id"
            @click="handleItemClick(item)"
            class="flex items-center p-3 space-x-3"
            :class="{ 
              'border-b border-gray-200 dark:border-gray-700': itemIndex < group.length - 1,
              'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors': item.type === 'navigation'
            }"
          >
            <!-- Icon -->
            <div 
              class="w-7 h-7 rounded-full flex items-center justify-center text-black dark:text-white" 
              :class="item.id === 'profile' ? item.color : ''"
            >
              <div 
                v-if="item.id !== 'profile'"
                class="w-full h-full rounded-md flex items-center justify-center text-white"
                :class="item.color"
              >
                <component :is="item.icon" class="w-5 h-5" />
              </div>
              <span v-else class="font-semibold text-sm">{{ item.icon }}</span>
            </div>
            
            <!-- Text -->
            <div class="flex-1">
              <p class="text-black dark:text-white">{{ item.title }}</p>
              <p v-if="item.subtitle" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ item.subtitle }}</p>
            </div>

            <!-- Action -->
            <div v-if="item.type === 'navigation'">
              <ChevronRight class="w-5 h-5 text-gray-400" />
            </div>
            <div v-else-if="item.type === 'toggle' && item.stateKey">
              <button
                @click.stop="handleItemClick(item)"
                class="w-12 h-7 rounded-full transition-colors duration-200 flex items-center p-0.5 cursor-pointer"
                :class="systemStore[item.stateKey] ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'"
              >
                <span
                  class="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200"
                  :class="{ 'translate-x-5': systemStore[item.stateKey] }"
                ></span>
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom Spacer ("Respiro") -->
        <div class="h-8"></div>
      </div>
    </div>
  </div>
</template>

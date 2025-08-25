import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/app/settings',
    component: () => import('../index.vue'),
    meta: { 
      appId: 'settings', 
      noCorePadding: true,
      title: 'Settings' 
    },
    children: [
      {
        path: '',
        name: 'settings',
        component: () => import('../pages/home/Home.vue'),
        meta: { transition: 'slide-right' }
      },
      {
        path: 'display',
        name: 'settings-display',
        component: () => import('../pages/display/Display.vue'),
        meta: { transition: 'slide-left', title: 'Display & Brightness' }
      },
      {
        path: 'notifications',
        name: 'settings-notifications',
        component: () => import('../pages/notifications/Notifications.vue'),
        meta: { transition: 'slide-left', title: 'Notifications' }
      },
      {
        path: 'notifications/:appId',
        name: 'settings-notifications-app',
        component: () => import('../pages/notifications/NotificationsApp.vue'),
        props: true,
        meta: { transition: 'slide-left', title: 'App Notifications' } // Title can be set dynamically in component
      },
      {
        path: 'cloud-backup',
        name: 'settings-cloud-backup',
        component: () => import('../pages/cloud-backup/CloudBackup.vue'),
        meta: { transition: 'slide-left', title: 'Cloud Backup' }
      },
      {
        path: 'sound',
        name: 'settings-sound-haptics',
        component: () => import('../pages/sound-haptics/SoundHaptics.vue'),
        meta: { transition: 'slide-left', title: 'Sound & Haptics' }
      },
      {
        path: 'sound/ringtone',
        name: 'settings-ringtone',
        component: () => import('../pages/sound-haptics/Ringtone.vue'),
        meta: { transition: 'slide-left', title: 'Ringtone' }
      },
      {
        path: 'sound/text-tone',
        name: 'settings-text-tone',
        component: () => import('../pages/sound-haptics/TextTone.vue'),
        meta: { transition: 'slide-left', title: 'Text Tone' }
      },
      {
        path: 'general',
        name: 'settings-general',
        component: () => import('../pages/general/General.vue'),
        meta: { transition: 'slide-left', title: 'General' }
      },
      {
        path: 'general/about',
        name: 'settings-general-about',
        component: () => import('../pages/general/About.vue'),
        meta: { transition: 'slide-left', title: 'About' }
      },
      {
        path: 'general/software-update',
        name: 'settings-general-software-update',
        component: () => import('../pages/general/SoftwareUpdate.vue'),
        meta: { transition: 'slide-left', title: 'Software Update' }
      },
      {
        path: 'general/storage',
        name: 'settings-general-storage',
        component: () => import('../pages/general/Storage.vue'),
        meta: { transition: 'slide-left', title: 'Storage' }
      },
      {
        path: 'general/date-time',
        name: 'settings-general-date-time',
        component: () => import('../pages/general/DateTime.vue'),
        meta: { transition: 'slide-left', title: 'Date & Time' }
      },
      {
        path: 'general/language-region',
        name: 'settings-general-language-region',
        component: () => import('../pages/general/LanguageRegion.vue'),
        meta: { transition: 'slide-left', title: 'Language & Region' }
      },
      {
        path: 'general/language-region/language',
        name: 'settings-general-language',
        component: () => import('../pages/general/Language.vue'),
        meta: { transition: 'slide-left', title: 'Language' }
      },
      {
        path: 'general/language-region/temperature',
        name: 'settings-general-temperature',
        component: () => import('../pages/general/Temperature.vue'),
        meta: { transition: 'slide-left', title: 'Temperature' }
      },
      {
        path: 'wallpaper',
        name: 'settings-wallpaper',
        component: () => import('../pages/wallpaper/Wallpaper.vue'),
        meta: { transition: 'slide-left', title: 'Wallpaper' }
      },
      {
        path: 'wallpaper/choose',
        name: 'settings-wallpaper-choose',
        component: () => import('../pages/wallpaper/ChooseWallpaper.vue'),
        meta: { transition: 'slide-left', title: 'Wallpapers' }
      },
      {
        path: 'face-unlock',
        name: 'settings-face-unlock',
        component: () => import('../pages/face-unlock/FaceUnlockPasscode.vue'),
        meta: { transition: 'slide-left', title: 'Face Unlock & Passcode' }
      },
      {
        path: 'face-unlock/enter-passcode',
        name: 'settings-face-unlock-enter-passcode',
        component: () => import('../pages/face-unlock/EnterPasscode.vue'),
        meta: { transition: 'slide-left', title: 'Enter Passcode' }
      },
      {
        path: 'phone',
        name: 'settings-phone',
        component: () => import('../pages/phone/Phone.vue'),
        meta: { transition: 'slide-left', title: 'Phone' }
      },
      {
        path: 'phone/blocked-contacts',
        name: 'settings-phone-blocked-contacts',
        component: () => import('../pages/phone/BlockedContacts.vue'),
        meta: { transition: 'slide-left', title: 'Blocked Contacts' }
      }
    ]
  }
]

export default routes

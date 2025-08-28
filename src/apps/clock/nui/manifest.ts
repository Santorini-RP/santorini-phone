import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'clock',
  name: 'Clock',
  icon: '🕐',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/clock',
  statusBar: {
    mode: 'default',
    // Style is now omitted to be reactive to the theme
  },
  navigationBar: {
    mode: 'default',
    // Style is now omitted to be reactive to the theme
  }
}

export default manifest

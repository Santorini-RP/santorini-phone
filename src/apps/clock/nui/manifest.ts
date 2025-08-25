import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'clock',
  name: 'Clock',
  icon: '🕐',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/clock'
}

export default manifest

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
    mode: 'overlay',
    style: 'light'
  },
  navigationBar: {
    mode: 'overlay',
    style: 'light'
  }
}

export default manifest

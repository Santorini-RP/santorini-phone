import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'weather',
  name: 'Weather',
  icon: '🌤️',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/weather',
  statusBar: {
    mode: 'fullscreen',
    style: 'dark'
  }
}

export default manifest

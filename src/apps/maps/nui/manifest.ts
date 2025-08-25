import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'maps',
  name: 'Maps',
  icon: '🗺️',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/maps'
}

export default manifest

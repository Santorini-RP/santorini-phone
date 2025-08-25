import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'garage',
  name: 'Garage',
  icon: '🏠',
  preinstalled: false,
  removable: true,
  category: 'store',
  route: '/app/garage',
  notifications: 2
}

export default manifest

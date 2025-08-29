import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'marketplace',
  name: 'Marketplace',
  icon: '🏪',
  preinstalled: false,
  removable: true,
  category: 'store',
  route: '/app/marketplace',
  statusBar: {
    mode: 'default',
    style: 'light'
  },
  navigationBar: {
    mode: 'hidden'
  }
}

export default manifest

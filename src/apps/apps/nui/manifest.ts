import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'apps',
  name: 'Apps',
  icon: '🏪',
  preinstalled: true,
  removable: true,
  category: 'store',
  route: '/app/apps',
  size: 512000, // 512 KB
  statusBar: {
    mode: 'default',
    style: 'light'
  },
  navigationBar: {
    mode: 'default',
    style: 'light'
  }
}

export default manifest
import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'settings',
  name: 'Settings',
  icon: '⚙️',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/settings',
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

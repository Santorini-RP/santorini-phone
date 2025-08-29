import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'services',
  name: 'Services',
  icon: '💻',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/services',
  statusBar: {
    mode: 'default',
    style: 'light'
  },
  navigationBar: {
    mode: 'hidden'
  }
}

export default manifest

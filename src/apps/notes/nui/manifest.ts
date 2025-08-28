import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'notes',
  name: 'Notes',
  icon: '📝',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/notes',
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

import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'mail',
  name: 'Mail',
  icon: '📧',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/mail',
  statusBar: {
    mode: 'default',
    style: 'light'
  },
}

export default manifest

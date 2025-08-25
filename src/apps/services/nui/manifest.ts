import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'services',
  name: 'Services',
  icon: '💻',
  preinstalled: true,
  removable: false,
  category: 'store',
  route: '/app/services'
}

export default manifest

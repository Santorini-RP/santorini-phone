import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'trendy',
  name: 'Trendy',
  icon: '👕',
  preinstalled: false,
  removable: true,
  category: 'store',
  route: '/app/trendy'
}

export default manifest

import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'birdy',
  name: 'Birdy',
  icon: '🐦',
  preinstalled: false,
  removable: true,
  category: 'store',
  route: '/app/birdy'
}

export default manifest

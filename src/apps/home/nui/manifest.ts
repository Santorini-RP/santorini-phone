import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'home',
  name: 'Home',
  icon: '🏡',
  preinstalled: false,
  removable: true,
  category: 'store',
  route: '/app/home'
}

export default manifest

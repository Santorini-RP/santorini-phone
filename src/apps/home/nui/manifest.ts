import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'home',
  name: 'Home',
  icon: '🏡',
  preinstalled: false,
  removable: true,
  category: 'store',
  route: '/app/home',
  statusBar: {
    mode: 'fullscreen',
    style: 'dark'
  },
  navigationBar: {
    mode: 'overlay',
    style: 'dark'
  }
}

export default manifest

import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'calculator',
  name: 'Calculator',
  icon: '🧮',
  preinstalled: true,
  removable: true,
  category: 'store',
  route: '/app/calculator',
  size: 512000, // 512 KB
  statusBar: {
    mode: 'overlay',
    style: 'dark'
  },
  navigationBar: {
    mode: 'overlay'
  }
}

export default manifest

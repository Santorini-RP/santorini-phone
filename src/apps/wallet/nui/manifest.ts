import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'wallet',
  name: 'Wallet',
  icon: '💳',
  preinstalled: false,
  removable: true,
  category: 'store',
  route: '/app/wallet',
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

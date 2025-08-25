import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'crypto',
  name: 'Crypto',
  icon: '₿',
  preinstalled: false,
  removable: true,
  category: 'store',
  route: '/app/crypto'
}

export default manifest

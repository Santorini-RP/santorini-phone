import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'marketplace',
  name: 'MarketPlace',
  icon: '🏪',
  preinstalled: false,
  removable: true,
  category: 'store',
  route: '/app/marketplace'
}

export default manifest

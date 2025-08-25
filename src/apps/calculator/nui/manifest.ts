import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'calculator',
  name: 'Calculator',
  icon: '🧮',
  preinstalled: true,
  removable: true,
  category: 'store',
  route: '/app/calculator'
}

export default manifest

import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'spark',
  name: 'Spark',
  icon: '⚡',
  preinstalled: false,
  removable: true,
  category: 'store',
  route: '/app/spark'
}

export default manifest

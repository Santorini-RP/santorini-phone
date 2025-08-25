import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'apps',
  name: 'Apps',
  icon: '🏪',
  preinstalled: true,
  removable: true,
  category: 'store',
  route: '/app/apps'
}

export default manifest

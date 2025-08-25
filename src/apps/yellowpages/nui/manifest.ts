import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'yellowpages',
  name: 'Yellow Pages',
  icon: '📋',
  preinstalled: false,
  removable: true,
  category: 'store',
  route: '/app/yellowpages'
}

export default manifest

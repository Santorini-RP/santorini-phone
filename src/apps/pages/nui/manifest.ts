import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'pages',
  name: 'Pages',
  icon: '📄',
  preinstalled: false,
  removable: true,
  category: 'store',
  route: '/app/spark'
}

export default manifest

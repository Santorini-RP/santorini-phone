import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'pages',
  name: 'Pages',
  icon: '📄',
  preinstalled: false,
  removable: true,
  category: 'store',
  route: '/app/pages',
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

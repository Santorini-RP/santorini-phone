import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'instapic',
  name: 'InstaPic',
  icon: '📷',
  preinstalled: false,
  removable: true,
  category: 'store',
  route: '/app/instapic'
}

export default manifest

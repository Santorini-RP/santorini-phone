import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'phone',
  name: 'Phone',
  icon: '📞',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/phone'
}

export default manifest

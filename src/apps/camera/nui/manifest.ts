import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'camera',
  name: 'Camera',
  icon: '📷',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/camera'
}

export default manifest

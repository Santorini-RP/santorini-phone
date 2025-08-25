import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'photos',
  name: 'Photos',
  icon: '🖼️',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/photos'
}

export default manifest

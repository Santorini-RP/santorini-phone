import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'camera',
  name: 'Camera',
  icon: '📷',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/camera',
  statusBar: {
    mode: 'fullscreen',
    style: 'dark' // Ignored
  },
  navigationBar: {
    mode: 'fullscreen'
  }
}

export default manifest

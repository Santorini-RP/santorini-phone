import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'messages',
  name: 'Messages',
  icon: '💬',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/messages'
}

export default manifest

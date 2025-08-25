import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'notes',
  name: 'Notes',
  icon: '📝',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/notes'
}

export default manifest

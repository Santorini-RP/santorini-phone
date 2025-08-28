import type { AppConfig } from '@core/nui/utils/appLoader'

const manifest: AppConfig = {
  id: 'voicememo',
  name: 'Voice Memos',
  icon: '🎙️',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/voicememo',
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

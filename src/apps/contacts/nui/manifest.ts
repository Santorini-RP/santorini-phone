import type { AppConfig } from '@core/nui/utils/appLoader';

const manifest: AppConfig = {
  id: 'contacts',
  name: 'Contacts',
  icon: '👤',
  preinstalled: true,
  removable: false,
  category: 'system',
  route: '/app/contacts',
  statusBar: {
    mode: 'default',
    style: 'light'
  },
  navigationBar: {
    mode: 'hidden'
  }
};

export default manifest;

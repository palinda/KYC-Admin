import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Monitoring',
    icon: 'nb-tables',
    children: [
      {
        title: 'KYC Request',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'View Users',
        link: '/pages/tables/user-table',
      },
    ],
  },
  {
    title: 'Manual Processing',
    icon: 'nb-compose',
    children: [
      {
        title: 'Create Users',
        link: '/pages/forms/generate',
      },
      {
        title: 'Create Sessions',
        link: '/pages/forms/sessions',
      },
    ],
  },
  {
    title: 'Configuration',
    icon: 'nb-gear',
    children: [
      {
        title: 'Admin',
        link: '/pages/forms/inputs',
      },
    ],
  },

];

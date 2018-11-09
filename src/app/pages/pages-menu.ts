import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Data',
    icon: 'nb-tables',
    children: [
      {
        title: 'KYC Request',
        link: '/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'Settings',
    icon: 'nb-compose',
    children: [
      {
        title: 'Admin',
        link: '/pages/forms/inputs',
      }
    ],
  },
  
];

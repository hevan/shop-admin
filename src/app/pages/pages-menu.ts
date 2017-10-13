import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: '平台管理',
    icon: 'nb-tables',
    children: [
      {
        title: '平台用户',
        link: '/pages/lacom/user',
      },
      {
        title: '角色管理',
        link: '/pages/lacom/authority',
      },
      {
        title: '商户管理',
        link: '/pages/lacom/corpmerch',
      },
      {
        title: '第三方账号',
        link: '/pages/lacom/third',
      },
      {
        title: '业务常量',
        link: '/pages/lacom/busitype',
      },
    ],
  },
  {
    title: '产品',
    icon: 'nb-compose',
    children: [
      {
        title: '产品分类',
        link: '/pages/product/category',
      },
      {
        title: '产品管理',
        link: '/pages/product/productquery',
      },
    ],
  },
  {
    title: '网点',
    icon: 'nb-gear',
    children: [
      {
        title: '网点',
        link: '/pages/device/spotquery',
      },
      {
        title: '网点库存',
        link: '/pages/device/spotstock',
      },
      {
        title: '网点配货单',
        link: '/pages/device/deliveryquery',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];

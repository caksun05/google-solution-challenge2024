import { lazy } from 'react';

const FormUpload = lazy(() => import('../pages/Form/FormUpload'));
const Settings = lazy(() => import('../pages/Settings'));
const DataManagement = lazy(() => import('../pages/DataManagement'));

const coreRoutes = [
  {
    path: '/data-management',
    title: 'Data Management',
    component: DataManagement,
  },
  {
    path: '/data-management/create',
    title: 'Form Upload',
    component: FormUpload,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
];

const routes = [...coreRoutes];
export default routes;

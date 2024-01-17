import { lazy } from 'react';

const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const FormUpload = lazy(() => import('../pages/Form/FormUpload'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const DataManagement = lazy(() => import('../pages/DataManagement'));

const coreRoutes = [
  {
    path: '/profile',
    component: Profile,
  },
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

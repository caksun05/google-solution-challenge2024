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
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/data-management',
    title: 'Data Management',
    component: DataManagement,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/data-management/form-upload',
    title: 'Form Upload',
    component: FormUpload,
  },
];

const routes = [...coreRoutes];
export default routes;

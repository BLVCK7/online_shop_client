import Admin from '../pages/Admin.jsx';
import Basket from '../pages/Basket.jsx';
import Shop from '../pages/Shop.jsx';
import Auth from '../pages/Auth.jsx';
import DeviceInfo from '../pages/DeviceInfo.jsx';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  CATEGORY_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from '../utils/consts.js';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: DEVICE_ROUTE + '/:id',
    Component: DeviceInfo,
  },
  {
    path: CATEGORY_ROUTE + '/:id',
    Component: Shop,
  },
];

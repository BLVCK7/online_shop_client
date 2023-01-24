import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from './components/AppRouter';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Test from './components/Test';
import { check } from './http/userAPI';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Basket from './pages/Basket';
import DeviceInfo from './pages/DeviceInfo';
import Shop from './pages/Shop';
import { UserSlice } from './redux/reducers/UserSlice';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from './utils/consts';

function App() {
  const { isAuth } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();
  const { setAuth, setUser } = UserSlice.actions;

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      check()
        .then((data) => {
          dispatch(setUser(data));
          dispatch(setAuth(true));
        })
        .finally(() => setLoading(false));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        {isAuth && (
          <>
            <Route path={ADMIN_ROUTE} element={<Admin />} />
            <Route path={BASKET_ROUTE} element={<Basket />} />
          </>
        )}
        <Route path={SHOP_ROUTE} element={<Shop />}>
          <Route path={SHOP_ROUTE} element={<ProductList />} />
          <Route path="device" element={<ProductList />} />
        </Route>
        <Route path={LOGIN_ROUTE} element={<Auth />} />
        <Route path={REGISTRATION_ROUTE} element={<Auth />} />
        <Route path={DEVICE_ROUTE + '/:id'} element={<DeviceInfo />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

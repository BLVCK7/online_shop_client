import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from './components/AppRouter';
import Navbar from './components/Navbar';
import { check } from './http/userAPI';
import { UserSlice } from './redux/reducers/UserSlice';

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
        {isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from './components/AppRouter';
import Navbar from './components/Navbar';

function App() {
  const isAuth = true;
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

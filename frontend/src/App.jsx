import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './common/Navbar';
import AuthForm from './common/AuthForm'
import Main from './pages/main/index';
import Admin from './pages/admin/index';
import Class from './pages/room/index';

const App = () => {
  const { isAuthenticated } =
    useAuth0();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Main />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/room/:id" element={<Class />} />
      </Route>
    )
  );

  // Conditionally render RouterProvider based on isAuthenticated
  return isAuthenticated ? <RouterProvider router={router} /> : <AuthForm />;
};

const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
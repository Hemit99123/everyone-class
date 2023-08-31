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
import AuthForm from './module/main/components/AuthForm'
import Main from './module/main/index';
import Admin from './module/admin/index';
import Class from './module/classroom/index';

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

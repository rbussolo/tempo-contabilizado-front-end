/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Template } from '../components/Template';
import { useAuth } from '../contexts/AuthProvider/useAuth';
import { Home } from '../pages/LoggedIn/Home';
import { UserCreate } from '../pages/LoggedIn/User/Create';
import { UserList } from '../pages/LoggedIn/User/List';
import { ForgetPassword } from '../pages/LoggedOut/ForgetPassword';
import { Login } from '../pages/LoggedOut/Login';
import { NewUser } from '../pages/LoggedOut/NewUser';
import { ResetPassword } from '../pages/LoggedOut/ResetPassword';
import { UserInfo } from '../pages/LoggedIn/User/Info';
import { ActiveCreate } from '../pages/LoggedIn/Active/Create';
import { ActiveEdit } from '../pages/LoggedIn/Active/Edit';

const LoginLayout = () => {
  const user = useAuth().getCurrentUser();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <Template>
        <Outlet />
      </Template>
    </>
  )
}

const ProtectedRoute = () => {
  const user = useAuth().getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Template>
        <Outlet />
      </Template>
    </>
  )
};
/*
const OpenRoute = () => {
  return (
    <>
      <Template>
        <Outlet />
      </Template>
    </>
  )
}
*/
const RoutesApp = () => {
  const user = useAuth().getCurrentUser();

  return (
    <>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-user" element={<NewUser />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/active/create" element={<ActiveCreate />} />
          <Route path="/active/edit/:activity_id" element={<ActiveEdit />} />
          <Route path="/user/info" element={<UserInfo />} />
          <Route path="/user/list" element={<UserList />} />
          <Route path="/user/create/:mode/:user_id" element={<UserCreate />} />
          <Route path="/driver/create/:mode/:user_id" element={<UserCreate />} />
        </Route>

        <Route path="*" element={user ? (
          <Template>
            <Home />
          </Template>
        ) : (
          <Template>
            <Login />
          </Template>
        )} />
      </Routes>
    </>
  )
}

export { RoutesApp };
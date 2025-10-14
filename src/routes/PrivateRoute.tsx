/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router";
import { useAppSelector } from "../redux/hook";
import type { RootState } from "../redux/store";




const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state: RootState) => state?.auth?.auth);
  // return user && (user?.role === 'admin' || user?.role === 'superAdmin') ? <Outlet /> : <Navigate to="/login" replace />;
  return user && (user?.role === 'admin' || user?.role === 'superAdmin' || user?.role === 'manager')
    ? children
    : <Navigate to="/login" replace />;
};

export default PrivateRoute;
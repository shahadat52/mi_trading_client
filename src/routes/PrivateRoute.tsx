
import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import type { RootState } from "../redux/store";
import { isTokenExpired } from "../utils/isTokenExpire";
import { logOut } from "../redux/features/auth/authSlice";




const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state?.auth?.auth);
  if (user && isTokenExpired(user.exp)) {
    dispatch(logOut());
    return <Navigate to="/login" replace />;
  }

  return user && (user?.role === 'admin' || user?.role === 'superAdmin' || user?.role === 'manager')
    ? children
    : <Navigate to="/login" replace />;
};

export default PrivateRoute;
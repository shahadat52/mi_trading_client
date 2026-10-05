
import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import type { RootState } from "../redux/store";
import { isTokenExpired } from "../utils/isTokenExpire";
import { logOut } from "../redux/features/auth/authSlice";




const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state: RootState) => state?.auth?.auth);
    if (user && isTokenExpired(user.exp)) {
        dispatch(logOut());
        return <Navigate to="/login" replace />;
    }

    return user && (user?.role === 'admin')
        ? children
        : <Navigate to="/login" replace />;
};

export default AdminRoute;
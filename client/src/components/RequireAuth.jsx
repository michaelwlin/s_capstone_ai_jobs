import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {

    const { auth } = useAuth();
    console.log("auth in RequireAuth = ", auth)
    const location = useLocation();
    console.log("RequireAuth accessed!")
    return (
        auth?.isAuthenticated
            ? <Outlet />
            : <Navigate to="/signIn" state={{ from: location }} replace />
    );
}

export default RequireAuth;

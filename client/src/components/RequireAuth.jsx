import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {

    const { auth, isLoading } = useAuth();
    console.log("auth in RequireAuth = ", auth)
    const location = useLocation();
    console.log("RequireAuth accessed!")

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        auth?.isAuthenticated
            ? <Outlet />
            : <Navigate to="/signIn" state={{ from: location }} replace />
    );
}

export default RequireAuth;

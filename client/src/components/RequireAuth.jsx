import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Example implementation of RequireAuth
const RequireAuth = () => {

    // const { validateToken } = useAuth(); // Assuming useAuth returns your auth state
    // validateToken();
    const { auth } = useAuth(); // Assuming useAuth returns your auth state
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

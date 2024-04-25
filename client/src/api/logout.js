// authUtils.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import config from '../clientConfig';

const useLogout = () => {
    const { validateToken } = useContext(AuthContext);

    const logout = () => {
        fetch(`${config.AUTH_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies in the request and response
        })
            .then(response => {
                if (response.ok) {
                    validateToken();
                } else {
                    throw new Error('Logout failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return logout;
};

export default useLogout;

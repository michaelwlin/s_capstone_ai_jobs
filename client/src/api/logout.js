// authUtils.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useLogout = () => {
    const { validateToken } = useContext(AuthContext);

    const logout = () => {
        fetch('https://matchiq-api-8d1eb08929d0.herokuapp.com/auth/logout', {
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

import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import useAuth from '../hooks/useAuth'; // Adjust the path as needed
import { useNavigate, useLocation } from 'react-router-dom';

const SignIn = () => {
    const { validateToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(''); // Track login status
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch('https://matchiq-api-8d1eb08929d0.herokuapp.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies in the request and response
            body: JSON.stringify({ userName, password })
        })
            .then(response => {
                if (response.ok) {
                    setUserName('');
                    setPassword('');
                    setLoginStatus('Login successful'); // Update login status
                    validateToken();
                    setTimeout(() => {
                        setShouldNavigate(true);
                    }, 1500);

                } else {
                    setLoginStatus('Login failed. Please check your username and password.'); // Update login status
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setLoginStatus(`An error occurred: ${error.message}`); // Update login status on error
            });
    };

    // Perform navigation if shouldNavigate is true
    useEffect(() => {
        if (shouldNavigate) {
            navigate(from, { replace: true });
        }
    }, [shouldNavigate, navigate, from]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                            User
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="userName"
                            name="userName"
                            type="text"
                            placeholder="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button type="submit">
                            Sign In
                        </Button>
                    </div>
                    {/* Display login status message */}
                    {loginStatus && <p className="mt-4 text-center text-sm font-medium text-gray-700 dark:text-gray-200">{loginStatus}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignIn;
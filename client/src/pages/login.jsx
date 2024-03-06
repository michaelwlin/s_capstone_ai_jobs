import React, { useState } from 'react';

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(''); // Track login status

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies in the request and response
            body: JSON.stringify({ userName, password })
        })
            .then(response => {
                if (response.ok) {
                    setLoginStatus('Login successful'); // Update login status
                } else {
                    setLoginStatus('Login failed. Please check your username and password.'); // Update login status
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setLoginStatus(`An error occurred: ${error.message}`); // Update login status on error
            });
    };

    return (
        <div className="font-sans p-4">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Sign In
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Username</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
                {/* Display login status message */}
                {loginStatus && <p className="mt-4 text-center text-sm font-medium text-gray-700 dark:text-gray-200">{loginStatus}</p>}
            </form>
        </div>
    );
};

export default LoginPage;

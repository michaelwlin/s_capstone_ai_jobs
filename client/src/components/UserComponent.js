import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch users (Read)
    useEffect(() => {
        setLoading(true);
        axios.get('/api/users/')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    // Create a new user (Create)
    const createUser = userData => {
        axios.post('/api/users/', userData)
            .then(response => {
                setUsers([...users, response.data]);
            })
            .catch(error => {
                setError(error);
            });
    };

    // Update an existing user (Update)
    const updateUser = (userId, userData) => {
        axios.put(`/api/users/${userId}/`, userData)
            .then(response => {
                setUsers(users.map(user => user.id === userId ? response.data : user));
            })
            .catch(error => {
                setError(error);
            });
    };

    // Delete a user (Delete)
    const deleteUser = userId => {
        axios.delete(`/api/users/${userId}/`)
            .then(response => {
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch(error => {
                setError(error);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {/* TODO: Render  users here */}
        </div>
    );
};

export default UserComponent;

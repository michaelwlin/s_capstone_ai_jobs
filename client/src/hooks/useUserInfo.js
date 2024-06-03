import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useAuth from './useAuth';
import { getCSRFToken } from '../api/csrfToken';

const useUserInfo = () => {
    const { auth } = useAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserInfo = useCallback(async () => {
        if (!auth.isAuthenticated || !auth.userId) return;
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/api/users/${auth.userId}`, {
                withCredentials: true,
            });
            setUserInfo(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching user information:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [auth.isAuthenticated, auth.userId]);

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

    const updateUserInfo = async (updates) => {
        if (!auth.isAuthenticated || !auth.userId) return;
        setLoading(true);
        try {
            const csrfToken = getCSRFToken();
            const response = await axios.put(`http://localhost:4000/api/users/${auth.userId}`, updates, {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
                withCredentials: true,
            });
            setUserInfo(response.data);
            setError(null);
        } catch (err) {
            console.error('Error updating user information:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUserAccount = async () => {
        if (!auth.isAuthenticated || !auth.userId) return;
        setLoading(true);
        try {
            const csrfToken = getCSRFToken();
            await axios.delete(`http://localhost:4000/api/users/${auth.userId}`, {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
                withCredentials: true,
            });
            setUserInfo(null);
            setError(null);
        } catch (err) {
            console.error('Error deleting user account:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    

    return {
        userInfo,
        setUserInfo,
        loading,
        error,
        updateUserInfo,
        fetchUserInfo,
        deleteUserAccount,
    };
};

export default useUserInfo;

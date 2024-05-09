import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import useUserInfo from '../hooks/useUserInfo';
import { Sidebar, Badge, Button, TextInput, Toast } from 'flowbite-react';
import SidebarItems from '../components/SidebarItems';
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import useLogout from '../api/logout';

const UserSettings = () => {
    const { userInfo: userInfoToUpdate, updateUserInfo } = useUserInfo();
    const { userInfo, deleteUserAccount } = useUserInfo();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        location: '',
        currentPassword: '',
        password: '',
        confirmPassword: ''
    });
    const [editMode, setEditMode] = useState({
        username: false,
        email: false,
        password: false,
        location: false
    });
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const logout = useLogout();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await logout();
    
        navigate('/');
      }

    useEffect(() => {
        if (userInfo) {
            setFormData({
                username: userInfo.userName || '',
                email: userInfo.email || '',
                location: userInfo.location || '',
                currentPassword: '',
                password: '',
                confirmPassword: ''
            });
        }
    }, [userInfo]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const isValidUsername = (username) => {
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        return usernameRegex.test(username);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
        return passwordRegex.test(password);
    };

    const toggleEditMode = (field) => {
        setEditMode(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleCancel = () => {
        setEditMode({
            username: false,
            email: false,
            password: false,
            location: false
        });
        setFormData({
            username: userInfo.userName || '',
            email: userInfo.email || '',
            location: userInfo.location || '',
            currentPassword: '',
            password: '',
            confirmPassword: ''
        });
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await deleteUserAccount();
                setToast({ show: true, message: 'Account deleted successfully. Redirecting to homepage now...', type: 'success' });
                setTimeout(() => {
                    handleSignOut();
                }, 3000);
            } catch (error) {
                console.error('Error deleting account:', error);
                setToast({ show: true, message: 'Error deleting account.', type: 'error' });
            }
        }
    };
    
    const handleSubmit = async (e, field) => {
        e.preventDefault();

        let updateData = {};
        switch (field) {
            case 'username':
                if (!isValidUsername(formData.username)) {
                    setToast({ show: true, message: 'Invalid username.', type: 'error' });
                    return;
                }
                updateData = { username: formData.username };
                break;
            case 'email':
                if (!isValidEmail(formData.email)) {
                    setToast({ show: true, message: 'Invalid email.', type: 'error' });
                    return;
                }
                updateData = { email: formData.email };
                break;
            case 'location':
                updateData = { location: formData.location };
                break;
            case 'password':
                if (formData.password !== formData.confirmPassword) {
                    setToast({ show: true, message: 'Passwords do not match.', type: 'error' });
                    return;
                }
                if (!isValidPassword(formData.password)) {
                    setToast({ show: true, message: 'Invalid password.', type: 'error' });
                    return;
                }
                updateData = { password: formData.password };
                break;
            default:
                break;
        }

        try {
            await updateUserInfo(updateData);
            setToast({ show: true, message: `${field} updated successfully.`, type: 'success' });
            setEditMode(prev => ({ ...prev, [field]: false }));
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
            setToast({ show: true, message: `Error updating ${field}.`, type: 'error' });
        }
    };

    return (
        <div className="flex">
            <Sidebar className="w-1/4 bg-gray-200 h-screen">
                <SidebarItems />
            </Sidebar>
            <div className="container mx-auto mt-8">
                <h1 className="text-2xl font-semibold mb-4">User Settings</h1>
                {toast.show && (
                    <Toast>
                        <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-${toast.type === 'success' ? 'green' : 'red'}-100 text-${toast.type === 'success' ? 'green' : 'red'}-500 dark:bg-${toast.type === 'success' ? 'green' : 'red'}-800 dark:text-${toast.type === 'success' ? 'green' : 'red'}-200`}>
                            {toast.type === 'success' ? <HiCheck className="h-5 w-5" /> : <HiX className="h-5 w-5" />}
                        </div>
                        <div className="ml-3 text-sm font-normal">{toast.message}</div>
                        <Toast.Toggle />
                    </Toast>
                )}
                {Object.keys(editMode).map(field => (
                    <div key={field} className="flex items-center mb-4 bg-white shadow-md rounded-md p-4">
                        <div className="flex-grow">
                            <label htmlFor={field} className="block mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                            {!editMode[field] ? (
                                <Badge color="light">{formData[field]}</Badge>
                            ) : (
                                <>
                                    {field.includes('password') && (
                                        <>
                                            <TextInput
                                                id={`current_${field}`}
                                                name={`current_${field}`}
                                                type="password"
                                                placeholder="Enter current password"
                                                className="border border-gray-300 p-2 rounded mb-2 w-full"
                                            />
                                            <TextInput
                                                id={field}
                                                name={field}
                                                type="password"
                                                placeholder={`Enter new ${field}`}
                                                className="border border-gray-300 p-2 rounded mb-2 w-full"
                                            />
                                            <TextInput
                                                id={`confirm_${field}`}
                                                name={`confirm_${field}`}
                                                type="password"
                                                placeholder="Confirm new password"
                                                className="border border-gray-300 p-2 rounded w-full"
                                            />
                                        </>
                                    )}
                                    {!field.includes('password') && (
                                        <TextInput
                                            id={field}
                                            name={field}
                                            type="text"
                                            value={formData[field]}
                                            onChange={handleChange}
                                            className="border border-gray-300 p-2 rounded w-full"
                                            placeholder={`Enter new ${field}`}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                        <div className="ml-4">
                            {!editMode[field] ? (
                                <Button onClick={() => toggleEditMode(field)} size="xs" color="blue">Edit</Button>
                            ) : (
                                <>
                                    <Button onClick={(e) => handleSubmit(e, field)} size="xs" color="green">Save</Button>
                                    <Button onClick={handleCancel} size="xs" color="failure">Cancel</Button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
                <div className="flex items-center mb-4 bg-white shadow-md rounded-md p-4">
                    <div className="flex-grow">
                        <Button onClick={handleDeleteAccount} size="xs" color="red">Delete Account</Button>
                    </div>
                </div>
            </div>
        </div>
    );    
}

export default UserSettings;

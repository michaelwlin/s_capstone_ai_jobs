import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Sidebar, Badge, Button } from 'flowbite-react';
import SidebarItems from '../components/SidebarItems';

const UserSettings = () => {
    const { auth } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: auth.user || '',
        email: auth.email || '',
        location: auth.location || ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
        setFormData({
            username: auth.user,
            email: auth.email,
            location: auth.location
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting form data...', formData);
        // API call to update user settings will go here
        setEditMode(false);
    };

    return (
        <div className="flex">
            <Sidebar className="w-1/4 bg-gray-200 h-screen">
                <SidebarItems />
            </Sidebar>
            <div className="container mx-auto mt-8">
                <h1 className="text-2xl font-semibold mb-4">User Settings</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-4">
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-1">Username:</label>
                        {!editMode ? (
                            <Badge color="light" style={{ display: 'inline-block' }}>{formData.username}</Badge>
                        ) : (
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1">Email:</label>
                        {!editMode ? (
                            <Badge color="light" style={{ display: 'inline-block' }}>{formData.email}</Badge>
                        ) : (
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="block mb-1">Location:</label>
                        {!editMode ? (
                            <Badge color="light" style={{ display: 'inline-block' }}>{formData.location}</Badge>
                        ) : (
                            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
                        )}
                    </div>

                    {!editMode ? (
                        <Button onClick={handleEdit} color="blue">Edit</Button>
                    ) : (
                        <>
                            <Button type="submit" color="green">Save</Button>
                            <Button onClick={handleCancel} color="failure">Cancel</Button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}

export default UserSettings;

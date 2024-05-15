import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useUserInfo from '../hooks/useUserInfo';
import { Sidebar, Badge, Button, TextInput } from 'flowbite-react';
import { FaTrash } from 'react-icons/fa';
import SidebarItems from '../components/SidebarItems';
import useUserSkills from '../hooks/useUserSkills';

const Dashboard = () => {
    const { auth } = useAuth();
    const { userInfo, fetchUserInfo, updateUserInfo } = useUserInfo();
    const { userSkills, addSkill, deleteSkill } = useUserSkills();
    const [newSkill, setNewSkill] = useState('');
    const [isEditing, setIsEditing] = useState({ skills: false, role: false });
    const [localUserInfo, setLocalUserInfo] = useState({ ...userInfo });

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        setLocalUserInfo({ ...userInfo });
    }, [userInfo]);

    const handleAddSkill = async () => {
        if (newSkill) {
            await addSkill(newSkill);
            setNewSkill('');
        }
    };

    const handleDeleteSkill = async (index) => {
        await deleteSkill(index);
    };

    const toggleEditMode = (field) => {
        setIsEditing(prev => ({
            ...prev,
            [field]: !prev[field]
        }));

        if (isEditing[field]) {
            handleSaveChanges(field);
        }
    };

    const handleChange = (e, field) => {
        setLocalUserInfo(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSaveChanges = async (field) => {
        try {
            await updateUserInfo({ [field]: localUserInfo[field] });
            alert(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully.`);
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
            alert(`Error updating ${field}.`);
        }
    };

    return (
        <div className="flex">
            <Sidebar className="w-1/4 bg-gray-200 h-screen">
                <SidebarItems />
            </Sidebar>
            <div className="container mx-auto mt-8">
                <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
                <div className="bg-white shadow-md rounded-md p-4">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Location:</h2>
                        <p>{userInfo?.location || 'No location set'}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Role:</h2>
                        {!isEditing.role ? (
                            <p>{localUserInfo?.role || 'No role defined'}</p>
                        ) : (
                            <TextInput
                                value={localUserInfo?.role || ''}
                                onChange={(e) => handleChange(e, 'role')}
                                placeholder="Enter your role"
                            />
                        )}
                        <Button onClick={() => toggleEditMode('role')}>
                            {isEditing.role ? 'Save Role' : 'Edit Role'}
                        </Button>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Skills for {auth.user}:</h2>
                        <ul className="list-none space-y-2">
                            {userSkills.map((skill, index) => (
                                <li key={index} className="flex items-center">
                                    <Badge color="info">{skill}</Badge>
                                    {isEditing.skills && (
                                        <Button size="xs" onClick={() => handleDeleteSkill(index)} style={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}>
                                            <FaTrash className="h-4 w-4 text-red-500" />
                                        </Button>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {isEditing.skills && (
                            <div className="mt-4">
                                <TextInput
                                    placeholder="Enter new skill"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                />
                                <Button onClick={handleAddSkill}>Add Skill</Button>
                            </div>
                        )}
                        <Button onClick={() => toggleEditMode('skills')}>
                            {isEditing.skills ? "Finish Editing" : "Edit Skills"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

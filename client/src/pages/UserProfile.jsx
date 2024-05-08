import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Sidebar, Badge, Button, TextInput } from 'flowbite-react';
import { FaTrash } from 'react-icons/fa';
import SidebarItems from '../components/SidebarItems';
import useUserSkills from '../hooks/useUserSkills';

const UserProfile = () => {
  const { auth } = useAuth();
  const { userSkills, setUserSkills, deleteUserSkill, updateUserSkill } = useUserSkills();
  const [newSkill, setNewSkill] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleAddSkill = () => {
    if (newSkill) {
      const updatedSkills = [...userSkills, newSkill];
      setUserSkills(updatedSkills);
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (index) => {
    deleteUserSkill(index);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
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
            <h2 className="text-lg font-semibold">Username:</h2>
            <p>{auth.user}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Skills:</h2>
            <ul className="list-none space-y-2">
              {userSkills.map((skill, index) => (
                <li key={index} className="flex items-center">
                  <Badge color="info">{skill}</Badge>
                  {isEditing && (
                    <Button size="xs" onClick={() => handleDeleteSkill(index)} style={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}>
                      <FaTrash className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </li>
              ))}
            </ul>
            {isEditing && (
              <div className="mt-4">
                <TextInput
                  placeholder="Enter new skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <Button onClick={handleAddSkill}>Add Skill</Button>
              </div>
            )}
            <Button onClick={toggleEditMode} className="mt-4">
              {isEditing ? "Finish Editing" : "Edit Skills"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

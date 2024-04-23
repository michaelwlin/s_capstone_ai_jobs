import React from 'react';
import useAuth from '../hooks/useAuth';
import { Sidebar } from 'flowbite-react';
import SidebarItems from '../components/SidebarItems';

const UserProfile = () => {
    const { auth } = useAuth();
  return (
    <div className="flex">
    {/* Sidebar */}
    <Sidebar className="w-1/4 bg-gray-200 h-screen" aria-label="Default sidebar example">
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
          <h2 className="text-lg font-semibold">Email Address:</h2>
          <p>*Email goes here*</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default UserProfile;

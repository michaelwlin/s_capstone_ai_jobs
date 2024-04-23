import React from 'react';
import { Sidebar } from 'flowbite-react';
import SidebarItems from '../components/SidebarItems';

const SavedJobs = () => {
  return (
    <div className="flex">
    {/* Sidebar */}
    <Sidebar className="w-1/4 bg-gray-200 h-screen" aria-label="Default sidebar example">
      <SidebarItems />
    </Sidebar>
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Saved Jobs</h1>
      <div className="bg-white shadow-md rounded-md p-4">
        <p>Placeholder text</p>
      </div>
    </div>
    </div>
  );
}

export default SavedJobs;

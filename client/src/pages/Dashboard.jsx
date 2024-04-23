import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Sidebar, Card } from 'flowbite-react';
import SidebarItems from '../components/SidebarItems';

const Dashboard = ({ user }) => {
    const { auth } = useAuth();
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar className="w-1/4 bg-gray-200 h-screen" aria-label="Default sidebar example">
        <SidebarItems />
      </Sidebar>
    

      {/* Main Section */}
      <div className="w-3/4 p-4">
        <h1 className="text-2xl">Hi {auth.user}!</h1>
        <div className="bg-white shadow-md rounded-md p-4 mt-4">
          <h2 className="text-lg font-semibold">Here are the jobs you've applied to:</h2>
          <p>Placeholder text</p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Recommended jobs</h2>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {/* Placeholders for recommended jobs */}
            <Card>
              <h3 className="text-lg font-semibold">Job 1</h3>
              <p>Placeholder text</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold">Job 2</h3>
              <p>Placeholder text</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold">Job 3</h3>
              <p>Placeholder text</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

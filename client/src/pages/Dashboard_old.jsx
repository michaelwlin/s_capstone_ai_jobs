import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Sidebar, Card, Toast } from 'flowbite-react';
import SidebarItems from '../components/SidebarItems';
import axios from 'axios';
import useUserInfo from '../hooks/useUserInfo';

const Dashboard = () => {
    const { auth } = useAuth();
    const { userInfo } = useUserInfo();
    const [jobs, setJobs] = useState([]);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
      const fetchJobs = async () => {
          if (userInfo?.role && userInfo?.location) {
              try {
                  const response = await axios.get(`http://localhost:4000/api/jobs`, {
                      params: {
                          keyword: userInfo.role,
                          location: userInfo.location
                      }
                  });
                  // Assuming the API returns an array of jobs
                  if (Array.isArray(response.data)) {
                      setJobs(response.data.slice(0, 3));  // Only take the first three jobs
                  } else {
                      console.error('Expected an array of jobs but got:', response.data);
                      setToast({ show: true, message: 'Unexpected data format from API', type: 'error' });
                  }
              } catch (error) {
                  console.error('Failed to fetch jobs:', error);
                  setToast({ show: true, message: 'Failed to load jobs', type: 'error' });
              }
          }
      };

      fetchJobs();
  }, [userInfo]);

    return (
        <div className="flex">
            <Sidebar className="w-1/4 bg-gray-200 h-screen">
                <SidebarItems />
            </Sidebar>
            <div className="w-3/4 p-4">
                <h1 className="text-2xl">Hi {auth.user}!</h1>
                <div className="bg-white shadow-md rounded-md p-4 mt-4">
                    <h2 className="text-lg font-semibold">Application information:</h2>
                    <p>Sorry! This feature isn't ready yet.</p>
                </div>
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Recommended jobs</h2>
                    <p>Based on your role and location, here are some jobs for you:</p>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {jobs.map((job, index) => (
                            <Card key={index}>
                                <h3 className="text-lg font-semibold">{job.title}</h3>
                                <p>{job.company}</p>
                                <p>{job.location}</p>
                            </Card>
                        ))}
                    </div>
                </div>
                {toast.show && (
                    <Toast>
                        <div className={`bg-${toast.type === 'success' ? 'green' : 'red'}-100 border border-${toast.type === 'success' ? 'green' : 'red'}-400 text-${toast.type === 'success' ? 'green' : 'red'}-700 px-4 py-3 rounded relative`} role="alert">
                            <strong className="font-bold">{toast.type === 'success' ? 'Success!' : 'Error!'}</strong>
                            <span className="block sm:inline">{toast.message}</span>
                        </div>
                    </Toast>
                )}
            </div>
        </div>
    );
}

export default Dashboard;

import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Sidebar, Card } from 'flowbite-react';
import SidebarItems from '../components/SidebarItems';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Dashboard = ({ user }) => {
    const { auth } = useAuth();
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const fetchRandomJobs = async () => {
          try {
              const response = await axios.get('http://localhost:4000/api/jobs/random?count=3');
              setRecommendedJobs(response.data.jobs || []);
              setIsLoading(false);
          } catch (error) {
              console.error('Failed to fetch recommended jobs:', error);
              setIsLoading(false);
          }
      };

      fetchRandomJobs();
  }, []);

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
          <h2 className="text-lg font-semibold">Application information:</h2>
          <p>Sorry! This feature isn't ready yet.</p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Recommended jobs</h2>
          <p>Here are some newly posted jobs for you to consider:</p>
          <div className="grid grid-cols-3 gap-4 mt-2">
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : (
                            recommendedJobs.map((job, index) => (
                                <Card key={index}>
                                    <h3 className="text-lg font-semibold">{job.title}</h3>
                                    <p>{job.company}</p>
                                    <Link to={`/job/${job.id}`}>View details</Link>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

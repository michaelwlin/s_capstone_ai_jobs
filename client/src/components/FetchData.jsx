import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "./LoadingBar";
import { useLocation } from 'react-router-dom';

function FetchData() {
    const [jobs, setJobs] = useState([]);
    const [userSkills, setUserSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const { keyword, location: locationName, useSkills } = location.state || {};

    const getJobs = async () => {
        setIsLoading(true);
        try {
            // Conditionally set the URL based on whether 'useSkills' is true
            const url = useSkills ? 
                `http://localhost:8000/api/match-jobs?keyword=${keyword}&location=${locationName}` : 
                `http://localhost:4000/api/jobs?keyword=${keyword}&location=${locationName}`;

            const response = await axios.get(url);
            setJobs(response.data.jobs || response.data);
            if (useSkills && response.data.userSkills) {
                setUserSkills(response.data.userSkills);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getJobs();
    }, [keyword, locationName, useSkills]);

    const [selectedJob, setSelectedJob] = useState(null);

    return (
        <div>
            {isLoading && <ProgressBar />}
            <div className="flex flex-col">
                {useSkills && userSkills.length > 0 && (
                    <p className="mb-4">Matching jobs with your skills: {userSkills.join(', ')}</p>
                )}
            <div className="flex">
                <div className="h-screen overflow-y-auto w-1/2">
                    {jobs.map((job, index) => (
                        <div key={index} className="p-5 cursor-pointer hover:bg-gray-200 border-b border-gray-200" 
                        onClick={() => setSelectedJob(job)}>
                            <p className="text-xl"><strong>Title:</strong> {job.title}</p>
                            <p className="text-md"><strong>Company:</strong> {job.company}</p>
                            <p className="text-md"><strong>Location:</strong> {job.location}</p>
                            <p className="text-md"><strong>Skill Match Score:</strong> {job.matchScore}</p>
                        </div>
                    ))}
                </div>
                {selectedJob && (
                    <div className="w-1/2 p-5 bg-gray-100">
                        <p className="text-xl font-bold mb-2">{selectedJob.title}</p>
                        <p className="text-md font-semibold mb-3">{selectedJob.company}</p>
                        <p className="text-md"><strong>Location:</strong> {selectedJob.location}</p>
                        <p className="text-sm"><strong>Description:</strong> {selectedJob.description}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
}

export default FetchData;

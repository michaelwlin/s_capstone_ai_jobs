import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "./LoadingBar";
import { useLocation } from 'react-router-dom';

function FetchData() {
    const [jobs, setJobs] = useState([]);
    const [userSkills, setUserSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const { keyword, location: locationName, useSkills, usersName } = location.state || {};
    
    const getJobs = async () => {
        setIsLoading(true);
        try {
            const url = `http://localhost:4000/api/jobs?keyword=${keyword}&location=${locationName}&usersName=${usersName}`;
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
    }, [keyword, locationName, useSkills, usersName]);

    const [selectedJob, setSelectedJob] = useState(null);

    return (
        <div>
            {isLoading && <ProgressBar />}
            <div className="flex flex-col">
                {/* {useSkills && userSkills.length > 0 && ( */}
                {useSkills && (
                <p className="mb-4">Matching jobs with your skills: {userSkills.join(', ')}</p>
                )}
            <div className="flex" style={{ maxHeight: 'calc(100vh - 400px)', overflow: 'hidden' }}>
                <div className="h-screen overflow-y-auto w-1/3" style={{ maxHeight: '100%' }}>
                    {jobs.map((job, index) => (
                        <div key={index} className="p-5 cursor-pointer hover:bg-gray-200 border-b border-gray-200" onClick={() => setSelectedJob(job)}>
                            <p className="text-xl" style={{ color: 'blue', fontWeight: 'bold' }}>{job.title}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontWeight: 'normal', margin: 0 }}>{job.company}</p>
                                <span style={{ fontStyle: 'italic' }}>{job.location}</span>
                            </div>
                            <p className="text-md"><strong>Matching Skills:</strong> {job.matchScore}</p>
                        </div>
                    ))}
                </div>
                {selectedJob && (
                    <div className="overflow-y-auto h-screen w-2/3 p-5 bg-gray-100"  style={{ maxHeight: '100%' }}>
                        <p className="text-xl mb-2" style={{ color: 'blue', fontWeight: 'bold' }}>{selectedJob.title}</p>
                        <p style={{ fontWeight: 'normal' }}>{selectedJob.company}</p>
                        <span style={{ fontStyle: 'italic', display: 'block', marginBottom: '1rem' }}>{selectedJob.location}</span>
                        <p style={{ display: 'block', marginBottom: '1rem' }}><strong>Employment Type:</strong> {selectedJob.employment_type}</p>
                        <p style={{ display: 'block', marginBottom: '1rem' }}><strong>Seniority Level:</strong> {selectedJob.seniority_level}</p>
                        <p><strong>Description:</strong></p>
                        <p style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>{selectedJob.description}</p>
                        <p><strong>Skills:</strong> {selectedJob.skills ? selectedJob.skills.join(', ') : 'N/A'}</p>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}

export default FetchData;

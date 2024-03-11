import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "./LoadingBar";

function FetchData(props) {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { keyword, location } = props;

    const getJobs = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/jobs'); // replace with your API endpoint
            const filteredJobs = response.data.filter(job => 
                job.title.toLowerCase().includes(keyword.toLowerCase()) && 
                job.location.toLowerCase().includes(location.toLowerCase())
            );
            setJobs(filteredJobs);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getJobs();
    }, []);

    // Represents the selected job
    const [selectedJob, setSelectedJob] = useState(null);

    return (
        <div>
            {isLoading && <ProgressBar/>}
            <div className="flex">
                <div className="h-screen overflow-y-auto w-1/2">
                    {jobs.map(job => (
                    <div key={job.id} className="p-5 cursor-pointer hover:bg-gray-200 border-b border-gray-200" 
                    onClick={() => setSelectedJob(job)}>
                        <p className="text-xl"><strong>Title:</strong> {job.title}</p>
                        <p className="text-md"><strong>Company:</strong> {job.company}</p>
                        <p className="text-md"><strong>Location:</strong> {job.location}</p>
                    </div>
                    ))}
                </div>
                {selectedJob && (
                    <div className="w-1/2 p-5 bg-gray-100">
                    <p className="text-xl font-bold mb-2">{selectedJob.title}</p>
                    <p className="text-md font-semibold mb-1">{selectedJob.company}</p>
                    <p className="text-sm font-semibold mb-3">{selectedJob.location}</p>
                    <p className="text-sm"><strong>Description:</strong> {selectedJob.description}</p>
                    </div>
                )}
                </div>
        </div>
    )
}

export default FetchData;
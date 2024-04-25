import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../clientConfig';

function FetchJob() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get(`${config.API_URL}/jobs/`, {
            credentials: 'include', // Necessary to include cookies
        })
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the jobs data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Jobs</h1>
            {jobs.map((job, index) => (
                <div key={index}>
                    <h2>Title: {job.title}</h2>
                    <p>Description: {job.description}</p>
                    <p>Status: {job.status}</p>
                    <p>Posted Date: {job.postedDate}</p>
                </div>
            ))}
        </div>
    );
}

export default FetchJob
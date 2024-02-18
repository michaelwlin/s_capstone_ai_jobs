import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import ProgressBar from "./LoadingBar";

function FetchData() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    console.log('message: ', jobs);
    useEffect(() => { 
        axios.get(`http://localhost:8000/api/scrape?keywords=${location.state.keyword}&location=${location.state.location}&limit=100`)
            .then( response => {
                setJobs(response.data.results);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false); // End loading
            });
        }, []);

        return (
            <div>
                {isLoading && <ProgressBar/>}
                {jobs.map((job, index) => (
                    <div key={index}>
                        <h2>Title: {job.title}</h2>
                        <p>Company: {job.company}</p>
                    </div>
            ))}
            </div>
        )
}

export default FetchData;
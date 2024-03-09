import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FetchApp() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/applications/')
            .then(response => {
                setApplications(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the applications data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Applications</h1>
            {applications.map((app, index) => (
                <div key={index}>
                    <h2>{app.user.username} - {app.job.title}</h2>
                    <p>Application Status: {app.status}</p>
                    <p>Application Date: {app.applicationDate}</p>
                </div>
            ))}
        </div>
    );
}

export default FetchApp
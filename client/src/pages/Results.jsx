/* This is the job search results page */
import React from 'react';
import FetchData from '../components/FetchData';
import { useLocation } from 'react-router-dom';

const Results = () => {
    const location = useLocation();
    const keyword = location.state?.keyword || '';
    const locationName = location.state?.location || '';

    return (
        <div className="container mx-auto p-4">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Job Search Results.
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            <FetchData keyword={keyword} location={locationName}/>
        </p>
        </div>
    )
}

export default Results;
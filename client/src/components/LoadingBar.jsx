import React, { useState, useEffect } from "react";

/* ProgressBar is a loading bar component shown to the user before displaying job search results*/
const ProgressBar = () => {
    // Set the initial progress to 0
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        // Simulate the progress increase
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
        }, 80);
        
        // Once the data is loaded, clear the interval
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="h-5 bg-purple-700 rounded-lg transition-width duration-100 ease-in-out"
            style={{
                width: `${progress}%`
            }}
            ></div>
        </div>
    );
};

export default ProgressBar;
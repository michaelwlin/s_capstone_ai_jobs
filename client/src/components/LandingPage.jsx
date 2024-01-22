import React from "react";

const LandingPage = () => {
    return(
        <div>
            <p>This is the Landing page! </p>
            <form>
                <input type="text" placeholder="keywords" />
                <input type="text" placeholder="location" />
                <button type="submit">Search</button>
            </form>
            <p>OR</p>
            <button>Upload Resume</button>
        </div>
    );
};

export default LandingPage;
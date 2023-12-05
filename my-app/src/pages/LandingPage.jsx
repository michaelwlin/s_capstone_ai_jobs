import React from "react";
import { Button } from 'flowbite-react';

const LandingPage = () => {
    return(
        <div>
            <p>Welcome to MatchIQ - Let's find you some jobs!</p>
            <form>
                <input type="text" placeholder="keywords" />
                <input type="text" placeholder="location" />
                <Button color="blue" type="submit">Search</Button>
            </form>
            <p>OR</p>
            <Button color="dark">Upload Resume</Button>
        </div>
    );
};

export default LandingPage;
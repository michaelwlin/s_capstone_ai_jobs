import React, { useState, useEffect } from "react";
import axios from "axios";

function FetchData() {
    const [message, setMessage] = useState('');
    console.log('message: ', message);
    useEffect(() => { 
        axios.get('http://localhost:8000/api/')
            .then( response => {
                setMessage(response.data.greeting);
            })
            .catch(error => {
                console.log(error);
            });
        }, []);

        return (
            <div>
                <h1>Message from the backend: {message}</h1>
            </div>
        )
}

export default FetchData;
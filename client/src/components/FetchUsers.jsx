import React, { useState, useEffect } from "react";
import axios from "axios";
import config from '../clientConfig';

function FetchUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${config.API_URL}/users/`, {
            credentials: 'include', // Necessary to include cookies
        })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            {users.map((user, index) => (
                <div key={index}>
                    <h2>Username: {user.username}</h2>
                    <p>Email: {user.email}</p>
                </div>
            ))}
        </div>
    );
}

export default FetchUsers
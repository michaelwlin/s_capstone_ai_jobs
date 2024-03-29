import React, { useState, useEffect } from "react";
import axios from "axios";

function FetchUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => { 
        axios.get(`http://localhost:8000/api/users/`)
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
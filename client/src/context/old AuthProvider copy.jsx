import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // Initial state could be null or an existing auth state

  // Context value that will be passed down to consuming components
  const value = { auth, setAuth };
  console.log("This is the Authprovider", auth)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const signIn = async (username, password) => {
//     // Implement your sign-in logic here, possibly sending a request to your server
//     // For demonstration, a simple fetch request is used
//     console.log("username=", username, "password", password);

//     fetch('http://localhost:5000/api/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include', // To send cookies with the request
//       body: JSON.stringify({ username, password }),
//     })
//       .then(response => {
//         if (response.ok) {
//           setIsAuthenticated(true);
//           // Possibly navigate to a dashboard or home page after successful login
//         } else {
//           console.error('Login failed.');
//           setIsAuthenticated(false);
//           // Handle login failure (e.g., incorrect credentials)
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         setIsAuthenticated(false);
//       })

//   };

//   const signOut = async () => {
//     // Implement your sign-out logic here
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/logout', {
//         method: 'POST',
//         credentials: 'include', // To send cookies with the request
//       });

//       if (response.ok) {
//         setIsAuthenticated(false);
//         // Possibly navigate to the login page or display a logged out message
//       } else {
//         console.error('Logout failed');
//       }
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   // Effect to check if the user is already authenticated (e.g., session or token exists)
//   useEffect(() => {
//     fetch('http://localhost:5000/api/auth/token', {
//       credentials: 'include', // To send cookies with the request
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setIsAuthenticated(data.isAuthenticated);
//       })
//       .catch((error) => console.error('Authentication check failed:', error));
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

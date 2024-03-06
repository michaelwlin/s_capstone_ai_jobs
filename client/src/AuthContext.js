import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);

  // Method to update state based on successful login/logout actions
  const signIn = (token) => setSignedIn(true);
  const signOut = () => setSignedIn(false);

  return (
    <AuthContext.Provider value={{ signedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
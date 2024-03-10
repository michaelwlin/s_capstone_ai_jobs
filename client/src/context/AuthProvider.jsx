import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

  const validateToken = useCallback(async () => {
    console.log("Validate Called");
    console.log("auth = ", auth)
    try {
      const response =
        await fetch('http://localhost:5000/api/auth/validate', {
          method: 'POST',
          credentials: 'include', // Necessary to include cookies
        });
      if (response.ok) {
        const data = await response.json();
        if (data.isAuthenticated) {
          setAuth({ isAuthenticated: true, user: data.user });

        } else {
          setAuth({ isAuthenticated: false, user: null });

        }
      } else {
        // If the token is invalid or not present, set auth to false
        setAuth({ isAuthenticated: false, user: null });

      }
    } catch (error) {
      console.error('Error validating token:', error);
      setAuth({ isAuthenticated: false, user: null });

    }
    console.log("auth end of validate = ", auth)
  }, []);

  useEffect(() => {
    validateToken();

    // Optional: Set an interval to periodically validate token
    // const interval = setInterval(validateToken, 15 * 60 * 1000); // Every 15 minutes
    const interval = setInterval(validateToken, 15 * 1000); // Every 15 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [validateToken]);

  // Include validateToken in the context value
  const value = { auth, setAuth, validateToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

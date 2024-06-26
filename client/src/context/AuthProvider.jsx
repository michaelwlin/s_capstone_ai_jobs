import { createContext, useState, useEffect, useCallback } from 'react'
import config from '../clientConfig';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    userId: null,
  })
  const [isLoading, setIsLoading] = useState(true) // Initialize loading state

  const validateToken = useCallback(async () => {
    setIsLoading(true)
    try {
      const response =
        await fetch(`${config.AUTH_URL}/validate`, {
          method: 'POST',
          credentials: 'include', // Necessary to include cookies
        });
      if (response.ok) {
        const data = await response.json()
        if (data.isAuthenticated) {
          setAuth({
            isAuthenticated: true,
            user: data.user,
            userId: data.userId,
          })
        } else {
          setAuth({ isAuthenticated: false, user: null, userId: null })
        }
      } else {
        // If the token is invalid or not present, set auth to false
        setAuth({ isAuthenticated: false, user: null, userId: null })
      }
    } catch (error) {
      console.error('Error validating token:', error)
      setAuth({ isAuthenticated: false, user: null, userId: null })
    } finally {
      setIsLoading(false) // Set loading to false after validation is complete
    }
  }, [])

  useEffect(() => {
    validateToken()

    // Optional: Set an interval to periodically validate token
    const interval = setInterval(validateToken, 15 * 60 * 1000) // Every 15 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [validateToken])

  // Include validateToken in the context value
  const value = { auth, setAuth, validateToken, isLoading }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

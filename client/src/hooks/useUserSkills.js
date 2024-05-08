import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const useUserSkills = () => {
  const { auth } = useAuth();
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserSkills = async () => {
      if (auth.isAuthenticated && auth.userId) {
        try {
          const response = await axios.get(`http://localhost:4000/api/users/${auth.userId}/skills`);
          setUserSkills(response.data);
          setError(null);
        } catch (err) {
          console.error('Error fetching user skills:', err);
          setError(err);
        }
      }
      setLoading(false);
    };

    fetchUserSkills();
  }, [auth.isAuthenticated, auth.userId]);

  return { userSkills, loading, error };
};

export default useUserSkills;

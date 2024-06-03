import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';
import { getCSRFToken } from '../api/csrfToken';

const useUserSkills = () => {
  const { auth } = useAuth();
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserSkills = async () => {
      if (auth.isAuthenticated && auth.userId) {
        try {
          const response = await axios.get(`http://localhost:4000/api/users/${auth.userId}/skills`, {
            withCredentials: true,
          });
          setUserSkills(response.data);
          setError(null);
        } catch (err) {
          console.error('Error fetching user skills:', err);
          setError(err);
        }
        setLoading(false);
      }
    };

    fetchUserSkills();
  }, [auth.isAuthenticated, auth.userId]);

  const addSkill = async (skill) => {
    const csrfToken = getCSRFToken();
    try {
      const response = await axios.post(`http://localhost:4000/api/users/${auth.userId}/skills`, { skill }, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      });
      setUserSkills(response.data);
    } catch (err) {
      console.error('Error adding skill:', err);
      setError(err);
    }
  };

  const updateSkill = async (index, skill) => {
    const csrfToken = getCSRFToken();
    try {
      const response = await axios.put(`http://localhost:4000/api/users/${auth.userId}/skills/${index}`, { skill }, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      });
      setUserSkills(response.data);
    } catch (err) {
      console.error('Error updating skill:', err);
      setError(err);
    }
  };

  const deleteSkill = async (index) => {
    const csrfToken = getCSRFToken();
    try {
      const response = await axios.delete(`http://localhost:4000/api/users/${auth.userId}/skills/${index}`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      });
      setUserSkills(response.data);
    } catch (err) {
      console.error('Error deleting skill:', err);
      setError(err);
    }
  };

  return { userSkills, setUserSkills, loading, error, addSkill, updateSkill, deleteSkill };
};

export default useUserSkills;

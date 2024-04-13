import { useState, useEffect } from 'react';
import axios from 'axios'

function SingleUserData(userId) {
    const [userData, setUserData] = useState(null);
    const [loadingUserData, setLoadingUserData] = useState(false);
    const [errorUserData, setErrorUserData] = useState(null);
  
    useEffect(() => {
      const fetchUserData = async () => {
        setLoadingUserData(true);
        try {
          const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
          setUserData(response.data); 
        } catch (error) {
          setErrorUserData(error);
        } finally {
          setLoadingUserData(false);
        }
      };
  
      if (userId) {
        fetchUserData();
      }
  
      return () => {
      
      };
    }, [userId]);
  
    return { userData, loadingUserData, errorUserData };
}

export default SingleUserData;

import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetAtoken: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        const response = await axios.get(`http://localhost:8000/getAtoken/?code=${code}`);
        localStorage.setItem('jwt_token', response.data.access_token);
        navigate('/home');
      }
    };
    fetchToken();
  }, [history]);

  return <div>Loading...</div>;
};

export { GetAtoken };

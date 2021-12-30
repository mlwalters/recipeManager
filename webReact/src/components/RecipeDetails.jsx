import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const [details, setDetails] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Recipe/${id}`);
        setDetails(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div>Oops! Could not fetch recipe details.</div>
    );
  }

  return (
    <Container maxWidth="sm">
      {details.name}
    </Container>
  );
};

export default RecipeDetails;

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Container from '@material-ui/core/Container';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

const RecipeCard = () => {
  const [details, setDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Recipe`);
        setDetails(data[1]);
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
    <Container maxWidth="sm">{details.name}</Container>
  );
};

export default RecipeCard;

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const RecipeCard = () => {
  const [details, setDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Recipe`);
        setDetails(data[0]);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div>Oops! Could not fetch recipe card.</div>
    );
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        width="100"
        image="https://images.unsplash.com/photo-1621955511667-e2c316e4575d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlZXNlY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
        alt="strawberry cheesecake"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {details.name}
        </Typography>
        <Typography variant="body2" color="secondary">
          {details.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" color="secondary">View Recipe</Button>
        <Button variant="outlined" size="small" color="secondary">Add to meal planner</Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;

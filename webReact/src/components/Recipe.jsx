import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Recipe = () => {
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
      <div>Oops! Could not fetch recipe details.</div>
    );
  }

  return (
    <Grid container>
      <Grid xs={2}>
        <Typography variant="h6" color="primary">
          Meal Planner
        </Typography>
      </Grid>
      <Grid xs={10}>
        <Grid item>
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
              <Typography variant="body2" color="text.secondary">
                {details.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small" color="secondary">View Recipe</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              width="100"
              image="https://images.unsplash.com/photo-1621955511667-e2c316e4575d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlZXNlY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
              alt="lentil soup"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {details.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {details.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small" color="secondary">View Recipe</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Recipe;

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const RecipeDetails = () => {
  // const [details, setDetails] = useState({});
  const [details, setDetails] = useState({
    name: '', description: '', notes: '', servingSize: 0, instructions: [],
  });
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs="10">
          <Item>
            <Typography variant="h2" color="#263238">{details.name}</Typography>
            <Typography variant="body2" color="text.secondary">{details.description}</Typography>
            <Typography variant="body2" color="text.secondary">
              Serving size:
              {' '}
              {details.servingSize}
            </Typography>
            <Typography variant="body2" color="text.secondary">{details.notes}</Typography>
            <Typography variant="body2" color="text.secondary">{details.instructions.name}</Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecipeDetails;

import axios from 'axios';
import React, { useEffect, useState } from 'react'; // useParams
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import LoadingDisplay from './sharedComponents/LoadingDisplay';
import BackToHomeBtn from './sharedComponents/BackToHomeBtn';
import SwitchImageCard from './sharedComponents/SwitchImageCard';

const RecipeCardList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Favorites/${user.email}`);
        setRecipes(data);
      } catch (err) {
        setError(err);
      }
      setLoadingState(false);
    };
    fetchData();
  }, []);

  if (loadingState) {
    return (
      <LoadingDisplay />
    );
  }

  if (error) {
    return (
      <div>Oops! Could not fetch recipe card.</div>
    );
  }

  return (
    <Container>
      <BackToHomeBtn />
      <Box sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: 'repeat(3, 1fr)',
        mt: 2,
        marginBottom: 5,
      }}
      >
        {recipes.map(({
          id, name, description, category,
        }) => (
          <Card sx={{ maxWidth: 345 }} key={id} raised>
            <CardHeader
              title={(
                <Link to={`/recipe/${id}`}>
                  <Typography
                    variant="h5"
                    color="#263238"
                  >
                    {name}
                  </Typography>
                </Link>
            )}
              subheader={category}
            />
            <CardMedia
              component="img"
              height="194"
                // image={imageUrl === '' ? switchImageCard(category) : `${imageUrl}`}
              image={SwitchImageCard(category)}
              alt={`Picture of ${category}`}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default RecipeCardList;

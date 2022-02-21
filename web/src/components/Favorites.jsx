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

import beef from '../assets/categories/beef.jpg';
import bread from '../assets/categories/bread.jpg';
import dessert from '../assets/categories/dessert.jpg';
import dipssauces from '../assets/categories/dipssauces.jpg';
import soup from '../assets/categories/soup.jpg';
import pork from '../assets/categories/pork.jpg';
import drinks from '../assets/categories/drinks.jpg';
import salad from '../assets/categories/salad.jpg';
import poultry from '../assets/categories/poultry.jpg';
import vegetarian from '../assets/categories/vegetarian.jpg';
import seafood from '../assets/categories/seafood.jpg';
import sides from '../assets/categories/sides.jpg';
import BackToHomeBtn from './sharedComponents/BackToHomeBtn';

const RecipeCardList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth0();
  // const { email } = user;

  const switchImageCard = (category) => {
    switch (category) {
      case 'Dessert':
        return `${dessert}`;
      case 'Drinks':
        return `${drinks}`;
      case 'Soup':
        return `${soup}`;
      case 'Seafood':
        return `${seafood}`;
      case 'Beef':
        return `${beef}`;
      case 'Pork':
        return `${pork}`;
      case 'Poultry':
        return `${poultry}`;
      case 'Salad':
        return `${salad}`;
      case 'Sauces':
        return `${dipssauces}`;
      case 'Sides':
        return `${sides}`;
      case 'Bread':
        return `${bread}`;
      case 'Vegetarian':
        return `${vegetarian}`;
      default:
        return 'https://cdn.pixabay.com/photo/2015/10/02/15/59/olive-oil-968657_960_720.jpg';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Favorites`);
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
    isAuthenticated && (
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
                image={switchImageCard(category)}
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
    )
  );
};

export default RecipeCardList;

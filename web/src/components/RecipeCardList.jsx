import axios from 'axios';
import React, { useEffect, useState } from 'react'; // useParams
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import { red } from '@mui/material/colors';
import DeleteDialogBox from './DeleteDialogBox';
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

const RecipeCardList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [favoriteError, setFavoriteError] = useState(null);
  const [open, setOpen] = useState(false);
  const [favoriteToggle, setFavoriteToggle] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  // const { email } = user;
  // const filteredRecipes = recipes.filter((recipe) => recipe.UserEmail === email);
  // const { id } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => setOpen(false);

  const handleDelete = (id) => {
    setOpen(false);
    const deleteData = async () => {
      try {
        const { data } = await axios
          .delete(`${process.env.REACT_APP_BASE_API}/api/Recipe/${id}`);
        setRecipes(data);
      } catch (err) {
        setDeleteError(err);
      }
    };
    deleteData();
  };

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

  const handleClickFavorite = async (id) => {
    if (favoriteToggle) {
      setFavoriteToggle(false);
    } else {
      setFavoriteToggle(true);
    }
    try {
      const recipeToUpdate = recipes.find((recipe) => recipe.id === id);
      const request = { ...recipeToUpdate, favorite: favoriteToggle, userEmail: user.email };
      const { data } = await axios.put(`${process.env.REACT_APP_BASE_API}/api/Recipe/${id}`, request);
      setRecipes(data);
    } catch (favoriteErr) {
      setFavoriteError('Oops! Could not save recipe as favorite.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Recipe`, user.email);
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

  if (deleteError) {
    return (
      <Box m="4">
        <Typography>Oops! Could not delete recipe.</Typography>
        <br />
        <Chip variant="outlined" color="primary" label="Back to recipes" onClick={window.location.reload} />
      </Box>
    );
  }

  return (
    isAuthenticated && (
    <Box sx={{
      display: 'grid',
      gap: 3,
      gridTemplateColumns: 'repeat(3, 1fr)',
    }}
    >
      {recipes.map(({
        id, name, description, category, favorite,
      }) => (
        <Card sx={{ maxWidth: 345 }} key={id} raised>
          {open && <DeleteDialogBox onCancel={handleCancel} onDelete={() => handleDelete(id)} />}
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
          <CardActions disableSpacing>
            <Tooltip title="Favorite">
              <IconButton aria-label="favorite" onClick={() => handleClickFavorite(id)} data-testid="favorite icon">
                {/* <FavoriteIcon /> */}
                {/* sx={{ color: red[400] }}  */}
                {favorite === true ? <FavoriteIcon sx={{ color: red[400] }} /> : <FavoriteIcon /> }
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            {!!error && <Alert severity="error">{error}</Alert>}
            {!!favoriteError && <Alert severity="error">{favoriteError}</Alert>}
            {!!deleteError && <Alert severity="error">{deleteError}</Alert>}
          </CardActions>
        </Card>
      ))}
    </Box>
    )
  );
};

export default RecipeCardList;

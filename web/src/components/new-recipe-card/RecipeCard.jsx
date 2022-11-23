import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { red } from '@mui/material/colors';
import DeleteDialogBox from '../DeleteDialogBox';
import LoadingDisplay from '../loading-display/LoadingDisplay';
import SwitchImageCard from '../SwitchImageCard';
import './RecipeCard.css';
import NotFound from '../error-msgs/NotFound';
import Toast, { variants } from '../toast/Toast';
// import { useToggle } from '../useToggle';

const RecipeCard = () => {
  const [recipes, setRecipes] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [open, setOpen] = useState(false);
  const [favoriteToggle, setFavoriteToggle] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState(variants.info);
  const { user } = useAuth0();
  // const { status: favoriteToggle, toggleStatus: setFavoriteToggle } = useToggle();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => setOpen(false);

  const handleDelete = (id) => {
    setOpen(false);
    const deleteData = async () => {
      try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BASE_API}/api/Recipe/${id}`);
        setRecipes(data);
        setToastMessage('Recipe has been deleted');
        setToastVariant(variants.info);
      } catch (err) {
        setToastMessage('Oops! Could not delete recipe, try again');
        setToastVariant(variants.error);
      }
    };
    deleteData();
  };

  const handleClickFavorite = async (id) => {
    const recipeToUpdate = recipes.find((recipe) => recipe.id === id);
    try {
      setFavoriteToggle((toggle) => !toggle);
      const request = { ...recipeToUpdate, favorite: favoriteToggle, userEmail: user.email };
      const { data } = await axios.put(`${process.env.REACT_APP_BASE_API}/api/Recipe/${id}`, request);
      setRecipes(data);
      if (!recipeToUpdate.favorite) {
        setToastMessage('Recipe saved in Favorites');
        setToastVariant(variants.success);
      } else {
        setToastMessage('Recipe removed from Favorites');
        setToastVariant(variants.info);
      }
    } catch (favoriteErr) {
      if (!recipeToUpdate.favorite) {
        setToastMessage('Oops! Could not save recipe in Favorites, try again');
      } else {
        setToastMessage('Oops! Could not delete recipe from Favorites, try again');
      }
      setToastVariant(variants.error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Recipe/All/${user.email}`);
        setRecipes(data);
      } catch (err) {
        setFetchError(err);
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

  if (fetchError) {
    return (
      <NotFound />
    );
  }

  return (
    <Box sx={{
      display: 'grid',
      gap: 3,
      gridTemplateColumns: 'repeat(3, 1fr)',
      marginBottom: 5,
    }}
    >
      {recipes.map(({
        id, name, category, description, favorite, imageUrl,
      }) => (
        <Card
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            p: 1.5,
            borderRadius: 5,
          }}
          key={id}
          xs={1}
          raised
        >
          {open && <DeleteDialogBox onCancel={handleCancel} onDelete={() => handleDelete(id)} />}
          {imageUrl === null || imageUrl === '' ? (
            <CardMedia
              component="img"
              image={SwitchImageCard(category)}
              sx={{ width: 100, borderRadius: 2 }}
              alt={`Picture of ${category}`}
            />
          ) : (
            <CardMedia
              component="img"
              sx={{ width: 100, borderRadius: 2 }}
              image={imageUrl}
              alt={`Picture of ${category}`}
            />
          )}
          <Box sx={{
            display: 'flex', width: '70%', flexDirection: 'column',
          }}
          >
            <CardContent className="card-view-text line-clamp" sx={{ flex: '1 0 auto' }}>
              <Link to={`/recipe/${id}`}>
                <Typography variant="subtitle1" color="text.primary" component="div">
                  {name}
                </Typography>
              </Link>
              <Typography variant="button" color="text.secondary" component="div">
                {category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
            <Box sx={{
              display: 'flex', alignItems: 'center', p: 1, justifyContent: 'flex-end',
            }}
            >
              <Tooltip title="Favorite">
                <IconButton aria-label="favorite" onClick={() => handleClickFavorite(id)} data-testid="favorite icon" size="small">
                  {favorite === true
                    ? <FavoriteIcon sx={{ color: red[400], fontSize: 20 }} />
                    : <FavoriteIcon sx={{ fontSize: 20 }} /> }
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={handleClickOpen} size="small">
                  <DeleteIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Card>
      ))}
      <Toast
        onClose={() => setToastMessage('')}
        message={toastMessage}
        variant={toastVariant}
      />
    </Box>
  );
};

export default RecipeCard;

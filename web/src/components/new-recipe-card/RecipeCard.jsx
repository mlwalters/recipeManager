import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
// import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import { red } from '@mui/material/colors';
import DeleteDialogBox from '../DeleteDialogBox';
import LoadingDisplay from '../loading-display/LoadingDisplay';
import SwitchImageCard from '../SwitchImageCard';
import './RecipeCard.css';

const RecipeCard = () => {
  const [recipes, setRecipes] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [favoriteError, setFavoriteError] = useState(null);
  const [open, setOpen] = useState(false);
  const [favoriteToggle, setFavoriteToggle] = useState(false);
  const { user } = useAuth0();

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

  const handleClickFavorite = async (id) => {
    try {
      if (favoriteToggle) {
        setFavoriteToggle(false);
      } else {
        setFavoriteToggle(true);
      }
      const recipeToUpdate = recipes.find((recipe) => recipe.id === id);
      const request = { ...recipeToUpdate, favorite: favoriteToggle, userEmail: user.email };
      const { data } = await axios.put(`${process.env.REACT_APP_BASE_API}/api/Recipe/${id}`, request);
      setRecipes(data);
    } catch (favoriteErr) {
      setFavoriteError(<Typography variant="h6">Oops! Could not save recipe as favorite.</Typography>);
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
      <Typography variant="h5">Oops! Could not fetch recipe cards.</Typography>
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
              sx={{ width: 100 }}
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
      {!!fetchError && <Alert severity="error">{fetchError}</Alert>}
      {!!favoriteError && <Alert severity="error">{favoriteError}</Alert>}
      {!!deleteError && <Alert severity="error">{deleteError}</Alert>}
    </Box>
  );
};

export default RecipeCard;

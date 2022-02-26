import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import { red } from '@mui/material/colors';
import DeleteDialogBox from './DeleteDialogBox';
import LoadingDisplay from './sharedComponents/LoadingDisplay';
import SwitchImageCard from './sharedComponents/SwitchImageCard';
import './CardView.css';

const RecipeCardList = () => {
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
        id, name, description, category, favorite, imageUrl,
      }) => (
        <Card sx={{ width: 325, height: 405 }} key={id} xs={1} raised>
          {open && <DeleteDialogBox onCancel={handleCancel} onDelete={() => handleDelete(id)} />}
          <CardHeader
            title={(
              <Link to={`/recipe/${id}`}>
                <Typography
                  variant="h6"
                  color="#263238"
                >
                  {name}
                </Typography>
              </Link>
            )}
            subheader={<Typography variant="body2" color="text.secondary">{category}</Typography>}
          />
          {imageUrl === null || imageUrl === '' ? (
            <CardMedia
              component="img"
              height="194"
              image={SwitchImageCard(category)}
              alt={`Picture of ${category}`}
            />
          ) : (
            <CardMedia
              component="img"
              height="194"
              image={imageUrl}
              alt={`Picture of ${category}`}
            />
          )}
          <CardContent className="card-view-text line-clamp">
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Tooltip title="Favorite">
              <IconButton aria-label="favorite" onClick={() => handleClickFavorite(id)} data-testid="favorite icon">
                {favorite === true ? <FavoriteIcon sx={{ color: red[400] }} /> : <FavoriteIcon /> }
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      ))}
      {!!fetchError && <Alert severity="error">{fetchError}</Alert>}
      {!!favoriteError && <Alert severity="error">{favoriteError}</Alert>}
      {!!deleteError && <Alert severity="error">{deleteError}</Alert>}
    </Box>
  );
};

export default RecipeCardList;

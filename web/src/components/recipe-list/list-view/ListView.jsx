import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import {
  Alert, IconButton, Paper, Tooltip,
} from '@mui/material';
import { red } from '@mui/material/colors';
import LoadingDisplay from '../../loading-display/LoadingDisplay';
import DeleteDialogBox from '../../DeleteDialogBox';
import SwitchImageCard from '../../SwitchImageCard';

const RecipeListView = () => {
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

  return (
    <Paper elevation={3} sx={{ paddingTop: 2, paddingBottom: 3, paddingRight: 2 }}>
      {recipes.map(({
        id, name, description, category, favorite, imageUrl,
      }) => (
        <List sx={{ width: '100%' }} key={id}>
          {open && <DeleteDialogBox onCancel={handleCancel} onDelete={() => handleDelete(id)} />}
          <ListItem alignItems="flex-start">
            <Link to={`/recipe/${id}`}>
              <ListItemAvatar>
                {imageUrl === null || imageUrl === ''
                  ? (
                    <Avatar
                      alt={name}
                      src={SwitchImageCard(category)}
                      sx={{ width: 56, height: 56 }}
                    />
                  )
                  : (
                    <Avatar alt={name} src={imageUrl} sx={{ width: 56, height: 56 }} />
                  )}
              </ListItemAvatar>
            </Link>
            <ListItemText
              primary={<Link to={`/recipe/${id}`}>{name}</Link>}
              sx={{ pl: 2 }}
              secondary={(
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {category}
                  </Typography>
                  {`    ${description}`}
                </>
          )}
            />
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
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}
      {!!fetchError && <Alert severity="error">{fetchError}</Alert>}
      {!!favoriteError && <Alert severity="error">{favoriteError}</Alert>}
      {!!deleteError && <Alert severity="error">{deleteError}</Alert>}
    </Paper>
  );
};

export default RecipeListView;

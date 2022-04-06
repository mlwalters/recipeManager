import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Card from '@mui/material/Card';
// import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { red } from '@mui/material/colors';
import DeleteDialogBox from './DeleteDialogBox';
// import LoadingDisplay from './sharedComponents/LoadingDisplay';
import SwitchImageCard from './sharedComponents/SwitchImageCard';
import './CardView.css';

const RecipeCard = ({ id, title, description, category, favorite }) => {
  const [favoriteToggle, setFavoriteToggle] = useState(false);
  const [favoriteError, setFavoriteError] = useState(null);

  const { user } = useAuth0();

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

  return (
    <Card sx={{ width: 325, height: 405 }} key={id} xs={1} raised>
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
  );
};

export default RecipeCard;

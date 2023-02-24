import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import DeleteDialogBox from '../../sharedComponents/DeleteDialogBox';
import SwitchImageCard from '../../sharedComponents/SwitchImageCard';
import './RecipeCard.css';

const RecipeCard = ({
  allRecipes,
  handleFavoriteRecipe,
  isDeleteOpen,
  handleCancelDeleteDialog,
  handleClickDeleteDialog,
  handleDeleteRecipe,
}) => (
  <Box sx={{
    display: 'grid',
    gap: 3,
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginBottom: 5,
  }}
  >
    {allRecipes.map(({
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
              <IconButton aria-label="favorite" onClick={() => handleFavoriteRecipe(id)} data-testid="favorite icon" size="small">
                {favorite === true
                  ? <FavoriteIcon sx={{ color: red[400], fontSize: 20 }} />
                  : <FavoriteIcon sx={{ fontSize: 20 }} /> }
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={() => handleClickDeleteDialog(id)} size="small">
                <DeleteIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
            {isDeleteOpen && (
            <DeleteDialogBox
              onCancel={handleCancelDeleteDialog}
              onDelete={() => handleDeleteRecipe()}
            />
            )}
          </Box>
        </Box>
      </Card>
    ))}
  </Box>
);

RecipeCard.defaultProps = {
  allRecipes: [],
  handleFavoriteRecipe: undefined,
  isDeleteOpen: undefined,
  handleClickDeleteDialog: undefined,
  handleCancelDeleteDialog: undefined,
  handleDeleteRecipe: undefined,
};

RecipeCard.propTypes = {
  allRecipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    favorite: PropTypes.bool,
    imageUrl: PropTypes.string,
  })),
  handleFavoriteRecipe: PropTypes.func,
  isDeleteOpen: PropTypes.bool,
  handleClickDeleteDialog: PropTypes.func,
  handleCancelDeleteDialog: PropTypes.func,
  handleDeleteRecipe: PropTypes.func,
};

export default RecipeCard;

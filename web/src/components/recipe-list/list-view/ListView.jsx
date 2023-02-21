import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { red } from '@mui/material/colors';
import DeleteDialogBox from '../../sharedComponents/DeleteDialogBox';
import SwitchImageCard from '../../sharedComponents/SwitchImageCard';

const RecipeListView = ({
  allRecipes,
  handleFavoriteRecipe,
  isDeleteOpen,
  handleCancelDeleteDialog,
  handleClickDeleteDialog,
  handleDeleteRecipe,
}) => (
  <Paper elevation={3} sx={{ paddingTop: 2, paddingBottom: 3, paddingRight: 2 }}>
    {allRecipes.map(({
      id, name, description, category, favorite, imageUrl,
    }) => (
      <List sx={{ width: '100%' }} key={id}>
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
            <IconButton aria-label="favorite" onClick={() => handleFavoriteRecipe(id)} data-testid="favorite icon">
              {favorite === true ? <FavoriteIcon sx={{ color: red[400] }} /> : <FavoriteIcon /> }
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleClickDeleteDialog(id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          {isDeleteOpen && (
          <DeleteDialogBox
            onCancel={handleCancelDeleteDialog}
            onDelete={() => handleDeleteRecipe(id)}
          />
          )}
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    ))}
  </Paper>
);

RecipeListView.defaultProps = {
  allRecipes: [],
  handleFavoriteRecipe: undefined,
  isDeleteOpen: undefined,
  handleClickDeleteDialog: undefined,
  handleCancelDeleteDialog: undefined,
  handleDeleteRecipe: undefined,
};

RecipeListView.propTypes = {
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

export default RecipeListView;

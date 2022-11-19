import axios from 'axios';
import React, { useEffect, useState } from 'react'; // useParams
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
// import Chip from '@mui/material/Chip';
// import IconButton from '@mui/material/IconButton';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Tooltip from '@mui/material/Tooltip';
// import { red } from '@mui/material/colors';
// import DeleteDialogBox from '../../components/DeleteDialogBox';
import BackToHomeBtn from '../../components/navigation/back-to-home/BackToHomeBtn';
import LoadingDisplay from '../../components/loading-display/LoadingDisplay';
import SwitchImageCard from '../../components/new-recipe-card/RecipeCard';
import '../../components/recipe-list/card-view/CardView.css';
import NotFound from '../../components/error-msgs/NotFound';

const FavoritesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  // const [deleteError, setDeleteError] = useState(null);
  // const [favoriteError, setFavoriteError] = useState(null);
  // const [open, setOpen] = useState(false);
  // const [favoriteToggle, setFavoriteToggle] = useState(false);
  // const { status: favoriteToggle, toggleStatus: setFavoriteToggle } = useToggle();
  const { user } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Favorites/${user.email}`);
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
          id, name, description, category, imageUrl,
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
            raised
          >
            {imageUrl === null || imageUrl === '' ? (
              <CardMedia
                component="img"
                sx={{ width: 100, borderRadius: 2 }}
                image={SwitchImageCard(category)}
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
            </Box>
          </Card>
        ))}
        {!!fetchError && <Alert severity="error">{fetchError}</Alert>}
      </Box>
    </Container>
  );
};

export default FavoritesList;

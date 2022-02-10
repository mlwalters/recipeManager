import axios from 'axios';
import React, { useEffect, useState } from 'react'; // useParams
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';// import { useAuth0 } from '@auth0/auth0-react';
import LoadingDisplay from './sharedComponents/LoadingDisplay';
// import DeleteDialogBox from './DeleteDialogBox';

const RecipeCardList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [error, setError] = useState(null);
  // const [open, setOpen] = useState(false);
  // const { id } = useParams();

  // const { isAuthenticated, isLoading, user} = useAuth0();
  // const { name, picture, email } = user; // or just use user.email

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleCancel = () => setOpen(false);

  // const handleDelete = () => {
  //   setOpen(false);
  //   const deleteData = async () => {
  //     try {
  //       const { data } = await axios
  //         .delete(`${process.env.REACT_APP_BASE_API}/api/PracticeMembers/${id}`);
  //       setRecipes(data);
  //     } catch (err) {
  //       setError(err);
  //     }
  //   };
  //   deleteData();
  // };

  useEffect(() => {
    const fetchData = async () => {
      // isAuthenticated && email
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Recipe`);
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
    <Box sx={{
      display: 'grid',
      gap: 3,
      gridTemplateColumns: 'repeat(3, 1fr)',
    }}
    >
      {/* {open && <DeleteDialogBox onCancel={handleCancel} onDelete={handleDelete} />} */}
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
            image="https://images.unsplash.com/photo-1621955511667-e2c316e4575d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlZXNlY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
            alt="Strawberry cheesecake"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              {/* <DeleteIcon /> onClick={handleClickOpen} */}
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default RecipeCardList;

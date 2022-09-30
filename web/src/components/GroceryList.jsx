import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import LoadingDisplay from './loading-display/LoadingDisplay';

// import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
// import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
// import IconButton from '@mui/material/IconButton';
// import CommentIcon from '@mui/icons-material/Comment';

const GroceryList = () => {
  const [groceryItems, setGroceryItems] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [checked, setChecked] = useState([0]);
  const { user } = useAuth0();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/GroceryList/All/${user.email}`);
        setGroceryItems(data);
        // eslint-disable-next-line no-console
        console.log(groceryItems);
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
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {groceryItems.map(({ id, name }) => (
        // const labelId = `<checkbox-list-label-1>${id}</checkbox-list-label-1>`;
        <ListItem
          key={id}
          secondaryAction={(
            <IconButton edge="end" aria-label="comments">
              <CommentIcon />
            </IconButton>
            )}
          disablePadding
        >
          <ListItemButton role={Button} onClick={handleToggle(id)} dense>
            <ListItemIcon>
              <Checkbox
                // icon={<CircleUnchecked />}
                // checkedIcon={<CircleCheckedFilled />}
                edge="start"
                checked={checked.indexOf(id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': id }}
              />
            </ListItemIcon>
            <ListItemText id={id} primary={name}>{name}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
      {!!fetchError && <Alert severity="error">{fetchError}</Alert>}
    </List>
  );
};

export default GroceryList;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
// import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const GroceryList = ({ items, fetchError }) => {
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      // eslint-disable-next-line no-console
      console.log(checked);
    } else {
      newChecked.splice(currentIndex, 1);
      // eslint-disable-next-line no-console
      console.log(checked);
    }
    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {items.map(({ id, name }) => (
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
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
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

GroceryList.defaultProps = {
  fetchError: true,
  items: [],
};

GroceryList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      checked: PropTypes.bool,
      userEmail: PropTypes.string,
    }),
  ),
  fetchError: PropTypes.string,
};

export default GroceryList;

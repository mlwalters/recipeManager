import React, { useState } from 'react';
// import React from 'react';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const GroceryList = ({ items }) => {
  const newItems = items;
  // const handleToggle = (value) => {
  //   const [checked, setChecked] = useState(false);
  //   setChecked((prevStatus) => !prevStatus);
  //   console.log(checked);
  // };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {newItems.map(({ id, name, isChecked }) => (
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
          <ListItemButton role={Button} onClick={handleToggle((prevStatus) => !prevStatus)} dense>
            <ListItemIcon>
              <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                edge="start"
                checked={isChecked}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': id }}
              />
            </ListItemIcon>
            <ListItemText id={id} primary={name}>{name}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

GroceryList.defaultProps = {
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
};

export default GroceryList;

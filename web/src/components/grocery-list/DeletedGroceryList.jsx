import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const DeletedGroceryList = ({ deletedItems }) => {
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
    <List sx={{
      width: '100%', maxWidth: 360, bgcolor: 'background.paper', color: 'grey.500',
    }}
    >
      {deletedItems.map(({ id, name }) => (
        // const labelId = `<checkbox-list-label-1>${id}</checkbox-list-label-1>`;
        <ListItem
          key={id}
          secondaryAction={(
            <IconButton edge="end" aria-label="delete-item">
              <ClearIcon />
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
    </List>
  );
};

DeletedGroceryList.defaultProps = {
  deletedItems: [],
};

DeletedGroceryList.propTypes = {
  deletedItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      checked: PropTypes.bool,
      userEmail: PropTypes.string,
    }),
  ),
};

export default DeletedGroceryList;

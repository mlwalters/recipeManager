import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Paper, Box } from '@mui/material';
import ListView from './ListView';
import CardView from './CardView';

export default function ToggleButtonView() {
  const [view, setView] = React.useState('card');

  return (
    <Paper>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(event, newView) => {
          setView(newView);
        }}
      >
        <ToggleButton aria-label="list" value="list">
          <ViewListIcon />
        </ToggleButton>
        <ToggleButton aria-label="module" value="card">
          <ViewModuleIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      {view === 'list' ? (
        <Box>
          <ListView />
        </Box>
      ) : (
        <Box>
          <CardView />
        </Box>
      )}
    </Paper>
  );
}

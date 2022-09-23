import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Paper, Box, Typography } from '@mui/material';
import ListView from './recipe-list/list-view/ListView';
// import CardView from './recipe-list/card-view/CardView';
import RecipeCard from './new-recipe-card/RecipeCard';

export default function ToggleButtonView() {
  const [view, setView] = React.useState('card');

  return (
    <Paper sx={{ padding: 2 }} elevation={0}>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(event, newView) => {
          setView(newView);
        }}
        sx={{ padding: 1.5 }}
      >
        <ToggleButton aria-label="module" value="card">
          <ViewModuleIcon />
        </ToggleButton>
        <ToggleButton aria-label="list" value="list">
          <ViewListIcon />
        </ToggleButton>
        <Box sx={{ paddingTop: 1, paddingLeft: 1.5 }}>
          <Typography variant="h5">View All</Typography>
        </Box>
      </ToggleButtonGroup>
      {view === 'list' ? (
        <Box>
          <ListView />
        </Box>
      ) : (
        <Box>
          <RecipeCard />
        </Box>
      )}
    </Paper>
  );
}

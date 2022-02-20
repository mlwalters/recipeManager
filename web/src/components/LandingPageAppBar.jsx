import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import LoginButton from './LoginButton';
import logo from '../assets/shared-images/loadingLogo.jpg';

export default function LandingPageAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShawdow: 1 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="Big Bite logo" height="80px" p="1" data-testid="logo" />
          <Typography sx={{ color: '#313438' }}>Features</Typography>
          <Typography sx={{ color: '#313438' }}>About</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

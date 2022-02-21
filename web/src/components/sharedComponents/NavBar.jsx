import * as React from 'react';
import { Link } from 'react-router-dom';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import Profile from '../Authentication/Profile';
import logo from '../../assets/shared-images/loadingLogo.jpg';
// import AddCircleIcon from '@mui/icons-material/AddCircle';

// const theme = createTheme({
//   components: {
//     // Name of the component ⚛️
//     MuiTypography: {
//       styleOverrides: {
//         // Name of the slot
//         root: {
//           // Some CSS
//           color: 'black',
//         },
//       },
//     },
//   },
// });
const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
  // <ThemeProvider theme={theme}>
    <AppBar position="sticky" sx={{ backgroundColor: '#ffffff', boxShawdow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/home">
            <img src={logo} alt="Big Bite logo" height="80px" p="1" data-testid="logo" />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/home">
                  <Typography component="span" variant="body">
                    Recipe Collection
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                my: 2, display: 'block', fontSize: '1rem',
              }}
            >
              <Link
                to="/home"
                sx={{
                  textDecoration: 'none',
                }}
              >
                <Typography component="span" variant="body">My Recipes</Typography>
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{
                my: 2, display: 'block', fontSize: '1rem',
              }}
            >
              <Link to="/favorites">
                <Typography component="span" variant="body" underline="none">Favorites</Typography>
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: '#313438', display: 'block' }}
            >
              <Typography component="span">
                Shopping List
              </Typography>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon alt="account settings" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center"><LoginButton /></Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center"><Profile /></Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center"><LogoutButton /></Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  // </ThemeProvider>
  );
};
export default NavBar;

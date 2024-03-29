import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

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
import { Avatar } from '@mui/material';
import LoginButton from '../authentication/LoginButton';
import LogoutButton from '../authentication/LogoutButton';
import Profile from '../authentication/Profile';
import logo from '../../assets/shared-images/loadingLogo.jpg';

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { isAuthenticated, user } = useAuth0();

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
    <AppBar position="sticky" sx={{ backgroundColor: '#ffffff', boxShawdow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/home">
            <img src={logo} alt="Big Bite logo" height="80px" p="1" data-cy="logo" />
          </Link>

          {isAuthenticated && (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon sx={{ color: '#313438' }} />
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
                    display: { xs: 'block', md: 'none', color: '#313438' },
                  }}
                  data-cy="menu"
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/home">
                      <Typography component="span" variant="body">
                        My Recipes
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/favorites">
                      <Typography component="span" variant="body">Favorites</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/grocerylist">
                      <Typography component="span" variant="body">Grocery List</Typography>
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
                    <Typography component="span" variant="body">Favorites</Typography>
                  </Link>
                </Button>
                <Tooltip title="Upcoming feature!" placement="top">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: '#313438', display: 'block' }}
                  >
                    <Link to="/grocerylist">
                      <Typography component="span">Grocery List</Typography>
                    </Link>
                  </Button>
                </Tooltip>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {user.picture == null ? <AccountCircleIcon alt="Settings" /> : (
                      <Avatar
                        alt="User Avatar"
                        src={user.picture}
                        sx={{ width: 56, height: 56 }}
                      />
                    )}

                    <div>
                      <Typography component="span" variant="body1" marginLeft={1}>
                        Hello,
                        {' '}
                        {user.name}
                        !
                      </Typography>
                    </div>
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
                    <Typography textAlign="center" component="div"><Profile /></Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center"><LogoutButton /></Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;

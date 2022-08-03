import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@mui/material';
import LoadingDisplay from '../loading-display/LoadingDisplay';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingDisplay />;
  }

  return (
    isAuthenticated && (
      <>
        <Typography component="p" variant="text.secondary">
          Account:
          {' '}
          {user.name}
        </Typography>
        <Typography component="p" variant="text.secondary">
          {user.email}
        </Typography>
      </>
    )
  );
};

export default Profile;

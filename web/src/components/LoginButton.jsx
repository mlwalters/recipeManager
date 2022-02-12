import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect, error } = useAuth0();

  if (error) {
    return `Oops, ${error.message}.`;
  }
  return (
    !isAuthenticated
    && (
    <Button onClick={() => loginWithRedirect()}>
      Log In
    </Button>
    )
  );
};

export default LoginButton;

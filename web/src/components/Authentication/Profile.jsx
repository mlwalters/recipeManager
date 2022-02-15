import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingDisplay from '../sharedComponents/LoadingDisplay';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingDisplay />;
  }

  return (
    isAuthenticated && (
      <>
        <img src={user.picture} alt={user.name} />
        <p>{user.name}</p>
        <p>{user.email}</p>
      </>
    )
  );
};

export default Profile;

import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { IsAuthenticated, IsLoggedIn } from './credentialsService';

function AuthGuard({protectedPath, children }) {
  const location = useLocation();
  const isAuthenticated = IsAuthenticated();
  const isLoggedIn = IsLoggedIn();
  const url = `/?redirectUrl=${location?.pathname}`;
  
  // useEffect(()=> {
  //   console.clear()
  // },[location?.pathname])
  return (
    <div className='w-full'>
      {protectedPath ? (
        !(isAuthenticated && isLoggedIn) ? (
          children
        ) : (
          <Navigate replace to={url} />
        )
      ) : (
        children
      )}
    </div>
  );
}

export default AuthGuard;

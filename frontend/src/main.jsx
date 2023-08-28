import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';

const root = createRoot(document.getElementById('root'));

function Auth0Wrapper() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  
  useEffect(() => {
    if (!isAuthenticated) {
      // Attempt to restore previous authentication from localStorage
      const token = localStorage.getItem('authToken');
      if (token) {
        // Set the token in Auth0's cache
        loginWithRedirect({
          appState: { targetUrl: 'https://classroom.everyonestem.org' }, // Redirect back to the current page after login
          initialScreen: 'login',
          extraState: { useRefreshTokens: true }, // This helps retain the session
        });
      }
    }
  }, [isAuthenticated, loginWithRedirect]);

  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
}

root.render(
  <Auth0Provider
    domain="dev-kpnci3ue6fweb61n.us.auth0.com"
    clientId="83Xw8IxkjSvECpBGgp7ib0EWTTfs1zRM"
    authorizationParams={{
      redirect_uri: 'https://classroom.everyonestem.org',
    }}
    cacheLocation="localstorage"
  >
    <Auth0Wrapper />
  </Auth0Provider>
);

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
          appState: { targetUrl: window.location.pathname }, // Redirect back to the current page after login
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
    domain="everyonestem.us.auth0.com"
    clientId="iTBp10mQvziQhfGxOb1rZ8MAzqhQX67r"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    cacheLocation="localstorage"
  >
    <Auth0Wrapper />
  </Auth0Provider>
);

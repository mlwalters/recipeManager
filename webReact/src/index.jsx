import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

ReactDOM.render(
  <Auth0Provider
    // domain={`${process.env.AUTH0_DOMAIN}`}
    domain="dev-ynsj33me.us.auth0.com"
    // clientId={`${process.env.AUTH0_CLIENT_SECRET}`}
    clientId="fT0ON4CEBe9xxu5Tv64f26jPoPmwjE9I"
    redirectUri="http://localhost:3000/home"
  >
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root'),
);

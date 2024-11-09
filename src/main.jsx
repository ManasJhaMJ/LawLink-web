import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@material-tailwind/react";
import Form from './Components/Form.jsx'
import Connect from './Components/Connect.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/form',
        element: <Form />,
      },
      {
        path: '/connect',
        element: <Connect/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-mc3qquemjh0al6qu.us.auth0.com"
    clientId="bNuev5q8g87gKCzA0G5srbziFuC550gu"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
     <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Auth0Provider>,

)
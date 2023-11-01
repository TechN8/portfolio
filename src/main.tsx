import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createHashRouter, RouterProvider} from 'react-router-dom';
import routes from './routes/routes.tsx';
import App from './App.tsx';

const router = createHashRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App>
        <RouterProvider router={router} />
      </App>
  </React.StrictMode>,
)

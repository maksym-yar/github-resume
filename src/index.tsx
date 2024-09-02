import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './home-page';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import UserResumePage from './user-resume-page';
import ErrorPage from './error-page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/:username" element={<UserResumePage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

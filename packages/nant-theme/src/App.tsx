import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getRouterConfig } from './router.jsx';

import './styles/index.css';

import '@docsearch/css';

const routerConfig = getRouterConfig();
const router = createBrowserRouter(routerConfig);

export default function App() {
  return <RouterProvider router={router} />;
}

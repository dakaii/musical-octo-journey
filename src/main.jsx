import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './views/LandingPage'
import DetailPage from './views/DetailPage'
import ErrorPage from './views/ErrorPage'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "details/:detailtId",
        element: <DetailPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)

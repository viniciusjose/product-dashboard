import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/global.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App, TypesPage } from '@/pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
          {
            path: 'types',
            element: <TypesPage/>,
          }
        ]
    }
])
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/global.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App, TaxesPage, TypesPage } from '@/pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PageNotFound } from '@/pages/NotFound'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <PageNotFound/>,
        children: [
          {
            path: 'types',
            element: <TypesPage/>,
          },
          {
            path: 'taxes',
            element: <TaxesPage />,
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

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import BookDetail from './pages/BookDetail.jsx';
import BookFrom from './pages/BookForm.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    Component: App, 
  },
  {
    path: "/books/:id",
    Component: BookDetail
  },
  {
    path:"books",
    Component: BookFrom
  },
  {
    path: "/books/:id/edit",
    Component: BookFrom
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
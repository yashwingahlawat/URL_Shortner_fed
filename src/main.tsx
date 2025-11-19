import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.tsx'

const saved = localStorage.getItem("theme") || "light";
document.documentElement.classList.toggle("dark", saved === "dark");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
    <App />
  </StrictMode>,
)

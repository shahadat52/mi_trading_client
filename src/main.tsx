
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, } from "react-router";
import { router } from './routes/AppRoutes.tsx';
import "react-tooltip/dist/react-tooltip.css";


const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <RouterProvider router={router} />,
  );
} else {
  console.error("Root element not found");
}

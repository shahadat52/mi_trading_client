import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, } from "react-router";
import { router } from './routes/AppRoutes.tsx';
import "react-tooltip/dist/react-tooltip.css";
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';


const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
} else {
  console.error("Root element not found");
}

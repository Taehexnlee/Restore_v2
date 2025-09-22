// main.tsx
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./app/model/routes/Routes";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored"/> 
    <RouterProvider router={router} />
  </Provider>
);
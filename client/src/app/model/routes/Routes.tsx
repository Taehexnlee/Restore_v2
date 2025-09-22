import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../layout/App";
import HomePage from "../../../features/home/HomePage";
import Catalog from "../../../features/catalog/Catalog";
import ProductDetail from "../../../features/catalog/ProductDetail";
import AboutPage from "../../../features/about/AboutPage";
import Contact from "../../../features/contact/Contact";
import ServerError from "../../errors/ServerError";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: '/catalog', element: <Catalog />},
            {path: '/catalog/:id', element: <ProductDetail />},
            {path: '/about', element: <AboutPage />},
            {path: '/contact', element: <Contact />},
            {path: '/server-error', element: <ServerError />},
            { path: "*", element: <Navigate to="/not-found" replace /> }
        ]
    }
])
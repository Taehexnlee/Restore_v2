import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetail from "../../features/catalog/ProductDetail";
import AboutPage from "../../features/about/AboutPage";
import Contact from "../../features/contact/Contact";
import ServerError from "../errors/ServerError";
import Basketpage from "../../features/basket/Basketpage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

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
            {path: '/basket', element: <Basketpage />},
            {path: '/checkout', element: <CheckoutPage />},
            {path: '/server-error', element: <ServerError />},
            { path: "*", element: <Navigate to="/not-found" replace /> }
        ]
    }
])
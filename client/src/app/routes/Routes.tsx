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
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import RequireAuth from "./RequireAuth";
import CheckoutSuccess from "../../features/checkout/CheckoutSuccess";
import OrdersPage from "../../features/order/OrdersPage";
import OrderDetailedPage from "../../features/order/OrderDetailedPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: '/checkout', element: <CheckoutPage /> },
                    { path: '/checkout/success', element: <CheckoutSuccess /> },
                    { path: '/orders', element: <OrdersPage /> },
                    { path: '/orders/:id', element: <OrderDetailedPage /> },
                ]
            },
            { path: '', element: <HomePage /> },
            { path: '/catalog', element: <Catalog /> },
            { path: '/catalog/:id', element: <ProductDetail /> },
            { path: '/about', element: <AboutPage /> },
            { path: '/contact', element: <Contact /> },
            { path: '/basket', element: <Basketpage /> },
            { path: '/login', element: <LoginForm /> },
            { path: '/register', element: <RegisterForm /> },
            { path: '/server-error', element: <ServerError /> },
            { path: "*", element: <Navigate to="/not-found" replace /> }
        ]
    }
])
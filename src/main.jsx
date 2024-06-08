import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLogin from "./pages/UserLogin.jsx";
import VerifyPass from "./pages/VerifyPass.jsx";
import UnauthenticatedRoute from "./UnauthenticatedRoute.jsx";
import Layout from "./Layout.jsx";
import Documents from "./pages/Documents.jsx";
import QRCodeScanner from "./pages/Scanner.jsx";
import PrstAbstData from "./pages/PrstAbstData.jsx";

const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <UnauthenticatedRoute>
                <UserLogin />
            </UnauthenticatedRoute>
        ),
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <QRCodeScanner />,
            },
            {
                path: "/documents",
                element: <Documents />,
            },
            {
                path: "/attendance",
                element: <PrstAbstData />,
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
        </Provider>
    </React.StrictMode>
);

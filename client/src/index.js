import React from "react";
import App from "./components/App";
import HomePage from "./components/HomePage";
import Workouts from "./components/Workouts";
import Favorites from "./components/Favorites";
import {createRoot} from  "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./Header.css";
import "./HomePage.css";
import "./CardContainer.css"
import { rootShouldForwardProp } from "@mui/material/styles/styled";



const routes = [
    {
        path: '/',
        element: <App/>,
        children: [
            {index: true , element: <HomePage/>},
            {
                path : '/Home',
                element : <HomePage/>
            },
            {
                path: '/Workouts',
                element : <Workouts/>
            },
            {
                path: '/Favorites',
                element : <Favorites/>
            }
        ]
    },
];

const router = createBrowserRouter(routes);
const root = createRoot(document.getElementById('root'));

root.render(<RouterProvider router={router}/>)
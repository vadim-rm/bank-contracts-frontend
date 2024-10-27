import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import ContractsPage from "./pages/ContractsPage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {HomePage} from "./pages/HomePage.tsx";
import ContractPage from "./pages/ContractPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '/contracts',
        element: <ContractsPage/>
    },
    {
        path: '/contracts/:id',
        element: <ContractPage/>
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import ContractsPage from "./pages/ContractsPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage.tsx";
import ContractPage from "./pages/ContractPage.tsx";
import {Provider} from "react-redux";
import store from "./store.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter basename="/bmstu-web-frontend"> {/* RepoName - название вашего репозитория */}
                <Routes>
                    <Route path="/" index element={<HomePage/>}/>
                    <Route path="/contracts" element={<ContractsPage/>}/>
                    <Route path="/contracts/:id" element={<ContractPage/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)

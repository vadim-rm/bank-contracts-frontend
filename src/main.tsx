import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ContractsPage from "./pages/ContractsPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage.tsx";
import ContractPage from "./pages/ContractPage.tsx";
import {Provider} from "react-redux";
import store from "./store.ts";
import LoginPage from "./pages/LoginPage.tsx";
import SignUp from "./pages/SignUpPage.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import AccountsPage from "./pages/AccountsPage.tsx";
import MePage from "./pages/MePage.tsx";
import ContractsListPage from "./pages/ContractsListPage.tsx";
import ContractEditPage from "./pages/ContractEditPage.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <BrowserRouter basename="/bmstu-web-frontend">
                    <Routes>
                        <Route path="/" index element={<HomePage/>}/>
                        <Route path="/contracts" element={<ContractsPage/>}/>
                        <Route path="/contracts/list" element={<ContractsListPage/>}/>
                        <Route path="/contracts/:id" element={<ContractPage/>}/>
                        <Route path="/contracts/:id/edit" element={<ContractEditPage/>}/>
                        <Route path="/contracts/create" element={<ContractEditPage/>}/>
                        <Route path="/accounts/:id" element={<AccountPage/>}/>
                        <Route path="/accounts" element={<AccountsPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/sign-up" element={<SignUp/>}/>
                        <Route path="/me" element={<MePage/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </ErrorBoundary>
    </StrictMode>,
);

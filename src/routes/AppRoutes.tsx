import { createBrowserRouter } from "react-router"; // Adjust the path as needed
import App from "../App";
import HomePage from "../pages/home/HomePage";
import PurchasePage from "../pages/purchase/PurchasePage";
import StockPage from "../pages/stock/StockPage";
import SalesPage from "../pages/sales/SalesPage";
import ReportsPage from "../pages/reports/ReportsPage";
import AccountsModulePage from "../pages/accounts/AccountsModulePage";
import IncomePage from "../pages/income/IncomePage";
import ExpensesPage from "../pages/expenses/ExpansesPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/home',
                element: <HomePage />
            },
            {
                path: '/purchase',
                element: <PurchasePage />
            },
            {
                path: '/stock',
                element: <StockPage />
            },
            {
                path: '/sales',
                element: <SalesPage />
            },
            {
                path: '/income',
                element: <IncomePage />
            },

            {
                path: '/expenses',
                element: <ExpensesPage />
            },
            {
                path: '/reports',
                element: <ReportsPage />
            },
            {
                path: '/accounts',
                element: <AccountsModulePage />
            }

        ],
    },
    {
        path: "register",
        element: <RegisterPage />
    },
    {
        path: "login",
        element: <LoginPage />
    }
]);
import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import PurchasePage from "../pages/purchase/PurchasePage";
import StockPage from "../pages/stock/StockPage";
import ReportsPage from "../pages/reports/ReportsPage";
import AccountsPage from "../pages/accounts/AccountsPage";
import IncomePage from "../pages/income/IncomePage";
import ExpensesPage from "../pages/expenses/ExpansesPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import OtpVerification from "../pages/OtpVerifyPage";
import PrivateRoute from "./PrivateRoute";
import ErrorBoundary from "../components/ErrorBoundary";
import SalesEntryPage from "../pages/sales/SalesEntryPage";
import PrintableInvoice from "../components/table/PrintableInvoice";
import SalesOverviewTable from "../pages/sales/SalesOverviewTable";
import CommissionSalesPage from "../pages/commissionSales/CommissionSalesPage";
import CommissionSupplierPage from "../pages/commissionSales/CommissionSupplierPage";
import DeliveryPage from "../redux/delivery/DeliveryPage";
import ProfilePage from "../pages/profile/ProfilePage";
import PurchaseOverviewTable from "../pages/purchase/PurchaseOverviewTable";
import TransactionTable from "../pages/accounts/TransactionTable";
import CustomerTxnPage from "../pages/home/CustomerTxnPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateRoute>
                <App />
            </PrivateRoute>
        ),
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <PrivateRoute>
                    <HomePage />
                </PrivateRoute>,
            },
            {
                path: "purchase/entry",
                element: <PrivateRoute><PurchasePage /></PrivateRoute>,
            },
            {
                path: "purchase/overview",
                element: <PrivateRoute><PurchaseOverviewTable /></PrivateRoute>,
            },
            {
                path: "customerTxn/:id",
                element: <PrivateRoute><CustomerTxnPage /></PrivateRoute>
            },
            {
                path: "stock",
                element: <StockPage />,
            },
            {
                path: "sales/overview",
                element: <SalesOverviewTable />,
            },
            {
                path: "commission-sales",
                element: <CommissionSalesPage />,
            },
            {
                path: "deliveries",
                element: <DeliveryPage />,
            },
            {
                path: "commission-sales/:id",
                element: <CommissionSupplierPage />,
            },
            {
                path: "profile",
                element: <PrivateRoute><ProfilePage /></PrivateRoute>,

            },
            {
                path: "sales/entry",
                element: <SalesEntryPage />,
            },
            {
                path: "sales/print/:id",
                loader: async ({ params }) => {
                    const res = await fetch(
                        `http://localhost:5000/api/v1/sales/${params.id}`
                    );
                    const data = await res.json();
                    return data;
                },
                element: <PrintableInvoice />,
            },
            {
                path: "income",
                element: <PrivateRoute><IncomePage /></PrivateRoute>,
            },
            {
                path: "expenses",
                element: <PrivateRoute><ExpensesPage /></PrivateRoute>,
            },
            {
                path: "reports",
                element: <ReportsPage />,
            },
            {
                path: "accounts",
                element: <PrivateRoute><AccountsPage /></PrivateRoute>,
            },
            {
                path: "transaction/:id",
                element: <PrivateRoute><TransactionTable /></PrivateRoute>
            }
        ],
    },
    {
        path: "send-otp/:id",
        element: <OtpVerification />,
    },
    {
        path: "register",
        element: <RegisterPage />,
    },
    {
        path: "login",
        element: <LoginPage />,
    },
    {
        path: "*",
        element: <ErrorBoundary />,
    },
]);


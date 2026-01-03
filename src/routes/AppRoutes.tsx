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
import CommissionSupplierPage from "../pages/commissionSales/CommissionSupplierPage";
import DeliveryPage from "../redux/delivery/DeliveryPage";
import ProfilePage from "../pages/profile/ProfilePage";
import PurchaseOverviewTable from "../pages/purchase/PurchaseOverviewTable";
import TransactionTable from "../pages/accounts/TransactionTable";
import CustomerTxnPage from "../pages/home/CustomerTxnPage";
import FacebookQRCode from "../components/FacebookQRCode";
import OutstandingTxnPage from "../pages/accounts/OutstandingTxnPage";
import SupplierWisePurchasePage from "../pages/commissionSales/SupplierWisePurchasePage";
import SupplierWiseSalesPage from "../pages/commissionSales/SupplierWiseSalesPage";
import DashboardPage from "../pages/dashboard/DashboardPage";

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
                path: "test",
                element: <FacebookQRCode />,
            },
            {
                path: "sales/overview",
                element: <SalesOverviewTable />,
            },
            {
                path: "commission-sales",
                element: <CommissionSupplierPage />,
            },
            {
                path: "commission-purchase/:id",
                element: <SupplierWisePurchasePage />,
            },
            {
                path: "commission-sales/:id",
                element: <SupplierWiseSalesPage />,
            },
            {
                path: "deliveries",
                element: <DeliveryPage />,
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
                path: 'dashboard',
                element: <DashboardPage />,
            },
            {
                path: "accounts",
                element: <PrivateRoute><AccountsPage /></PrivateRoute>,
            },
            {
                path: "outstandingTxn",
                element: <PrivateRoute><OutstandingTxnPage /></PrivateRoute>,
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
    // {
    //     path: "testMemo",
    //     element: <SalesMemo />,
    // },
    {
        path: "*",
        element: <ErrorBoundary />,
    },
]);


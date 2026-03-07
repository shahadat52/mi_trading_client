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
import SalesOverviewPage from "../pages/sales/SalesOverviewPage";
import CommissionSuppliersPage from "../pages/commissionSales/CommissionSuppliersPage";
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
import PendingApprovalsPage from "../pages/dashboard/PendingApprovals/PendingApprovalsPage";
import CouthaPage from "../pages/commissionSales/Coutha/CouthaPage";
import UserManagementPage from "../pages/dashboard/userManagement/UserManagementPage";
import PartnersPage from "../pages/partners/PartnersPage";
import SupplierTxnPage from "../pages/home/SupplierTxnPage";
import CartPage from "../pages/cart/CartPage";
import AllProductsPage from "../pages/products/AllProductsPage";
import BothSalesPage from "../pages/sales/bothSales/BothSalesPage";
import BankTxnsPage from "../pages/accounts/txn/BankTxnsPage";

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
                path: '/products',
                element: <PrivateRoute><AllProductsPage /></PrivateRoute>
            },
            {
                path: "/cart",
                element: <PrivateRoute><CartPage /></PrivateRoute>
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
                path: "supplierTxn/:id",
                element: <PrivateRoute><SupplierTxnPage /></PrivateRoute>
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
                element: <SalesOverviewPage />,
            },
            {
                path: "both/sales",
                element: <PrivateRoute><BothSalesPage /></PrivateRoute>
            },
            {
                path: "commission-sales",
                element: <CommissionSuppliersPage />,
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
                path: 'coutha/:id',
                element: <CouthaPage />
            },
            {
                path: "deliveries",
                element: <DeliveryPage />,
            },
            {
                path: "profile",
                element: <ProfilePage />,

            },
            {
                path: "sales/entry",
                element: <SalesEntryPage />,
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
                element: < DashboardPage />,
            },
            {
                path: 'dashboard',
                element: <ReportsPage />
            },
            {
                path: "/dashboard/approvals",
                element: <PrivateRoute><PendingApprovalsPage /></PrivateRoute>,
            },
            {
                path: '/partners',
                element: <PrivateRoute><PartnersPage /></PrivateRoute>
            },

            {
                path: "bankTxns",
                element: <PrivateRoute><BankTxnsPage /></PrivateRoute>,
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
            },
            {
                path: "dashboard/users",
                element: <PrivateRoute><UserManagementPage /></PrivateRoute>
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


import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import PurchasePage from "../pages/purchase/PurchasePage";
import StockPage from "../pages/stock/StockPage";
import ReportsPage from "../pages/reports/ReportsPage";
import AccountsPage from "../pages/accounts/AccountsPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import OtpVerification from "../pages/OtpVerifyPage";
import PrivateRoute from "./PrivateRoute";
import ErrorBoundary from "../components/ErrorBoundary";
import CommissionPage from "../pages/commissionSales/CommissionPage";
import DeliveryPage from "../pages/delivery/DeliveryPage";
import ProfilePage from "../pages/profile/ProfilePage";
import PurchaseOverviewTable from "../pages/purchase/PurchaseOverviewTable";
import TransactionTable from "../pages/accounts/TransactionTable";
import CustomerTxnPage from "../pages/home/CustomerTxnPage";
import OutstandingTxnPage from "../pages/accounts/OutstandingTxnPage";
import SupplierWisePurchasePage from "../pages/commissionSales/commissionSupplierProducts/SupplierWisePurchasePage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import PendingApprovalsPage from "../pages/dashboard/PendingApprovals/PendingApprovalsPage";
import CouthaPage from "../pages/commissionSales/Coutha/CouthasPage";
import UserManagementPage from "../pages/dashboard/userManagement/UserManagementPage";
import PartnersPage from "../pages/partners/PartnersPage";
import SupplierTxnPage from "../pages/home/SupplierTxnPage";
import CartPage from "../pages/cart/CartPage";
import AllProductsPage from "../pages/products/AllProductsPage";
import BothSalesPage from "../pages/sales/bothSales/BothSalesPage";
import BankTxnsPage from "../pages/accounts/txn/BankTxnsPage";
import BrokersPage from "../pages/broker/BrokersPage";
import BrokerTxn from "../pages/broker/BrokerTxn";
import ProductDetails from "../pages/products/ProductDetails";
import CommissionProductDetails from "../pages/products/CommissionProductDetails";
import MemoPreviewPage from "../pages/home/memoPreview/MemoPreviewPage";
import CashboxPage from "../pages/cashbox/CashboxPage";
import PurchaseReport from "../pages/purchase/PurchaseReport";
import IncomeExpensePage from "../pages/Income_Expense/IncomeExpensePage";
import BepariCoutha from "../pages/commissionSales/Coutha/BepariCoutha";
import HRPage from "../pages/hr/HRpage";
import AttendancesPage from "../pages/hr/attendances/AttendancesPage";
import EmployeesPages from "../pages/hr/employees/EmployeesPages";

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
                path: "purchase/report/:id",
                element: <PrivateRoute><PurchaseReport /></PrivateRoute>,
            },
            {
                path: '/products',
                element: <PrivateRoute><AllProductsPage /></PrivateRoute>
            },
            {
                path: '/products/:id',
                element: <PrivateRoute><ProductDetails /></PrivateRoute>
            },
            {
                path: '/commission/product/:id',
                element: <PrivateRoute><CommissionProductDetails /></PrivateRoute>
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
                path: "both/sales",
                element: <PrivateRoute><BothSalesPage /></PrivateRoute>
            },
            {
                path: "both/sales/:id",
                element: <PrivateRoute><BothSalesPage /></PrivateRoute>
            },
            {
                path: "commission-sales",
                element: <CommissionPage />,
            },
            {
                path: "cashbox",
                element: <CashboxPage />,
            },
            {
                path: "commission-purchase/:id",
                element: <SupplierWisePurchasePage />,
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
                path: "invoice/:id",
                element: <MemoPreviewPage />,
            },
            {
                path: "income_expense",
                element: <PrivateRoute><IncomeExpensePage /></PrivateRoute>,
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
            },
            {
                path: "dashboard/brokers",
                element: <PrivateRoute><BrokersPage /></PrivateRoute>
            },
            {
                path: "/brokerTxn/:id",
                element: <PrivateRoute><BrokerTxn /></PrivateRoute>
            },
            {
                path: "/hr",
                element: <PrivateRoute><HRPage /></PrivateRoute>
            },
            {
                path: "/hr/:id",
                element: <PrivateRoute><AttendancesPage /></PrivateRoute>
            },
            {
                path: "/hr/id",
                element: <PrivateRoute><EmployeesPages /></PrivateRoute>
            },

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
        path: "/print/coutha/:id",
        element: <BepariCoutha />,
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


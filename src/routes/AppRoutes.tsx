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
import BrokersPage from "../pages/broker/BrokersPage";
import BrokerTxn from "../pages/broker/BrokerTxn";
import ProductDetails from "../pages/products/ProductDetails";
import CommissionProductDetails from "../pages/products/CommissionProductDetails";
import MemoPreviewPage from "../pages/home/memoPreview/MemoPreviewPage";
import CashboxPage from "../pages/cashbox/CashboxPage";
import ProductWiseSalesReports from "../pages/purchase/ProductWiseSalesReports";
import IncomeExpensePage from "../pages/Income_Expense/IncomeExpensePage";
import BepariCoutha from "../pages/commissionSales/Coutha/BepariCoutha";
import HRPage from "../pages/hr/HRpage";
import AttendancesPage from "../pages/hr/attendances/AttendancesPage";
import EmployeesPages from "../pages/hr/employees/EmployeesPages";
import BankTxnsPage from "../pages/accounts/txn/BankTxnsPage";
import BankTxnSummary from "../pages/accounts/txn/BankTxnSummary";
import KuliGodiTohoriPage from "../pages/Income_Expense/kuli_godi_tohori/KuliGodiTohoriPage";
import CreateEmployeeEntry from "../pages/hr/employees/CreateEmployeeEntry";
import MFSPage from "../pages/MFS/MFSPage";
import ProductReceivingSlip from "../pages/purchase/ProductReceivingSlip";
import DueSalesPage from "../pages/sales/bothSales/DueSalesPage";
import UnpaidMemo from "../pages/sales/memo/UnpaidMemo";
import DeliveryUpload from "../pages/delivery/DeliveryUpload";
import CusotmerTxnReportPage from "../pages/home/Report/CusotmerTxnReportPage";
import SupplierTxnReportPage from "../pages/home/Report/SupplierTxnReportPage";
import BankTxnReportPage from "../pages/home/Report/BankTxnReportPage";
import ActivityPage from "../pages/activity/ActivityPage";
import ProfitLossPage from "../pages/dashboard/ProfitLoss/ProfitLossPage";
import BrokerTxnReportPage from "../pages/home/Report/BrokerTxnReportPage";
import CurrentState from "../pages/dashboard/businessPosition/BusinessPositionPage";
import CustomerDueReports from "../pages/home/Report/CustomerDueReports";
import SuppliersDueReports from "../pages/home/Report/SuppliersDueReports";
import DevelopersPage from "../pages/developers/DevelopersPage";
import IFICChequePrint from "../pages/cheque/IFICChequePrint";

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
                path: "activity",
                element: <PrivateRoute><ActivityPage /></PrivateRoute>,
            },
            {
                path: "purchase/entry",
                element: <PrivateRoute><PurchasePage /></PrivateRoute>,
            },
            {
                path: "purchase/report/:id",
                element: <PrivateRoute><ProductWiseSalesReports /></PrivateRoute>,
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
                path: "customerTxn/:id",
                element: <PrivateRoute><CustomerTxnPage /></PrivateRoute>
            },

            {
                path: "supplierTxn/:id",
                element: <PrivateRoute><SupplierTxnPage /></PrivateRoute>
            },
            {
                path: "stock",
                element: <PrivateRoute><StockPage /></PrivateRoute>,
            },
            {
                path: "both/sales",
                element: <PrivateRoute><BothSalesPage /></PrivateRoute>
            },
            {
                path: "both/due",
                element: <PrivateRoute><DueSalesPage /></PrivateRoute>
            },
            {
                path: "both/sales/:id",
                element: <PrivateRoute><BothSalesPage /></PrivateRoute>
            },
            {
                path: "commission-sales",
                element: <PrivateRoute><CommissionPage /></PrivateRoute>,
            },
            {
                path: "/cashbox",
                element: <PrivateRoute><CashboxPage /></PrivateRoute>,
            },
            {
                path: "commission-purchase/:id",
                element: <SupplierWisePurchasePage />,
            },
            {
                path: 'coutha/:id',
                element: <PrivateRoute><CouthaPage /></PrivateRoute>
            },
            {
                path: "deliveries",
                element: <PrivateRoute><DeliveryPage /></PrivateRoute>,
            },
            {
                path: "upload/:id",
                element: <PrivateRoute><DeliveryUpload /></PrivateRoute>,
            },
            {
                path: "profile",
                element: <ProfilePage />,

            },
            {
                path: "invoice/:id",
                element: <PrivateRoute><MemoPreviewPage /></PrivateRoute>,
            },
            {
                path: "income_expense",
                element: <PrivateRoute><IncomeExpensePage /></PrivateRoute>,
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
                path: "bank_wise/:id",
                element: <PrivateRoute><BankTxnSummary /></PrivateRoute>,
            },
            {
                path: "mfs/:id",
                element: <PrivateRoute><MFSPage /></PrivateRoute>,
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
                path: "reports",
                element: <PrivateRoute>< DashboardPage /></PrivateRoute>,
            },
            {
                path: 'dashboard',
                element: <PrivateRoute><ReportsPage /></PrivateRoute>
            },
            {
                path: "/dashboard/approvals",
                element: <PrivateRoute><PendingApprovalsPage /></PrivateRoute>,
            },
            {
                path: "dashboard/users",
                element: <PrivateRoute><UserManagementPage /></PrivateRoute>
            },
            {
                path: "dashboard/currentState",
                element: <PrivateRoute>< CurrentState /></PrivateRoute>,
            },
            {
                path: "dashboard/brokers",
                element: <PrivateRoute><BrokersPage /></PrivateRoute>
            },
            {
                path: "/dashboard/profitLoss",
                element: <PrivateRoute><ProfitLossPage /></PrivateRoute>
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
                path: "/hr/join",
                element: <PrivateRoute><CreateEmployeeEntry /></PrivateRoute>
            },
            {
                path: "/attendance/:id",
                element: <PrivateRoute><AttendancesPage /></PrivateRoute>
            },
            {
                path: "/hr/id",
                element: <PrivateRoute><EmployeesPages /></PrivateRoute>
            },
            {
                path: "/kuli_godi_tohori",
                element: <PrivateRoute><KuliGodiTohoriPage /></PrivateRoute>
            },
            {
                path: "developers",
                element: <DevelopersPage />,
            },


        ],
    },
    {
        path: "/cheque",
        element: <PrivateRoute><IFICChequePrint /></PrivateRoute>
    },
    {
        path: "/reports/customers",
        element: <PrivateRoute><CustomerDueReports /></PrivateRoute>
    },
    {
        path: "/reports/suppliers",
        element: <PrivateRoute><SuppliersDueReports /></PrivateRoute>
    },
    {
        path: "report/customer/:id",
        element: <PrivateRoute><CusotmerTxnReportPage /></PrivateRoute>
    },
    {
        path: "report/supplier/:id",
        element: <PrivateRoute><SupplierTxnReportPage /></PrivateRoute>
    },
    {
        path: "report/broker/:id",
        element: <PrivateRoute><BrokerTxnReportPage /></PrivateRoute>
    },
    {
        path: "report/bank/:id",
        element: <PrivateRoute><BankTxnReportPage /></PrivateRoute>
    },
    {
        path: "send-otp/:id",
        element: <OtpVerification />,
    },
    {
        path: "register",
        element: <PrivateRoute><RegisterPage /></PrivateRoute>,
    },
    {
        path: "/print/coutha/:id",
        element: <PrivateRoute><BepariCoutha /></PrivateRoute>,
    },
    {
        path: "/print/duememo/:id",
        element: <PrivateRoute> <UnpaidMemo /></PrivateRoute>,
    },
    {
        path: "/purchase/slip/:id",
        element: <PrivateRoute><ProductReceivingSlip /></PrivateRoute>,
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


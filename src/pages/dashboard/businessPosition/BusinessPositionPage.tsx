import {
    ArrowDownLeft, ArrowUpRight, Banknote, Boxes, Building2, ChevronRight, CircleDollarSign, CreditCard, Landmark, Wallet,
} from "lucide-react";
import { useAppSelector } from "../../../redux/hook";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGetCurrentBusinessStateQuery } from "../../../redux/features/cashbox/cashboxApi";
import Loading from "../../../components/Loading";

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);
};

const BusinessPositionPage = () => {
    const [loading, setLoading] = useState(false)
    const token = useAppSelector((state) => state.auth.auth.token)

    const downloadBackup = async () => {
        setLoading(true);

        const toastId = toast.loading("Processing...", {
            autoClose: false,
        });

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_API_URL}/backup/database`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Backup download failed");
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;
            a.download = `mi-backup-${format(
                new Date(),
                "dd-MM-yyyy"
            )}.zip`;

            document.body.appendChild(a);

            a.click();

            a.remove();

            window.URL.revokeObjectURL(url);

            toast.update(toastId, {
                render: "File saved",
                type: "success",
                isLoading: false,
                autoClose: 1000,
                closeOnClick: true,
            });
        } catch (error) {

            toast.update(toastId, {
                render: "Save Failed!",
                type: "error",
                isLoading: false,
                autoClose: 1500,
                closeOnClick: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const { data, isLoading } = useGetCurrentBusinessStateQuery(undefined)
    const currentData = data?.data
    const businessData = data?.data?.assets
    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen min-w-screen">
            <Loading />
        </div>
    }

    const totalAssets =
        businessData.stockValue +
        businessData.bankBalance +
        businessData.mfsBalance +
        businessData.cashboxBalance +
        businessData.customerReceivable;

    const totalLiabilities = currentData?.liabilities?.supplierPayable;

    const netPosition = totalAssets - totalLiabilities;

    const liquidAssets =
        businessData.bankBalance +
        businessData.mfsBalance +
        businessData.cashboxBalance;


    const assetItems = [
        {
            title: "Stock Value",
            value: businessData.stockValue,
            icon: Boxes,
            description: "Current inventory value",
        },
        {
            title: "Bank Balance",
            value: businessData.bankBalance,
            icon: Landmark,
            description: "Available bank balance",
        },
        {
            title: "MFS Balance",
            value: businessData.mfsBalance,
            icon: CreditCard,
            description: "bKash / Nagad / Rocket",
        },
        {
            title: "Cashbox",
            value: businessData.cashboxBalance,
            icon: Wallet,
            description: "Physical cash",
        },
        {
            title: "Customer Receivable",
            value: businessData.customerReceivable,
            icon: CircleDollarSign,
            description: "Money to receive",
        },
    ];


    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-8 mb-10">
            <div className="mx-auto max-w-7xl space-y-6">

                <button
                    type="button"
                    onClick={downloadBackup}
                    disabled={loading}
                    className="btn btn-primary"
                >
                    {loading
                        ? "Creating Backup..."
                        : "Data Download & Backup"}
                </button>
                {/* ================= HEADER ================= */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="rounded-xl bg-primary/10 p-2 text-primary">
                                <Building2 size={22} />
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight">
                                Business Position
                            </h1>
                        </div>

                        <p className="mt-1 text-sm text-base-content/60">
                            Current financial position of your business
                        </p>
                    </div>

                    <div className="rounded-xl border border-base-300 bg-base-100 px-4 py-2.5 text-sm">
                        <span className="text-base-content/50">
                            As of
                        </span>{" "}
                        <span className="font-semibold">
                            22 Aug 2026
                        </span>
                    </div>
                </div>

                {/* ================= NET POSITION ================= */}
                <div className="relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
                    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/5" />
                    <div className="absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-primary/5" />

                    <div className="relative p-6 md:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                            <div>
                                <div className="flex items-center gap-2 text-sm font-medium text-base-content/60">
                                    <CircleDollarSign
                                        size={18}
                                        className="text-primary"
                                    />
                                    Current Business Position
                                </div>

                                <div className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                                    {formatCurrency(netPosition)}
                                </div>

                                <p className="mt-2 max-w-xl text-sm text-base-content/60">
                                    Net value of your business after
                                    deducting all current liabilities.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:min-w-[360px]">
                                <div className="rounded-xl bg-success/5 p-4">
                                    <div className="flex items-center gap-2 text-xs text-base-content/50">
                                        <ArrowUpRight
                                            size={15}
                                            className="text-success"
                                        />
                                        Total Assets
                                    </div>

                                    <p className="mt-2 text-xl font-bold">
                                        {formatCurrency(totalAssets)}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-error/5 p-4">
                                    <div className="flex items-center gap-2 text-xs text-base-content/50">
                                        <ArrowDownLeft
                                            size={15}
                                            className="text-error"
                                        />
                                        Total Liability
                                    </div>

                                    <p className="mt-2 text-xl font-bold">
                                        {formatCurrency(totalLiabilities)}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* ================= SUMMARY CARDS ================= */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <SummaryCard
                        title="Total Assets"
                        value={totalAssets}
                        icon={ArrowUpRight}
                        iconClass="text-success bg-success/10"
                        description="All business assets"
                    />

                    <SummaryCard
                        title="Total Liability"
                        value={totalLiabilities}
                        icon={ArrowDownLeft}
                        iconClass="text-error bg-error/10"
                        description="Total payable amount"
                    />

                    <SummaryCard
                        title="Liquid Assets"
                        value={currentData?.liquidAssets}
                        icon={Banknote}
                        iconClass="text-info bg-info/10"
                        description="Bank + MFS + Cash"
                    />

                    <SummaryCard
                        title="Liquid Position"
                        value={currentData?.liquidPosition}
                        icon={Wallet}
                        iconClass="text-warning bg-warning/10"
                        description="Liquid assets - payable"
                    />

                </div>

                {/* ================= MAIN GRID ================= */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* ================= ASSETS ================= */}
                    <div className="lg:col-span-2 rounded-2xl border border-base-300 bg-base-100 shadow-sm">

                        <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">
                            <div>
                                <h2 className="font-bold">
                                    Assets
                                </h2>

                                <p className="text-xs text-base-content/50">
                                    Where your business money is
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-xs text-base-content/50">
                                    Total
                                </p>

                                <p className="font-bold text-success">
                                    {formatCurrency(totalAssets)}
                                </p>
                            </div>
                        </div>

                        <div className="divide-y divide-base-300">
                            {assetItems.map((item) => {
                                const Icon = item.icon;

                                const percentage =
                                    (item.value / totalAssets) * 100;

                                return (
                                    <div
                                        key={item.title}
                                        className="group flex items-center gap-4 px-5 py-4 transition hover:bg-base-200/50"
                                    >
                                        <div className="rounded-xl bg-primary/10 p-3 text-primary">
                                            <Icon size={20} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <p className="font-semibold">
                                                        {item.title}
                                                    </p>

                                                    <p className="text-xs text-base-content/50">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                <p className="font-bold">
                                                    {formatCurrency(item.value)}
                                                </p>
                                            </div>

                                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-base-300">
                                                <div
                                                    className="h-full rounded-full bg-primary"
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <ChevronRight
                                            size={18}
                                            className="text-base-content/30 transition group-hover:translate-x-0.5"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ================= LIABILITIES ================= */}
                    <div className="rounded-2xl border border-base-300 bg-base-100 shadow-sm">

                        <div className="border-b border-base-300 px-5 py-4">
                            <h2 className="font-bold">
                                Liabilities
                            </h2>

                            <p className="text-xs text-base-content/50">
                                Money your business owes
                            </p>
                        </div>

                        <div className="p-5">

                            <div className="rounded-2xl bg-error/5 p-5">

                                <div className="flex items-center justify-between">
                                    <div className="rounded-xl bg-error/10 p-3 text-error">
                                        <ArrowDownLeft size={22} />
                                    </div>

                                    <span className="badge badge-error badge-outline">
                                        Payable
                                    </span>
                                </div>

                                <p className="mt-6 text-sm text-base-content/60">
                                    Supplier Payable
                                </p>

                                <p className="mt-1 text-3xl font-black">
                                    {formatCurrency(
                                        currentData?.liabilities?.supplierPayable
                                    )}
                                </p>

                                <p className="mt-2 text-xs text-base-content/50">
                                    Total amount payable to suppliers
                                </p>

                            </div>

                            <div className="mt-5 rounded-xl border border-base-300 p-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-base-content/60">
                                        Total Liability
                                    </span>

                                    <span className="font-bold text-error">
                                        {formatCurrency(totalLiabilities)}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* ================= FINANCIAL BREAKDOWN ================= */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    {/* Liquid Position */}
                    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">

                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-info/10 p-3 text-info">
                                <Wallet size={21} />
                            </div>

                            <div>
                                <h2 className="font-bold">
                                    Liquidity Overview
                                </h2>

                                <p className="text-xs text-base-content/50">
                                    Immediately available funds
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">

                            <LiquidityRow
                                title="Bank"
                                value={businessData.bankBalance}
                            />

                            <LiquidityRow
                                title="MFS"
                                value={businessData.mfsBalance}
                            />

                            <LiquidityRow
                                title="Cashbox"
                                value={businessData.cashboxBalance}
                            />

                        </div>

                        <div className="mt-5 border-t border-base-300 pt-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                    Available Liquidity
                                </span>

                                <span className="text-xl font-black">
                                    {formatCurrency(liquidAssets)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Net Position Calculation */}
                    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">

                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-primary/10 p-3 text-primary">
                                <CircleDollarSign size={21} />
                            </div>

                            <div>
                                <h2 className="font-bold">
                                    Position Calculation
                                </h2>

                                <p className="text-xs text-base-content/50">
                                    How your current position is calculated
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">

                            <CalculationRow
                                label="Total Assets"
                                value={totalAssets}
                                positive
                            />

                            <CalculationRow
                                label="Total Liabilities"
                                value={totalLiabilities}
                                negative
                            />

                            <div className="my-2 border-t border-dashed border-base-300" />

                            <div className="flex items-center justify-between rounded-xl bg-primary/5 px-4 py-4">
                                <span className="font-bold">
                                    Net Business Position
                                </span>

                                <span className="text-xl font-black text-primary">
                                    {formatCurrency(netPosition)}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


/* ================= COMPONENTS ================= */

function SummaryCard({
    title,
    value,
    icon: Icon,
    iconClass,
    description,
}: {
    title: string;
    value: number;
    icon: any;
    iconClass: string;
    description: string;
}) {
    return (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-base-content/60">
                        {title}
                    </p>

                    <p className="mt-2 text-2xl font-black">
                        {formatCurrency(value)}
                    </p>
                </div>

                <div className={`rounded-xl p-3 ${iconClass}`}>
                    <Icon size={20} />
                </div>
            </div>

            <p className="mt-3 text-xs text-base-content/50">
                {description}
            </p>
        </div>
    );
}


function LiquidityRow({
    title,
    value,
}: {
    title: string;
    value: number;
}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-base-content/60">
                {title}
            </span>

            <span className="font-semibold">
                {formatCurrency(value)}
            </span>
        </div>
    );
}


function CalculationRow({
    label,
    value,
    positive,
    negative,
}: {
    label: string;
    value: number;
    positive?: boolean;
    negative?: boolean;
}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-base-content/60">
                {label}
            </span>

            <span
                className={`font-semibold ${positive
                    ? "text-success"
                    : negative
                        ? "text-error"
                        : ""
                    }`}
            >
                {positive ? "+" : negative ? "-" : ""}
                {formatCurrency(value)}
            </span>
        </div>
    );
}

export default BusinessPositionPage
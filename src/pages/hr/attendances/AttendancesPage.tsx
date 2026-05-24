import { useParams } from "react-router";
import {
    useGetAttendanceByIdQuery,
    useUpdateAttendanceStatusMutation,
} from "../../../redux/features/attendance/attendanceApi";

import { MONTH_OPTIONS } from "../../../utils/options";
import { useState } from "react";
import YearInput from "./YearInput";
import { format, getDaysInMonth } from "date-fns";
import Loading from "../../../components/Loading";
import { ceil } from "mathjs";
import StatusModal from "./StatusModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import BasicSalaryUpdateModal from "./BasicSalaryUpdateModal";

const AttendancesPage = () => {
    const { id } = useParams();

    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const [activeDate, setActiveDate] = useState<any | null>(null);

    // 👉 salary modal states
    const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
    const [basicSalary, setBasicSalary] = useState<number>(0);

    const { data, isLoading, isError, refetch } =
        useGetAttendanceByIdQuery({ id, year, month });

    const employeeData = data?.data;

    const days = getDaysInMonth(new Date(year, month - 1));

    const validStatuses = ["present", "paid_leave"];

    const validAttendanceCount =
        employeeData?.attendances?.filter((item: any) =>
            validStatuses.includes(item.status)
        ).length || 0;

    const perDayPay =
        Number(employeeData?.basicSalary) / Number(days || 1);

    const salary = ceil(perDayPay * validAttendanceCount);

    const [updateStatus] = useUpdateAttendanceStatusMutation();

    // 👉 attendance status modal open
    const handleStatus = (date: any) => {
        setActiveDate(date);
    };

    const handleSelect = async (status: string) => {
        try {
            await updateStatus({
                id: activeDate._id,
                date: activeDate.date,
                status,
            }).unwrap();

            setActiveDate(null);
            refetch();
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    // 👉 open salary modal
    const openSalaryModal = () => {
        setBasicSalary(Number(employeeData?.basicSalary || 0));
        setIsBasicModalOpen(true);
    };



    return (
        <div>
            {/* FILTER */}
            <div className="flex justify-around gap-3 p-2">
                <section className="w-full max-w-[75%]">
                    <label className="block text-sm font-medium mb-1">
                        Month
                    </label>

                    <select
                        value={month}
                        onChange={(e) => setMonth(Number(e.target.value))}
                        className="w-full select"
                    >
                        {MONTH_OPTIONS?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </section>

                <YearInput value={year} onChange={setYear} />
            </div>

            {/* MAIN CARD */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2">
                <div className="mb-5">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-slate-900">
                            {employeeData?.employee}
                        </h2>

                        {/* 👉 icon click open modal */}
                        <p
                            onClick={openSalaryModal}
                            className="text-2xl cursor-pointer"
                        >
                            <BsThreeDotsVertical />
                        </p>
                    </div>

                    <p className="text-slate-500 text-sm mt-1 flex flex-col">
                        <span>
                            Basic: {employeeData?.basicSalary}
                        </span>
                        <span>Payable Salary: {salary}</span>
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-7 gap-1 text-center">
                    {isLoading ? (
                        <Loading />
                    ) : isError ? (
                        <div className="py-10 text-center text-sm text-gray-700 col-span-7">
                            কোন তথ্য নেই
                        </div>
                    ) : (
                        employeeData?.attendances?.map((date: any) => (
                            <div
                                key={date._id}
                                onClick={() => handleStatus(date)}
                                className="border border-slate-200 rounded-xl p-3 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
                            >
                                <p className="text-xs text-slate-500">
                                    {date.status === "present"
                                        ? "P"
                                        : date.status === "absent"
                                            ? "A"
                                            : date.status === "paid_leave"
                                                ? "PL"
                                                : date.status === "unpaid_leave"
                                                    ? "UL"
                                                    : ""}
                                </p>

                                <h3 className="text-xs font-bold text-slate-800">
                                    {format(new Date(date?.date), "dd")}
                                </h3>

                                <div className="mt-2 flex justify-center">
                                    <div
                                        className={`w-3 h-3 rounded-full ${date.status === "present" ||
                                            date.status === "paid_leave"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                            }`}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* 👉 STATUS MODAL */}
            {activeDate && (
                <StatusModal
                    activeDate={activeDate}
                    handleSelect={handleSelect}
                    setActiveDate={setActiveDate}
                />
            )}

            {/* 👉 BASIC SALARY MODAL */}
            {isBasicModalOpen &&
                <BasicSalaryUpdateModal basicSalary={basicSalary} setBasicSalary={setBasicSalary} setIsBasicModalOpen={setIsBasicModalOpen} id={id} />
            }
        </div>
    );
};

export default AttendancesPage;
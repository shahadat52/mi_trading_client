/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import TableSkeleton from '../../components/table/TableSkeleton';
import type { TUser } from '../dashboard/userManagement/UserTable';
import { EMPLOYEE_ROLE_OPTIONS, employeeTableHeads } from '../../utils/options';
import { useNavigate } from 'react-router';
import { useFireEmployeeMutation, useGetAllEmployeesQuery, useUpdateEmployeeRoleMutation, useUpdateEmployeeStatusMutation } from '../../redux/features/employee/employeeApi';
import { useMemo } from "react";
import { MdDeleteForever } from 'react-icons/md';
import EmployeeTable from './EmployeeTable';

const HRpage = () => {

    const now = new Date();
    const showSalaryGenerate = useMemo(() => {
        const day = now.getDate();
        return day >= 1 && day <= 5;
    }, []);

    const navigate = useNavigate()
    const { data, isLoading, isError, error } = useGetAllEmployeesQuery(undefined);
    const employees = data?.data || [];

    const [updateEmployeeRole] = useUpdateEmployeeRoleMutation()
    const handleUpdate = async (id: string, role: string) => {
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {

            const result = await updateEmployeeRole({ role, id: id })
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });


            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });

            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });

        } finally {
            // reset()
        }
    };

    const [updateEmployeeStatus] = useUpdateEmployeeStatusMutation()
    const handleStatus = async (id: string, status: string) => {
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {

            const result = await updateEmployeeStatus({ status, id: id })
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });


            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });

            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });

        } finally {
            // reset()
        }
    };

    const [fireEmployee] = useFireEmployeeMutation()
    const handleDelete = async (user: any) => {
        const isConfirm = confirm(`আপনি কি নিশ্চিত! ${user.name} কে ডিলিট করেই দিবেন?`)
        if (!isConfirm) {
            return
        }
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const result = await fireEmployee(user._id);
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });

            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });

            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });


        } finally {
        }

    };
    return (
        <div className='mb-16 p-1 text-xl font-bold uppercase'>
            <h1 className='my-4 text-center'>H.R Department</h1>
            <div className="mb-2 flex justify-end">
                {showSalaryGenerate && (
                    <button className="btn mr-2">
                        Salary Generate
                    </button>
                )}

                <button
                    onClick={() => navigate(`/hr/join`)}
                    className="btn"
                >
                    Join New Employee
                </button>
            </div>
            {/* Desktop view */}
            <div className="overflow-x-auto font-semibold bg-white rounded-lg shadow-sm hidden md:block">
                {isLoading ? (
                    <TableSkeleton row={10} />
                ) : isError ? (
                    <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Error loading employees'}</div>
                ) : employees?.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No Employees Found.</p>
                ) : (
                    <table className="min-w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                {employeeTableHeads?.map((head: string) => (
                                    <th
                                        key={head}
                                        className="px-4 py-2 border whitespace-nowrap text-left"
                                    >
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {employees?.map((user: TUser) => (
                                <EmployeeTable
                                    {...user}
                                    key={user._id}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>


            {/* Mobile view */}
            <div className="grid gap-4 md:hidden">
                {isLoading ? (
                    <TableSkeleton row={10} />
                ) : isError ? (
                    <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Error loading employees'}</div>
                ) : employees?.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No users found.</p>
                ) : (
                    employees?.map((user: TUser) => (
                        <div
                            key={user?._id}
                            className={`${user?.status === 'blocked' ? 'text-red-600 border border-red-600' : 'text-gray-800 border border-gray-200'} bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition`}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div onClick={() => navigate(`/attendance/${user._id}`)} className="flex items-center gap-3">
                                    {/* Avatar */}
                                    <div className="avatar placeholder">
                                        <div className="w-12 rounded-full">
                                            <img src='/man.png' alt={user.name} />
                                        </div>
                                    </div>

                                    {/* Name & Meta */}
                                    <div className={`text-base font-semibold ${user?.status === 'blocked' ? 'text-red-600' : 'text-gray-800'}`}>
                                        <h3>
                                            {user?.name}
                                        </h3>
                                        <p className="text-xs">
                                            {user?.status}
                                        </p>
                                    </div>
                                </div>

                                {/* Role Badge */}
                                <span className="badge badge-outline capitalize">
                                    {user?.role}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="flex justify-between gap-2 text-sm" >
                                <div>
                                    <p className="">Phone</p>
                                    <p className="font-medium ">
                                        {user?.phone || '—'}
                                    </p>
                                </div>

                                <div>
                                    <button onClick={() => handleDelete(user)} type='button' className="text-red-600 text-4xl">
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            </div>

                            {/* Divider */}

                            {/* Role and status Update */}
                            <div className="flex gap-2">


                                <select
                                    defaultValue={user?.role}
                                    className="select select-bordered w-full mt-2"
                                    onChange={(e) => handleUpdate(user?._id, e.target.value)}
                                >
                                    {EMPLOYEE_ROLE_OPTIONS?.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    defaultValue={user?.status}
                                    className="select select-bordered w-full mt-2"
                                    onChange={(e) => handleStatus(user?._id, e.target.value)}
                                >
                                    <option disabled>Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="blocked">Blocked</option>
                                </select>


                            </div>
                        </div>
                    ))
                )}
            </div >

        </div >
    );
};

export default HRpage;
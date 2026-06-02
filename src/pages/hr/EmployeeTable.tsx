/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useFireEmployeeMutation, useUpdateEmployeeRoleMutation, useUpdateEmployeeStatusMutation } from "../../redux/features/employee/employeeApi";

import { MdDeleteForever } from "react-icons/md";

export type TUser = { _id: string, name: string, phone: string, email: string, role: string, status: string }
const EmployeeTable = (user: TUser) => {
    const navigate = useNavigate()
    const [updateRole] = useUpdateEmployeeRoleMutation()
    const handleUpdate = async (role: string) => {
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {

            const result = await updateRole({ role, id: user?._id })
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

    const [updateStatus] = useUpdateEmployeeStatusMutation()
    const handleStatus = async (status: string) => {
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {

            const result = await updateStatus({ status, id: user?._id })
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
        const isConfirm = confirm(`আপনি কি নিশ্চিত! ${user.name} কে ডিলিট করেই দেবেন?`)
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
        <tr key={user._id} className={`${user?.status === 'blocked' ? 'text-red-600 border border-red-600' : 'text-gray-800 border border-gray-200'}hover:bg-gray-50 `}>
            <td onClick={() => navigate(`/attendance/${user._id}`)} className="px-4 py-2 border">{user?.name}</td>
            <td className="px-4 py-2 border">{user?.phone}</td>
            <td className="px-4 py-2 border">{user?.role}</td>
            <td className="px-4 py-2 border">
                <select
                    defaultValue={user?.role}
                    className="select select-natural w-full"
                    onChange={(e) => handleUpdate(e.target.value)}
                >
                    <option disabled>Select Role</option>
                    <option value="specialManager">Special Manager</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                </select>

            </td>

            <td className="px-4 py-2 border">
                <select
                    defaultValue={user?.status}
                    className="select select-natural w-full"
                    onChange={(e) => handleStatus(e.target.value)}
                >
                    <option disabled>Select Status</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>

            </td>
            <td className="px-4 py-2 border">
                <button onClick={() => handleDelete(user)} type='button' className="text-red-600 text-4xl">
                    <MdDeleteForever />
                </button>

            </td>

        </tr>

    );
};

export default EmployeeTable;
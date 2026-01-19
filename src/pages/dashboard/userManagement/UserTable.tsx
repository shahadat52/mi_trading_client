/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { useUpdateRoleMutation, useUpdateStatusMutation } from "../../../redux/features/auth/authApi";

export type TUser = { _id: string, name: string, phone: string, email: string, role: string, status: string }
const UserTable = (user: TUser) => {

    const [updateRole] = useUpdateRoleMutation()
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

    const [updateStatus] = useUpdateStatusMutation()
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
    }
    return (
        <tr key={user._id} className={`${user?.status === 'blocked' ? 'text-red-600 border border-red-600' : 'text-gray-800 border border-gray-200'}hover:bg-gray-50 `}>
            <td className="px-4 py-2 border">{user?.name}</td>

            <td className="px-4 py-2 border">{user?.phone}</td>
            <td className="px-4 py-2 border">{user?.email}</td>
            <td className="px-4 py-2 border">{user?.role}</td>
            <td className="px-4 py-2 border">
                <select
                    defaultValue={user?.role}
                    className="select select-natural w-full"
                    onChange={(e) => handleUpdate(e.target.value)}
                >
                    <option disabled>Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="specialManager">Special Manager</option>
                    <option value="salesManager">Sales Manager</option>
                    <option value="purchaseManager">Purchase Manager</option>
                    <option value="deliveryManager">Delivery Manager</option>
                    <option value="commissionManager">Commission Manager</option>
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
        </tr>

    );
};

export default UserTable;
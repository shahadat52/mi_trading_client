/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from 'react-toastify';
import TableSkeleton from '../../../components/table/TableSkeleton';
import { useGetAllUsersQuery, useUpdateRoleMutation, useUpdateStatusMutation } from '../../../redux/features/auth/authApi';
import UserTable, { type TUser } from './UserTable';
import { usersTableHeads } from './usersTableHeads';

const UserManagementPage = () => {
    const { data, isLoading, isError, error } = useGetAllUsersQuery(undefined);
    const users = data?.data || [];

    const [updateRole] = useUpdateRoleMutation()
    const handleUpdate = async (id: string, role: string) => {
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {

            const result = await updateRole({ role, id: id })
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
    const handleStatus = async (id: string, status: string) => {
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {

            const result = await updateStatus({ status, id: id })
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
    return (
        <div className='mb-16 p-1 text-4xl font-bold uppercase'>
            <h1 className='my-4 text-center'>User Management</h1>
            {/* Desktop view */}
            <div className="overflow-x-auto font-semibold bg-white rounded-lg shadow-sm hidden md:block">
                {isLoading ? (
                    <TableSkeleton row={10} />
                ) : isError ? (
                    <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Error loading users'}</div>
                ) : users?.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No users found.</p>
                ) : (
                    <table className="min-w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                {usersTableHeads?.map((head: string) => (
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
                            {users?.map((user: TUser) => (
                                <UserTable
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
                    <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Error loading users'}</div>
                ) : users?.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No users found.</p>
                ) : (
                    users?.map((user: TUser) => (
                        <div
                            key={user?._id}
                            className={`${user?.status === 'blocked' ? 'text-red-600 border border-red-600' : 'text-gray-800 border border-gray-200'} bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition`}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                <div>
                                    <p className="">Phone</p>
                                    <p className="font-medium ">
                                        {user?.phone || '—'}
                                    </p>
                                </div>

                                <div>
                                    <p className="">Email</p>
                                    <p className="font-medium break-all">
                                        {user?.email || '—'}
                                    </p>
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
                                    <option disabled>Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="employee">Employee</option>
                                    <option value="specialManager">Special Manager</option>
                                    <option value="salesManager">Sales Manager</option>
                                    <option value="purchaseManager">Purchase Manager</option>
                                    <option value="deliveryManager">Delivery Manager</option>
                                    <option value="commissionManager">Commission Manager</option>
                                    <option value="employee">Employee</option>
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
            </div>

        </div>
    );
};

export default UserManagementPage;
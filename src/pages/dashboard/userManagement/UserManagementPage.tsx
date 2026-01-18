/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from 'react-toastify';
import TableSkeleton from '../../../components/table/TableSkeleton';
import { useGetAllUsersQuery, useUpdateRoleMutation } from '../../../redux/features/auth/authApi';
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
                            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition"
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
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-800">
                                            {user?.name}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            User Information
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
                                    <p className="text-gray-500">Phone</p>
                                    <p className="font-medium text-gray-800">
                                        {user?.phone || '—'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Email</p>
                                    <p className="font-medium text-gray-800 break-all">
                                        {user?.email || '—'}
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}

                            {/* Role Update */}
                            <div className="flex flex-col gap-2">


                                <select
                                    defaultValue={user?.role}
                                    className="select select-bordered w-full mt-2"
                                    onChange={(e) => handleUpdate(user?._id, e.target.value)}
                                >
                                    <option disabled>Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="employee">Employee</option>
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
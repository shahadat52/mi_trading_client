import { FaUserCircle, FaEnvelope, FaPhone, FaBuilding } from "react-icons/fa";
import { useGetMyDataQuery } from "../../redux/features/auth/authApi";
import Modal from "../../components/Modal";
import { useState } from "react";
import EditProfileForm from "./EditProfileForm";
import ErrorBoundary from "../../components/ErrorBoundary";
import ProfileSkeleton from "./ProfileSkeleton";
import { useAppDispatch } from "../../redux/hook";
import { logOut } from "../../redux/features/auth/authSlice";


const ProfilePage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { data, isLoading, error } = useGetMyDataQuery(undefined);
    const dispatch = useAppDispatch();

    const user = data?.data || null;
    console.log(user)
    const handleLogOut = () => {
        dispatch(logOut())
    }
    if (isLoading) return <ProfileSkeleton />;
    if (error) return <ErrorBoundary />;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                {/* Avatar */}
                <div className="flex flex-col items-center">
                    <FaUserCircle className="h-24 w-24 text-gray-400" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">{user?.name}</h2>
                    <p className="text-sm text-gray-500">{user?.role} • {user?.department}</p>
                </div>

                {/* Info Section */}
                <div className="mt-6 space-y-4 text-sm sm:text-base">
                    <div className="flex items-center text-gray-700">
                        <FaEnvelope className="mr-3 text-blue-500" />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <FaPhone className="mr-3 text-green-500" />
                        <span>{user?.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <FaBuilding className="mr-3 text-purple-500" />
                        <span>{user?.department}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Edit Profile
                    </button>
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <EditProfileForm onClose={() => setIsOpen(false)} />
                    </Modal>
                    <button
                        onClick={handleLogOut}
                        className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
// ProfileSkeleton.jsx
import { FaUserCircle } from "react-icons/fa";

const ProfileSkeleton = () => {
    return (
        <div className="min-h-screen  bg-gray-50 flex flex-col items-center p-4 sm:p-6">
            <div className="bg-white animate-pulse shadow-lg rounded-lg w-full max-w-md p-6 ">
                {/* Avatar */}
                <div className="flex flex-col items-center">
                    <FaUserCircle className="h-24 w-24 text-gray-300" />
                    <div className="mt-4 h-5 w-32 bg-gray-200 rounded"></div>
                    <div className="mt-2 h-4 w-24 bg-gray-200 rounded"></div>
                </div>

                {/* Info Section */}
                <div className="mt-6 space-y-4 text-sm sm:text-base">
                    <div className="flex items-center">
                        <div className="h-4 w-4 bg-gray-200 rounded mr-3"></div>
                        <div className="h-4 w-40 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="h-4 w-4 bg-gray-200 rounded mr-3"></div>
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="h-4 w-4 bg-gray-200 rounded mr-3"></div>
                        <div className="h-4 w-28 bg-gray-200 rounded"></div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
                    <div className="h-10 w-full sm:w-24 bg-gray-200 rounded"></div>
                    <div className="h-10 w-full sm:w-24 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSkeleton;
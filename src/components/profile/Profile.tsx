/* eslint-disable @typescript-eslint/no-explicit-any */

import { FaUserTie } from 'react-icons/fa';

const Profile = ({ person }: { person: any }) => {
    return (
        <div className="flex flex-col justify-center items-center gap-2 rounded-2xl border  border-white/20  bg-green-50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] py-3 px-6  ">
            <div className="w-18 h-18 rounded-full bg-blue-100 flex items-center justify-center text-green-800 text-4xl">
                <FaUserTie />
            </div>
            <div className='text-center mt-[-8px]'>
                <h2 className="text-lg   font-semibold">{person?.name}</h2>
                <p className="text-sm text-gray-500">{person?.phone}</p>
            </div>
        </div>
    );
};

export default Profile;
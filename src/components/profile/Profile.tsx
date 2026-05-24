/* eslint-disable @typescript-eslint/no-explicit-any */

import { FaUserTie } from 'react-icons/fa';

const Profile = ({ person }: { person: any }) => {
    return (
        <div className="mx-auto rounded m-1 w-1/2 grid grid-cols-3  justify-between items-center gap-2  border  border-white/20  bg-green-50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] py-3  ">
            <div className="col-span-1 mt-[-12px] w-12 h-12 rounded-full  flex items-center justify-center text-green-800 text-4xl">
                <FaUserTie />
            </div>
            <div className='col-span-2 text-start pr-2'>
                <h2 className="text-sm   font-semibold">{person?.name}</h2>
                <p className="text-xs text-gray-500">{person?.phone}</p>
            </div>
        </div>
    );
};

export default Profile;
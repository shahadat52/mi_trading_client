/* eslint-disable @typescript-eslint/no-explicit-any */


const Profile = ({ person }: { person: any }) => {
    return (
        <div className="mx-auto rounded m-1 max-w-1/2 grid   justify-between items-center gap-2  border  border-white/20  bg-green-50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] py-3  ">

            <div className='col-span-2  text-start p-5'>
                <h2 className="text-center text-sm   font-semibold">{person?.name}</h2>
                <p className="text-center text-xs font-semibold text-black">{person?.phone}</p>
                <p className="p-2 text-center text-xs text-black">{person?.address}</p>
            </div>
        </div>
    );
};

export default Profile;
// import { type SubmitHandler, useForm } from 'react-hook-form';
// import { FaRegEdit } from 'react-icons/fa';
// import { useAppDispatch, useAppSelector } from '../../redux/hook';

// const AddressPage = () => {
//     const address = useAppSelector((state: any) => state.auth.address);
//     const dispatch = useAppDispatch();
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm<any>();

//     const onSubmit: SubmitHandler<any> = (data) => {
//         const formData = {
//             ...data,
//             isAdded: true,
//         };
//         dispatch(addAddress(formData));
//         reset();
//     };

//     const handleEdit = () => {
//         dispatch(editAddress(undefined))
//     }
//     return (
//         <>
//             {
//                 address.isAdded ?
//                     <div className='shadow bg-white rounded-xl'>
//                         <div className="flex justify-between items-center max-w-md mx-auto  rounded-xl  p-4 ">
//                             <h2 className="text-2xl font-bold mb-4">Your Address</h2>
//                             <button onClick={handleEdit} className="text-white btn btn-sm btn-primary flex items-center gap-1">
//                                 <FaRegEdit /> Edit Address
//                             </button>
//                         </div>

//                         <div className=" rounded-xl p-4 ">
//                             <p className="text-lg font-semibold text-gray-700">{address.name}</p>
//                             <p className="text-base text-gray-600">{address.phone}</p>
//                             <p className="text-base text-gray-600">{address.email}</p>
//                             <p className="text-base text-gray-600">{address.address}</p>
//                         </div>
//                     </div>
//                     : <div className="max-w-md mx-auto bg-white rounded-xl shadow p-4">
//                         <h2 className="text-xl font-semibold text-gray-700 text-center mb-3">Add Address</h2>
//                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 text-sm">
//                             <div>
//                                 <input
//                                     type="text"
//                                     placeholder="Full Name"
//                                     defaultValue={address.name}
//                                     {...register('name', { required: 'Name is required' })}
//                                     className="w-full input input-sm input-bordered"
//                                 />
//                                 {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name.message}</p>}
//                             </div>

//                             <div>
//                                 <input
//                                     type="tel"
//                                     placeholder="Phone Number"
//                                     defaultValue={address.phone}

//                                     {...register('phone', {
//                                         required: 'Phone number is required',
//                                         pattern: {
//                                             value: /^[0-9]{10,15}$/,
//                                             message: 'Invalid phone number',
//                                         },
//                                     })}
//                                     className="w-full input input-sm input-bordered"
//                                 />
//                                 {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone.message}</p>}
//                             </div>
//                             <div>
//                                 <input
//                                     type="tel"
//                                     placeholder="Email"
//                                     defaultValue={address.email}

//                                     {...register('email', {
//                                         required: 'Email number is required',
//                                         pattern: {
//                                             value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                                             message: 'Invalid email address',
//                                         },
//                                     })}
//                                     className="w-full input input-sm input-bordered"
//                                 />
//                                 {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone.message}</p>}
//                             </div>


//                             <div className="grid grid-cols-1 gap-2">

//                                 <input
//                                     type="textarea"
//                                     placeholder="Full Details address (City, Street, House No, etc.)"
//                                     defaultValue={address.address}
//                                     {...register('address', { required: 'Address are required' })}
//                                     className="input input-bordered w-full"
//                                 />
//                             </div>

//                             <button type="submit" className="btn btn-sm btn-primary text-white w-full mt-2">
//                                 Save Address
//                             </button>
//                         </form>
//                     </div>
//             }

//         </>
//     );
// };

// export default AddressPage;
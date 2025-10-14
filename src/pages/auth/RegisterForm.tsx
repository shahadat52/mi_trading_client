/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from './FormInput';
import { useRegisterMutation } from '../../redux/features/auth/authApi';
import { NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';

const RegistrationForm: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [registerUser] = useRegisterMutation(undefined);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    // Watch password field to validate confirm password
    const password = watch("password", "");


    const onSubmit = async (data: any) => {
        setLoading(true)
        const toastId = toast.loading('Logging in', { autoClose: 2000 })
        console.log(data);
        const result = await registerUser(data);
        console.log(result)
        if ((result as any)?.data?.success) {
            setLoading(false)
            toast.update(toastId, { render: `${(result as any)?.data?.message}`, type: "success", isLoading: false, autoClose: 2000 })
            navigate('/login')
        } else {
            setLoading(false)
            toast.update(toastId, { render: `${(result as any)?.data?.message}`, type: "success", isLoading: false, autoClose: 2000 })
            alert((result as any)?.data?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl font-bold mb-3">REGISTER</h1>

            {/* --- Form Fields --- */}

            <FormInput
                label="NAME"
                type="text"
                name="name"
                register={register}
                error={errors.name}
            />

            <FormInput
                label="PHONE"
                type="text"
                name="phone"
                register={register}
                error={errors.phone}
            />

            <FormInput
                label="EMAIL"
                type="email"
                name="email"
                register={register}
                error={errors.email}
            />

            <FormInput
                label="PASSWORD"
                type="password"
                name="password"
                register={register}
                error={errors.password}
            />

            {/* CONFIRM PASSWORD Field with custom RHF validation */}
            <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1 uppercase text-gray-400">
                    CONFIRM PASSWORD
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: value =>
                            value === password || "Passwords do not match"
                    })}
                    className={`w-full p-2 border-b-2 bg-transparent text-white 
                      focus:outline-none placeholder-gray-500 transition duration-300
                      ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600 focus:border-teal-500'}`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{String(errors.confirmPassword.message)}</p>}
            </div>


            {/* --- Submit Button --- */}
            <button
                type="submit"
                className="w-full py-3 rounded-md bg-teal-500 hover:bg-teal-600 
                   font-bold text-lg text-white transition duration-300 shadow-lg 
                   shadow-teal-500/50"
            >
                {
                    loading ? <Loading /> : 'Create Account'
                }
            </button>
            <p className='py-4'>Have you account?
                <NavLink to={`/login`} className='text-blue-600 font-bold text-[15px] '> Sign In</NavLink>
            </p>
        </form>
    );
}

export default RegistrationForm;
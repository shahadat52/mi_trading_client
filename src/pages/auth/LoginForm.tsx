/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from './FormInput';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

type LoginFormInputs = {
    phone: string;
    email: string;
    password: string;
};
const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [login] = useLoginMutation(undefined);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);



    const onSubmit = async (data: LoginFormInputs) => {
        setLoading(true);
        const toastId = toast.loading('Logging in', { autoClose: 2000 })
        const result = await login(data);

        const user = result;
        console.log(user);

        if (result?.data?.success) {
            toast.update(toastId, { render: `${(result as any)?.data?.message}`, type: "success", isLoading: false, autoClose: 2000 })
            const path = new URL(result.data.data.otpSendingUiLink);
            console.log(path)
            setLoading(false);
            navigate(`${path.pathname}`);
        } else {
            setLoading(false);
            toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 })
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* --- Form Fields --- */}


            <FormInput
                label="PHONE"
                type="text"
                name="phone"
                register={register}
                error={errors.phone}
            />

            <FormInput
                label="PASSWORD"
                type={showPassword ? "text" : "password"}
                name="password"
                register={register}
                error={errors.password}
            />
            <button
                type="button"
                className="text-sm text-blue-500 underline"
                onClick={() => setShowPassword(!showPassword)}
            >

                {showPassword ? <p className="text-2xl text-white"><IoIosEyeOff /></p> : <p className="text-2xl text-white"><IoIosEye /></p>}
            </button>

            {/* CONFIRM PASSWORD Field with custom RHF validation */}



            {/* --- Submit Button --- */}
            <button
                type="submit"
                className="w-full py-3 rounded-md bg-teal-500 hover:bg-teal-600 
                   font-bold text-lg text-white transition duration-300 shadow-lg 
                   shadow-teal-500/50"
            >
                {
                    loading ? <Loading /> : 'Sign in'
                }
            </button>
        </form>
    );
}

export default LoginForm;
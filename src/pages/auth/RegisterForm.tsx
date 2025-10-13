/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useForm } from 'react-hook-form';

// A reusable input component for cleaner code
interface FormInputProps {
    label: string;
    type: string;
    name: string;
    register: any;
    error?: { message?: string };
}

const FormInput: React.FC<FormInputProps> = ({ label, type, name, register, error }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-semibold mb-1 uppercase text-gray-400">
            {label}
        </label>
        <input
            id={name}
            type={type}
            placeholder={label === 'EMAIL' ? 'Email address' : `Your full ${label.toLowerCase()}`}
            {...register(name, { required: `${label} is required` })}
            className={`w-full p-2 border-b-2 bg-transparent text-white 
                  focus:outline-none placeholder-gray-500 transition duration-300
                  ${error ? 'border-red-500' : 'border-gray-600 focus:border-teal-500'}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
);

const RegistrationForm: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // Watch password field to validate confirm password
    const password = watch("password", "");

    const onSubmit = (data: any) => {
        console.log("Registration Data:", data);
        alert('Registration successful! Check console for data.');
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
                label="USERNAME"
                type="text"
                name="username"
                register={register}
                error={errors.username}
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

            {/* --- Checkbox and Links --- */}
            <div className="flex items-start mb-8 text-xs">
                <input
                    id="terms"
                    type="checkbox"
                    {...register("terms", { required: "You must accept the terms" })}
                    className="mr-2 mt-1 h-4 w-4 text-teal-500 bg-gray-700 border-gray-600 rounded focus:ring-teal-500"
                />
                <label htmlFor="terms" className="text-gray-400">
                    I agree to the <a href="#" className="text-teal-400 hover:text-teal-300">Terms of Service</a> and <a href="#" className="text-teal-400 hover:text-teal-300">Privacy Policy</a>
                </label>
                {errors.terms && <p className="text-red-500 text-xs mt-1">{String(errors.terms.message)}</p>}
            </div>

            {/* --- Submit Button --- */}
            <button
                type="submit"
                className="w-full py-3 rounded-md bg-teal-500 hover:bg-teal-600 
                   font-bold text-lg text-white transition duration-300 shadow-lg 
                   shadow-teal-500/50"
            >
                CREATE ACCOUNT
            </button>
        </form>
    );
}

export default RegistrationForm;
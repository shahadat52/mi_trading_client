/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";

interface FormInputProps {
    label: string;
    type: string;
    name: string;
    register: any;
    error?: { message?: string };
}
export const FormInput: React.FC<FormInputProps> = ({ label, type, name, register, error }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-semibold mb-1 uppercase text-gray-400">
            {label}
        </label>
        <input
            id={name}
            type={type}
            placeholder={label === 'EMAIL' ? 'Email address' : `Your  ${label.toLowerCase()}`}
            {...register(name, { required: `${label} is required` })}
            className={`w-full p-2 border-b-2 bg-transparent text-white
                  focus:outline-none placeholder-gray-500 transition duration-300
                  ${error ? 'border-red-500' : 'border-gray-600 focus:border-teal-500'}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
);

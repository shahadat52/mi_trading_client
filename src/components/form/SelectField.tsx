/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";

interface FormSelectProps {
    name: string;
    label: string;
    control: any;
    options: { label: string; value: string }[];
    rules?: object;
    placeholder?: string
}

const SelectField = ({ name, label, control, options, rules, placeholder }: FormSelectProps) => (
    <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-medium">{label === 'no' ? '' : label}</label>
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <>
                    <select {...field} className={`select select-bordered w-full ${fieldState.error ? "border-red-500" : ""}`}>
                        <option value="" >{placeholder ? placeholder : 'Select'} {label === 'no' ? '' : label}</option>
                        {options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {fieldState.error && (
                        <span className="text-red-500 text-xs">{fieldState.error.message}</span>
                    )}
                </>
            )}
        />
    </div>
);

export default SelectField;

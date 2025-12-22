/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";

interface Props {
    name: string;
    label: string;
    control: any;
    placeholder?: string;
    rules?: object;
}

const TextAreaField = ({ name, label, control, placeholder, rules }: Props) => (
    <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-medium">{label}</label>
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <>
                    <textarea
                        {...field}
                        placeholder={placeholder}
                        className={`textarea textarea-bordered w-full ${fieldState.error ? "border-red-500" : ""}`}
                    />
                    {fieldState.error && (
                        <span className="text-red-500 text-xs">{fieldState.error.message}</span>
                    )}
                </>
            )}
        />
    </div>
);

export default TextAreaField;

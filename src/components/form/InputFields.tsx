/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";

interface FormInputProps {
    name: string;
    label: string;
    control: any;
    readOnly?: boolean;
    type?: string;
    placeholder?: string;
    rules?: object;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

const InputField = ({ name, label, control, type = "text", placeholder, rules, readOnly = false, onChange, }: FormInputProps) => {
    return (
        <div className="flex flex-col gap-1 w-full mb-4">
            <label className="text-sm font-medium">{label}</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <>
                        <input
                            {...field}
                            value={field.value ?? ""}
                            type={type}
                            readOnly={readOnly}
                            placeholder={placeholder}
                            className={`input input-bordered w-full ${fieldState.error ? "border-red-500" : ""}`}
                            onChange={(e) => {
                                field.onChange(e);     // <-- react-hook-form controlled update
                                if (onChange) onChange(e); // <-- your custom handler
                            }}
                        />
                        {fieldState.error && (
                            <span className="text-red-500 text-xs">{fieldState.error.message}</span>
                        )}
                    </>
                )}
            />
        </div>
    );
};

export default InputField;

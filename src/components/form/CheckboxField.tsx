/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";

interface Props {
    name: string;
    label: string;
    control: any;
}

const CheckboxField = ({ name, label, control }: Props) => (
    <div className="flex items-center gap-2">
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <input
                    type="checkbox"
                    {...field}
                    checked={field.value}
                    className="checkbox checkbox-primary"
                />
            )}
        />
        <span className="text-sm">{label}</span>
    </div>
);

export default CheckboxField;

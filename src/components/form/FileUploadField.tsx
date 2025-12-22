/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";
import { useState } from "react";

interface Props {
    name: string;
    label: string;
    control: any;
}

const FileUploadField = ({ name, label, control }: Props) => {
    const [preview, setPreview] = useState<string | null>(null);

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment" // enables mobile camera
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                field.onChange(file);
                                if (file) setPreview(URL.createObjectURL(file));
                            }}
                            className="file-input file-input-bordered w-full"
                        />
                        {preview && <img src={preview} alt="Preview" className="w-24 h-24 object-cover mt-2 rounded" />}
                    </>
                )}
            />
        </div>
    );
};

export default FileUploadField;

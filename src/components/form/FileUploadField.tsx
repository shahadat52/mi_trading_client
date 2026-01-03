/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";
import { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa"; // react-icons ব্যবহার করলে

interface Props {
    name: string;
    label: string;
    control: any;
}

const FileUploadField = ({ name, label, control }: Props) => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                field.onChange(file);
                                if (file) setPreview(URL.createObjectURL(file));
                            }}
                            className="hidden"
                        />

                        {/* Camera icon button */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 rounded bg-gray-200 hover:bg-gray-300 w-fit"
                        >
                            <FaCamera className="text-xl text-gray-700" />
                        </button>

                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-24 h-24 object-cover mt-2 rounded"
                            />
                        )}
                    </>
                )}
            />
        </div>
    );
};

export default FileUploadField;

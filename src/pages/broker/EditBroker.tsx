/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type FieldValues } from "react-hook-form";
import { useBrokerUpdateMutation, useGetBrokerByIdQuery } from "../../redux/features/broker/brokerApi";
import { compressImage } from "../../utils/compressImage";
import { useState } from "react";
import ImagePicker from "../../components/ImagePicker";


const EditBroker = ({ onClose, id }: any) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [updateBroker] = useBrokerUpdateMutation()
    const { data } = useGetBrokerByIdQuery(id)
    const broker = data?.data

    const handleComprssImage = async (file: any) => {
        if (!file) return;
        const compressedFile = await compressImage(file);
        setImageFile(compressedFile);
    }

    const onSubmit = async (data: FieldValues) => {
        try {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("phone", data.phone);

            if (imageFile) {
                formData.append("image", imageFile);
            }

            const result: any = await updateBroker({
                id,
                formData,
            });

            if (result?.data?.success) {
                alert(result.data.message);
                onClose?.();
            }
        } catch (error) {
        }
    };



    return (
        <form onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 space-y-4"
        >
            <h2 className="text-lg font-semibold text-gray-800">
                Update Entry
            </h2>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Name
                </label>
                <input
                    type="text"
                    step="any"
                    defaultValue={broker?.name}
                    placeholder={broker?.name}
                    {...register("name", {
                        required: "Name is required"
                    })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                        {(errors.name.message as string)}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Phone
                </label>
                <input
                    type="text"
                    defaultValue={broker?.phone}
                    placeholder={broker?.phone}
                    {...register("phone", {
                        required: "phone is required"
                    })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">
                        {(errors.phone.message as string)}
                    </p>
                )}
            </div>

            <div>
                <ImagePicker
                    onFileSelect={(file) => {
                        handleComprssImage(file);
                    }}
                />

                {imageFile && (
                    <p className="text-xs text-green-600 mt-1">
                        {imageFile.name}
                    </p>
                )}

                {imageFile && (
                    <img
                        src={URL.createObjectURL(imageFile)}
                        alt="preview"
                        className="w-10 h-15 object-cover rounded mt-2"
                    />
                )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Updating..." : "Update"}
                </button>
            </div>
        </form>
    );
};

export default EditBroker;
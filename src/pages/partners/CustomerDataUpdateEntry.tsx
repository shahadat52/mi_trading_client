/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type FieldValues } from "react-hook-form";
import InputField from "../../components/form/InputFields";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetCustomerByIdQuery, useUpdateCustomerDataMutation } from "../../redux/features/customer/customerApi";
import SelectField from "../../components/form/SelectField";
import ImagePicker from "../../components/ImagePicker";
import { compressImage } from "../../utils/compressImage";

const CustomerDataUpdateEntry = ({ onClose, id }: { onClose: () => void, id: string }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false)
    const { data } = useGetCustomerByIdQuery(id)
    const customer = data?.data;
    const { control, handleSubmit, reset } = useForm();
    const [updateCustomerData] = useUpdateCustomerDataMutation();

    const handleComprssImage = async (file: any) => {
        if (!file) return;
        const compressedFile = await compressImage(file);
        setImageFile(compressedFile);
    }

    const handleUpdate = async (data: FieldValues) => {
        setLoading(true);

        const toastId = toast.loading("Processing...");

        try {
            const formData = new FormData();

            // Customer information
            formData.append("name", data.name ?? "");
            formData.append("phone", data.phone ?? "");
            formData.append("category", data.category ?? "");
            formData.append("address", data.address ?? "");
            formData.append("type", data.type ?? "");

            // Image (optional)
            if (imageFile) {
                formData.append("image", imageFile);
            }

            // Send FormData to API
            const result = await updateCustomerData({
                id,
                formData,
            }).unwrap();
            if (result?.success) {
                toast.update(toastId, {
                    render: result.message || "তথ্য সফলভাবে আপডেট হয়েছে",
                    type: "success",
                    isLoading: false,
                    autoClose: 1500,
                    closeOnClick: true,
                });

                reset();
                setImageFile(null);
                onClose();
            }
        } catch (err: any) {
            toast.update(toastId, {
                render:
                    err?.data?.message ||
                    err?.error?.data?.message ||
                    "তথ্য আপডেট করা যায়নি!",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (customer) {
            reset({
                name: customer.name,
                phone: customer.phone,
                category: customer.category,
                address: customer.address,
                type: customer.type,
            });
        }
    }, [customer, reset]);

    return (
        <div>
            <form
                onSubmit={handleSubmit(handleUpdate)}
            >
                <InputField
                    control={control}
                    label="নাম"
                    name="name"
                    placeholder={customer?.name} />

                <InputField
                    control={control}
                    label="ফোন"
                    name="phone"
                    placeholder={customer?.phone} />

                <SelectField
                    name="category"
                    label="ক্যাটেগরি *"
                    control={control}
                    rules={{ required: "ক্যাটেগরি নাই" }}
                    placeholder={customer?.category}
                    options={[
                        { value: "khatungonj", label: "খাতুনগঞ্জ" },
                        { value: "caktai", label: "চাক্তাই" },
                        { value: "outside", label: "বাহির" },

                    ]}
                />
                <InputField
                    control={control}
                    label="ঠিকানা"
                    name="address"
                    placeholder={customer?.address} />

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

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full mt-2"
                >
                    {loading ? (
                        <span className="loading loading-dots loading-lg"></span>
                    ) : (
                        "তথ্য আপডেট করুন"
                    )}
                </button>

            </form>

        </div>
    );
};

export default CustomerDataUpdateEntry;
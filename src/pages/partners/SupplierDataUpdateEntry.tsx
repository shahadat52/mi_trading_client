/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type FieldValues } from "react-hook-form";
import InputField from "../../components/form/InputFields";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetSupplierByIdQuery, useUpdateSupplierDataMutation } from "../../redux/features/supplier/supplierApi";
import SelectField from "../../components/form/SelectField";
import { SUPPLIER_TYPE_OPTIONS } from "../../utils/options";
import ImagePicker from "../../components/ImagePicker";
import { compressImage } from "../../utils/compressImage";

const SupplierDataUpdateEntry = ({ onClose, id }: { onClose: () => void, id: string }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, reset } = useForm();
    const [updateSupplierData] = useUpdateSupplierDataMutation();
    const { data } = useGetSupplierByIdQuery(id)
    const supplier = data?.data;

    const handleComprssImage = async (file: any) => {
        if (!file) return;
        const compressedFile = await compressImage(file);
        setImageFile(compressedFile);
    }
    const handleUpdate = async (data: FieldValues) => {

        setLoading(true)
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("phone", data.phone);
            formData.append("type", data.type);
            formData.append("address", data.address);

            if (imageFile) {
                formData.append("image", imageFile);
            }
            const payload = {
                id,
                formData
            };
            const result = await updateSupplierData(payload);
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                reset();
                setLoading(false);
                onClose();

            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });
                setLoading(false);
            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });
            setLoading(false);
        } finally {
            // reset()
            setLoading(false);
        }
    }

    useEffect(() => {
        if (supplier) {
            reset({
                name: supplier.name,
                phone: supplier.phone,
                address: supplier.address,
                type: supplier.type,
            });
        }
    }, [supplier, reset]);
    return (
        <div className="m-4">
            <form
                onSubmit={handleSubmit(handleUpdate)}

            >
                <InputField
                    control={control}
                    label="নাম"
                    name="name"
                    placeholder={supplier?.name} />

                <InputField
                    control={control}
                    label="ফোন"
                    name="phone"
                    placeholder={supplier?.phone} />

                <InputField
                    control={control}
                    label="ঠিকানা"
                    name="address"
                    placeholder={supplier?.address} />

                <SelectField
                    name="type"
                    label="Type *"
                    control={control}
                    rules={{ required: "Supplier type is required" }}
                    options={SUPPLIER_TYPE_OPTIONS}
                />
                <div className="mt-1">
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

export default SupplierDataUpdateEntry;
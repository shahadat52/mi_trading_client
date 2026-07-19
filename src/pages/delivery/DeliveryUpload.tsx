import { useParams } from 'react-router';
import { compressImage } from '../../utils/compressImage';
import ImagePicker from '../../components/ImagePicker';
import { useState } from 'react';
import { useGetDeliveryQuery, useUploadImageMutation } from '../../redux/features/delivery/deliveryApi';
import { toast } from 'react-toastify';
import { IoMdCloudUpload } from 'react-icons/io';


const DeliveryUpload = () => {
    const { id } = useParams();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false)

    const { data } = useGetDeliveryQuery({ id })
    const delivery = data?.data || {}
    const handleComprssImage = async (file: any) => {
        if (!file) return;
        const compressedFile = await compressImage(file);
        setImageFile(compressedFile);
    };

    const [uploadImage] = useUploadImageMutation();
    const handleUploadImage = async (id: string) => {
        const toastId = toast.loading("Processing...");
        setLoading(true)
        try {
            setLoading(true);
            const formData = new FormData()
            if (imageFile) {
                formData.append("image", imageFile);
            }

            const result = await uploadImage({ id, formData });
            if (result?.data?.success) {
                setLoading(false)
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });

            } else {
                setLoading(false)
                toast.update(toastId, { render: `${(result as any)?.error?.data?.errorSource[0].message}`, type: "error", isLoading: false, autoClose: 2000 });
            }
        } catch (err: any) {
            setLoading(false)
            toast.update(toastId, { render: err?.error?.data?.errorSource[0].message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="max-h-[80vh] overflow-y-auto p-5 space-y-6 bg-gray-50 rounded-xl">

            {/* Current Image */}
            <div className="bg-white rounded-xl shadow border p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">
                    Current Image
                </h2>

                {delivery?.imageurl ? (
                    <img
                        src={delivery.imageurl}
                        alt="Current"
                        className="w-full max-h-[350px] object-contain rounded-lg border"
                    />
                ) : (
                    <div className="h-52 flex items-center justify-center border-2 border-dashed rounded-lg text-gray-400">
                        No image available
                    </div>
                )}
            </div>

            {/* Image Picker */}
            <div className="bg-white rounded-xl shadow border p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Select New Image
                </h2>

                <ImagePicker
                    onFileSelect={(file) => {
                        handleComprssImage(file);
                    }}
                />

                {imageFile && (
                    <div className="mt-5">
                        <p className="text-sm font-medium text-green-600 mb-3">
                            {imageFile.name}
                        </p>

                        <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Preview"
                            className="w-full max-h-[300px] object-contain rounded-lg border"
                        />
                    </div>
                )}
            </div>

            {/* Upload Button */}
            {imageFile && (
                <button
                    onClick={() => handleUploadImage(delivery._id as string)}
                    disabled={loading}
                    className={`
              w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-3
              transition-all duration-200
              ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }
          `}
                >
                    {loading ? (
                        <>
                            <svg
                                className="w-5 h-5 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>

                            <span>Uploading...</span>
                        </>
                    ) : (
                        <>
                            <IoMdCloudUpload size={26} />
                            <span>Upload Image</span>
                        </>
                    )}
                </button>
            )}
        </div>
    );
};

export default DeliveryUpload;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import type { TDelivery } from '../../interfaces/delivery';
import { useDeliveryStatusUpdateMutation } from '../../redux/features/delivery/deliveryApi';
import { useAppSelector } from '../../redux/hook';
import { format } from 'date-fns';
import ImagePicker from '../../components/ImagePicker';
import { useState } from 'react';
import { compressImage } from '../../utils/compressImage';

const DeliveryTableBody = ({ d, openDeliverySlip, }: { d: TDelivery; openDeliverySlip: any; }) => {
    // const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null);
    const user = useAppSelector((state: any) => state?.auth?.auth?.user);
    const [updateDeliveryStatus] = useDeliveryStatusUpdateMutation();

    const handleDeliveryStatusUpdate = async (id: string, invoice: string) => {
        const isConfirm = confirm(`এই পন্যের ডেলিভারি ম্যান ${user?.name}?`)
        if (!isConfirm) {
            return
        }
        const toastId = toast.loading('Processing...', { autoClose: 2000 });

        try {
            const result: any = await updateDeliveryStatus({
                id,
                invoice,
            });
            if (result?.data?.success) {
                toast.update(toastId, {
                    render: result.data.message,
                    type: 'success',
                    isLoading: false,
                    autoClose: 1500,
                    closeOnClick: true,
                });
            } else {
                toast.update(toastId, {
                    render: result?.error?.data?.message || 'Failed!',
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000,
                });
            }
        } catch (err: any) {
            toast.update(toastId, {
                render:
                    err?.error?.data?.message || 'Something went wrong!',
                type: 'error',
                isLoading: false,
                autoClose: 2000,
            });
        }
    };

    const handleComprssImage = async (file: any) => {
        if (!file) return;
        const compressedFile = await compressImage(file);
        setImageFile(compressedFile);
    };

    // const [uploadImage] = useUploadImageMutation();
    // const handleUploadImage = async () => {
    //     const toastId = toast.loading("Processing...");
    //     const payload = {}
    //     setLoading(true)

    //     try {
    //         setLoading(true);
    //         const formData = new FormData();

    //         Object.entries(payload).forEach(([key, value]) => {
    //             formData.append(key, String(value));
    //         });

    //         if (imageFile) {
    //             formData.append("image", imageFile);
    //         }
    //         const result = await uploadImage(formData);
    //         if (result?.data?.success) {
    //             setLoading(false)
    //             toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });

    //         } else {
    //             setLoading(false)
    //             toast.update(toastId, { render: `${(result as any)?.error?.data?.errorSource[0].message}`, type: "error", isLoading: false, autoClose: 2000 });
    //         }
    //     } catch (err: any) {
    //         setLoading(false)
    //         toast.update(toastId, { render: err?.error?.data?.errorSource[0].message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-1 py-1 border">{d?.sales?.customer?.name}</td>
            <td className="px-1 py-1 border">{d?.deliveryBy}</td>

            <td className="px-1 py-1 border text-center">
                <span>
                    {format(d?.updatedAt, 'dd/MM/yyyy')}
                </span>
                <br />
                <span>
                    {format(d?.updatedAt, 'hh:mm aa')}
                </span>
            </td>

            <td className="px-1 py-1 border">{d?.via}</td>

            <td className="px-1 py-1 border">{d?.sales?.invoice}</td>

            <td className="px-1 py-1 border">{d?.destination}</td>

            <td className="px-1 py-1 border">
                <button
                    onClick={() =>
                        handleDeliveryStatusUpdate(
                            d._id as string,
                            d?.sales?.invoice as string
                        )
                    }
                    disabled={d.deliveryBy !== ""}
                    className={`px-1 py-1 rounded text-white ${d.deliveryBy === ""
                        ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                        : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    সম্পন্ন করুন
                </button>
            </td>

            <td className="px-1 py-1 border">
                <button
                    onClick={() => openDeliverySlip(d)}
                    className="bg-blue-600 text-white px-1 py-1 rounded"
                >
                    স্লিপ প্রিন্ট করুণ
                </button>
            </td>
            <td className="px-1 py-1 border">
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
            </td>
        </tr>
    );
};

export default DeliveryTableBody;
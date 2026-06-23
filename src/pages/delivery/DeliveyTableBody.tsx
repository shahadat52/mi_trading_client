/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import type { TDelivery } from '../../interfaces/delivery';
import { useDeliveryStatusUpdateMutation } from '../../redux/features/delivery/deliveryApi';
import { useAppSelector } from '../../redux/hook';
import { format } from 'date-fns';

const DeliveryTableBody = ({ d, openDeliverySlip, }: { d: TDelivery; openDeliverySlip: any; }) => {
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
                    className="bg-blue-600 text-white px-1 py-1 rounded"
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
        </tr>
    );
};

export default DeliveryTableBody;
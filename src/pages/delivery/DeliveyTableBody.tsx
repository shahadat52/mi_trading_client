/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TDelivery } from '../../interfaces/delivery';

const DeliveryTableBody = ({ d, openDeliverySlip }: { d: TDelivery, openDeliverySlip: any }) => {

    return (
        <>
            <tr key={d._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{d?.deliveryBy?.name}</td>
                <td className="px-4 py-2 border text-center">
                    <span>{new Date(d.deliveryTime).toLocaleDateString()}</span> <br />
                    <span>{new Date(d.deliveryTime).toLocaleTimeString()}</span>

                </td>
                <td className="px-4 py-2 border">{d?.via}</td>
                <td className="px-4 py-2 border">{d?.sales?.invoice}</td>
                <td className="px-4 py-2 border">{d?.destination}</td>
                <td className="px-4 py-2 border">{d?.description}</td>
                <td className="px-4 py-2 border">
                    <button
                        onClick={() => openDeliverySlip(d)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    > স্লিপ প্রিন্ট করুণ
                    </button>

                </td>

            </tr>



        </>
    );
};

export default DeliveryTableBody;
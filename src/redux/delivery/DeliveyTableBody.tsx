import type { TDelivery } from '../../interfaces/delivery';

const DeliveryTableBody = ({ d }: { d: TDelivery }) => {
    return (
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
        </tr>
    );
};

export default DeliveryTableBody;
/* eslint-disable @typescript-eslint/no-explicit-any */

const StockTableBody = ({ product, idx, }: { product: any; idx: number; }) => {

    return (
        <>
            <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{product?.name}</td>
                <td className="px-4 py-2 border">{product?.sku}</td>
                <td className="px-4 py-2 border">{product?.stockQty}</td>
                <td className="px-4 py-2 border">{product?.unit}</td>
                <td className="px-4 py-2 border text-center">{product?.category}</td>
            </tr>
        </>
    );
};

export default StockTableBody;

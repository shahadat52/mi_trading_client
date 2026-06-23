import { ceil } from "mathjs";

/* eslint-disable @typescript-eslint/no-explicit-any */
const StockTableBody = ({ product, idx, }: { product: any; idx: number; }) => {

    return (
        <tr key={product._id} className="hover:bg-gray-50 lg:text-lg md:text-xs text-xs ">
            <td className="text-center px-1 py-2 border">{idx + 1}</td>
            <td className="px-1 py-2 border">{product?.name}</td>
            <td className="text-center  px-1 py-2 border">{product?._id}</td>
            <td className="text-center  px-1 py-2 border">{product?.bag}</td>
            <td className="text-center  px-1 py-2 border">{product?.totalStock} {product?.unit}</td>
            <td className="text-center px-1 py-2 border">{product?.price}</td>
            <td className=" px-1 py-2 border text-center">{ceil(product?.totalAmount)}</td>
        </tr>
    );
};

export default StockTableBody;

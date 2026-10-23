import { customRound } from "../../utils/customRound";

/* eslint-disable @typescript-eslint/no-explicit-any */
const StockTableBody = ({ product, idx, }: { product: any; idx: number; }) => {

    return (
        <tr key={product._id} className={`lg:text-lg md:text-xs text-xs ${product?.bag <= 10 && product?.bag >= 6 ? "bg-yellow-600 text-white" : ""} ${product?.bag <= 5 ? "bg-red-600 text-white" : ""} `}>
            <td className="text-center px-1 py-2 border">{idx + 1}</td>
            <td className="px-1 py-2 border">{product?.name}</td>
            <td className="text-center  px-1 py-2 border">{product?._id}</td>
            <td className="text-center  px-1 py-2 border">{product?.bag}</td>
            <td className="text-center  px-1 py-2 border">{customRound(product?.totalStock)} {product?.unit}</td>
            <td className="text-center px-1 py-2 border">{(product?.price).toFixed(3)}</td>
            <td className=" px-1 py-2 border text-center">{customRound(product?.totalAmount)}</td>
        </tr>
    );
};

export default StockTableBody;

import { useState } from "react";
import CardSkeleton from "../../components/CardSkeleton";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { useDebounce } from "../../utils/useDebounce";
import ProductCard from "./ProductCard";
import { LIMIT_OPTIONS } from "../../utils/options";

const NormalProductPage = ({ searchTerm }: { searchTerm: string }) => {
    const [limit, setLimit] = useState(20)
    const search = useDebounce(searchTerm)
    const { data, isLoading, isError, error } = useGetAllProductsQuery({ searchTerm: search, limit })
    const products = data?.data;
    return (
        <div className="p-2">
            <div className="flex justify-between items-center mb-2 ">
                <p>Normal products</p>
                <div className='mr-10'>
                    <select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className=" select rounded-xl ml-1"
                    >
                        {LIMIT_OPTIONS.map((opt: any) => (
                            <option key={opt.value} value={opt.value}>
                                Limit {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2, md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    isLoading ? (<CardSkeleton />)
                        : isError ? (
                            <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Failed Please Try Again'}</div>
                        ) : products?.length === 0 ? (
                            <p className="text-center text-gray-500 py-4">No products found.</p>
                        ) : (products?.map((product: any) => <ProductCard key={product?._id} item={product} isCommissionProduct={false} />)
                        )
                }
            </div>
        </div>
    );
};

export default NormalProductPage;
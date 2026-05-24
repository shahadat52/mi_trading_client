import CardSkeleton from "../../components/CardSkeleton";
import { useGetCommissionProductsQuery } from "../../redux/features/commissionProduct/commissionProductApi";
import { useDebounce } from "../../utils/useDebounce";
import ProductCard from "./ProductCard";

const CommissionProdPage = ({ searchTerm }: { searchTerm: string }) => {
    const search = useDebounce(searchTerm)
    const { data, isLoading, isError, error } = useGetCommissionProductsQuery({ searchTerm: search })
    const products = data?.data;
    return (
        <div className="p-2">
            <p>Commission products</p>

            <div className="grid grid-cols-2, md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    isLoading ? (<CardSkeleton />)
                        : isError ? (
                            <div className="p-4 text-red-600">{(error as any)?.data?.message || 'Failed Please Try Again'}</div>
                        ) : products?.length === 0 ? (
                            <p className="text-center text-gray-500 py-4">No products found.</p>
                        ) : (products?.map((product: any) => <ProductCard key={product?._id} item={product} isCommissionProduct={true} />)
                        )
                }
            </div>
        </div>
    );
};

export default CommissionProdPage;
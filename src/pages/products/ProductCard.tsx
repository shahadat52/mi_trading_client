import { addItem } from "../../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ item, isCommissionProduct }: { item: any, isCommissionProduct: boolean }) => {
    console.log(item)

    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();
    const isAlreadyInCart = cartItems?.some((p: any) => p._id === item._id);

    const handleAddToCart = () => {
        dispatch(addItem({ product: item._id, ...(isCommissionProduct && { commission: 0, supplier: item.supplier, lot: item.lot }), name: item.name, salePrice: item.salesPrice, quantity: 1, unit: item.unit }))

    }

    return (
        <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-slate-100 group">
            {/* Image Container */}


            {/* Content */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">{item?.name}</h3>
                        {
                            isCommissionProduct && <p>{item?.supplier?.name}-{item?.lot}</p>
                        }
                        <p className="text-sm font-medium text-blue-600 mb-1">{item?.category}</p>
                    </div>

                    <div className="items-baseline">
                        <p className="text-lg font-semibold text-slate-900">মূল্যঃ  {item?.salesPrice}</p>
                        <p className="text-lg text-end font-medium text-slate-900"> স্টকঃ {isCommissionProduct ? item?.quantity : item.stockQty} {item?.unit}</p>

                    </div>
                </div>

                {/* Action Button */}
                <div>

                    {
                        isAlreadyInCart ? (
                            <button className="btn btn-accent  text-green-100  font-semibold">✔ Already in Cart</button>
                        ) : (
                            <div onClick={handleAddToCart} className="">
                                <button className="btn btn-primary cursor-pointer  text-green-100 font-semibold px-2 py-1 border-2 rounded-md border-green-700 "><span className="flex items-center gap-3"><span>Add to Cart</span> <span className="text-3xl"><FaShoppingCart /></span></span> </button>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default ProductCard;
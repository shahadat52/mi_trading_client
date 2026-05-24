import { useNavigate } from "react-router";
import { addItem } from "../../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { FaShoppingCart } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";

const ProductCard = ({ item, isCommissionProduct }: { item: any, isCommissionProduct: boolean }) => {
    const navigate = useNavigate()

    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();
    const isAlreadyInCart = cartItems?.some((p: any) => p._id === item._id);
    const handleAddToCart = () => {
        dispatch(addItem({
            product: item._id, ...(isCommissionProduct && { commission: 0, supplier: item.supplier, lot: item.lot }), name: item.product || item.name, salePrice: item.salesPrice, quantity: 1, unit: item.unit,
            bosta: ''
        }))

    }

    return (
        <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-slate-100 group">
            {/* Image Container */}


            {/* Content */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            {
                                isCommissionProduct ? <p>{item?.name}</p> : <p> {item?.product} <span className="text-xs font-normal">({item?.sku})</span></p>
                            }

                        </h3>
                        {
                            isCommissionProduct ? <p>{item?.supplier?.name}-{item?.lot}</p> : <p>{item?.lot}</p>
                        }
                        <p className="text-sm font-medium text-blue-600 mb-1">{item?.category}</p>
                    </div>

                    <div className="items-baseline">
                        <p className="text-sm text-start font-semibold text-slate-900"> {isCommissionProduct ? '' : `মূল্যঃ  ${item?.purchasePrice}`}</p>
                        <p className="text-sm text-start font-medium text-slate-900"> স্টকঃ {isCommissionProduct ? item?.quantity : item.quantity} {item?.unit}</p>
                        <p className="text-sm text-start font-medium text-slate-900"> বস্তাঃ {item?.bosta}</p>

                    </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-between items-center">

                    {
                        isAlreadyInCart ? (
                            <button className="btn btn-accent  text-green-100  font-semibold">✔ Already in Cart</button>
                        ) : (
                            <div onClick={handleAddToCart} className="">
                                <button className="btn btn-primary cursor-pointer  text-green-100 font-semibold px-2 py-1 border-2 rounded-md border-green-700 "><span className="flex items-center gap-3"><span>Add to Cart</span> <span className="text-3xl"><FaShoppingCart /></span></span> </button>
                            </div>
                        )
                    }

                    <div onClick={() => navigate(`/${isCommissionProduct ? 'commission/product' : 'products'}/${item._id}`)} className="text-3xl">
                        <TbListDetails />
                    </div>

                </div>
            </div>
        </div >
    );
};

export default ProductCard;
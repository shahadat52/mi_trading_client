import { useAppSelector } from "../../redux/hook";
import CheckoutPage from "./CheckoutPage";

const CartPage = () => {
    const cart = useAppSelector((state) => state.cart)
    console.log(cart)
    return (
        <div className="p-2">
            <CheckoutPage />
        </div>
    );
};

export default CartPage;
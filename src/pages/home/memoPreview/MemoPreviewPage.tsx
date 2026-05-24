import { useParams } from "react-router";
import { useGetBothSaleByInvoiceQuery } from "../../../redux/features/cart/cartApi";
import InvoicePage from "./InvoicePage";

const MemoPreviewPage = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetBothSaleByInvoiceQuery(id)
    const memo = data?.data;
    return (
        <div>
            <InvoicePage invoiceData={memo} loading={isLoading} />
        </div>
    );
};

export default MemoPreviewPage;
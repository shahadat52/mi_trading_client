import { useParams } from "react-router";
import { useGetBothSaleByInvoiceQuery } from "../../../redux/features/cart/cartApi";
import CustomerInvoicePage from "./CustomerInvoicePage";
import SupplierInvoicePage from "./SupplierInvoicePage";
import { useGetPurchaseDataByInvoiceQuery } from "../../../redux/features/purchase/purchaseApi";

const MemoPreviewPage = () => {
    const { id } = useParams()
    const type = id?.split('-')[0];
    const { data, isLoading } = useGetBothSaleByInvoiceQuery(id)
    const sales = data?.data;
    const { data: purchaseData, isLoading: purchaseLoading } = useGetPurchaseDataByInvoiceQuery(id)
    const purchases = purchaseData?.data || []
    return (
        <div>
            {
                type === 'MI(S)' && <CustomerInvoicePage invoiceData={sales} loading={isLoading} />
            }
            {
                type === 'MI(P)' && <SupplierInvoicePage invoiceData={purchases} loading={purchaseLoading} />
            }

            {
                type === 'MI(P)' && <SupplierInvoicePage invoiceData={purchases} loading={purchaseLoading} />
            }
        </div>
    );
};

export default MemoPreviewPage;
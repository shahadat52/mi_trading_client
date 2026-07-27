import { useParams } from "react-router";
import { useGetBothSaleByInvoiceQuery } from "../../../redux/features/cart/cartApi";
import CustomerInvoicePage from "./CustomerInvoicePage";
import SupplierInvoicePage from "./SupplierInvoicePage";
import { useGetPurchaseDataByInvoiceQuery } from "../../../redux/features/purchase/purchaseApi";
import BepariInvoicePage from "./BepariInvoicePage";
import { useGetCouthaByInvoiceQuery } from "../../../redux/features/coutha/couthaApi";

const MemoPreviewPage = () => {
    const { id } = useParams()
    const type = id?.split('-')[0];
    const { data, isLoading } = useGetBothSaleByInvoiceQuery(id)
    const sales = data?.data;
    const { data: purchaseData, isLoading: purchaseLoading } = useGetPurchaseDataByInvoiceQuery(id)
    const { data: coutha, isLoading: couthaLoading } = useGetCouthaByInvoiceQuery(id)
    const purchases = purchaseData?.data
    const couthaData = coutha?.data
    if (!sales && !purchases && !couthaData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">No invoice data found.</p>
            </div>
        );
    }

    return (
        <div className="mb-16">
            {
                type === 'MI(S)' && <CustomerInvoicePage invoiceData={sales} loading={isLoading} />
            }
            {
                type === 'MI(P)' && <SupplierInvoicePage invoiceData={purchases} loading={purchaseLoading} />
            }

            {
                type === 'MI(C)' && <BepariInvoicePage invoiceData={couthaData?.data} loading={couthaLoading} />
            }
        </div>
    );
};

export default MemoPreviewPage;
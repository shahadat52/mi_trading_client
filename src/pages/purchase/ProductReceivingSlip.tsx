import { useRef } from "react";
import { useParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import mi_logo from "../../assets/icons/mi_logo.png";
import { useGetRegualarPurchaseByIdQuery } from "../../redux/features/purchase/purchaseApi";
import { format } from "date-fns";
import Loading from "../../components/Loading";

const ProductReceivingSlip = () => {

    const { id } = useParams()
    const { data, isLoading } = useGetRegualarPurchaseByIdQuery(id, { skip: !id, });
    const purchase = data?.data || []
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Product-Receiving-Slip",
    });

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <button
                onClick={handlePrint}
                className="mb-4 px-4 py-2 bg-black text-white rounded"
            >
                🖨️ Print Slip
            </button>

            <div
                ref={printRef}
                className="w-[320px] mx-auto bg-white text-black border border-black p-2 text-[12px]"
            >
                {/* Header */}
                <div className="text-center border-b border-dashed border-black pb-2">
                    <p className="font-semibold">
                        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </p>

                    <div className="grid grid-cols-9 items-center">
                        <div className="col-span-2 ">
                            <img src={mi_logo} alt="" className="size-14" />
                        </div>
                        <div className="col-span-7 text-start ">
                            <h1 className="text-red-600 text-[24px] font-bold uppercase">
                                M/S. M.I TRADING
                            </h1>

                            <h2 className="font-bold text-xl">
                                মেসার্স এম.আই ট্রেডিং
                            </h2>
                        </div>
                    </div>

                    <p className="font-semibold text-sm">
                        জেনারেল মার্চেন্ট এন্ড কমিশন এজেন্ট
                    </p>
                    <p>
                        ২০২ নং খাতুনগঞ্জ, কোতোয়ালী, চট্টগ্রাম
                    </p>

                    <p className="font-semibold text-[8px]">
                        হলুদ, মরিচ, ধনিয়া, ডাল, মশলা ও
                        সকল ভূষা মালের আড়ৎ
                    </p>

                    <p className=" text-[10px]" >
                        01842753607, 01707753607,  01841753607 (দিপু)
                    </p>



                    <div className="mt-2 font-bold border border-black inline-block px-3 py-1">
                        পণ্য গ্রহণ রসিদ
                    </div>
                </div>

                {/* Info */}
                <div className="py-2 space-y-1">
                    <div className="flex justify-between">
                        <span>
                            <strong>তারিখ:</strong>
                        </span>
                        <span>{format(purchase?.createdAt, "dd/MM/yyyy")}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>
                            <strong>ব্রোকার:</strong>
                        </span>
                        <span>রহমান ব্রাদার্স</span>
                    </div>
                </div>

                {/* Product Table */}
                <table className="w-full border-collapse border border-black text-[11px]">
                    <thead>
                        <tr>
                            <th className="border border-black p-1">
                                পণ্য
                            </th>
                            <th className="border border-black p-1">
                                বস্তা
                            </th>
                            <th className="border border-black p-1">
                                দর
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="border border-black p-1">
                                {purchase?.product}
                            </td>

                            <td className="border border-black p-1 text-center">
                                {purchase?.bosta}
                            </td>

                            <td className="border border-black p-1 text-right">
                                {purchase?.purchasePrice}/-
                            </td>
                        </tr>
                    </tbody>
                </table>



                <div className="mt-8 flex justify-between text-center">
                    <div>
                        <div className="border-t border-black w-24 mx-auto" />
                        <p>ব্রোকার</p>
                    </div>

                    <div>
                        <div className="border-t border-black w-24 mx-auto" />
                        <p>গ্রহণকারী</p>
                    </div>
                </div>

                <div className="mt-3 text-center text-[10px]">
                    <p>
                        mitrading.202ktg@gmail.com
                    </p>
                    Software Powered by M.I Trading ERP
                </div>
            </div>
        </div>
    );
}

export default ProductReceivingSlip
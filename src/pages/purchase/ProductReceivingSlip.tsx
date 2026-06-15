import { useRef } from "react";
import { useParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import mi_logo from "../../assets/icons/mi_logo.png";
import { useGetRegualarPurchaseByIdQuery } from "../../redux/features/purchase/purchaseApi";
import { format } from "date-fns";
import Loading from "../../components/Loading";
import { QRCodeSVG } from "qrcode.react";

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
        <div className="p-2 bg-gray-100 min-h-screen">
            <button
                onClick={handlePrint}
                className="mb-4 px-4 py-2 bg-black text-white rounded"
            >
                🖨️ Print Slip
            </button>

            <div
                ref={printRef}
                className="w-[290px] mx-auto bg-white text-black border border-black p-2 text-[12px]"
            >
                {/* Header */}
                <div className="text-center border-b border-dashed border-black pb-2">
                    <p className="font-semibold">
                        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </p>

                    <div className="grid grid-cols-9 items-center">
                        <div className="col-span-2  mt-[-4px]">
                            <img src={mi_logo} alt="" className="size-12 mt-[-12px]" />
                        </div>
                        <div className="col-span-7 text-start  ">
                            <h1 className="text-red-600 text-[24px] font-bold   ml-[-10px] uppercase">
                                M/S. M.I TRADING
                            </h1>
                            <div className="ml-[-12px] mt-[-4px]">
                                <p>
                                    202 No.Khatungonj,kotwali,Chattogram
                                </p>

                                <p className=" text-[10px]" >
                                    01842753607,  01707753607,  02333369499
                                </p>
                            </div>

                        </div>
                    </div>



                    <div className="flex justify-between items-center">
                        <div className="ml-3">
                            <QRCodeSVG value={purchase?.invoice} size={28} />
                        </div>
                        <div className="mt-2 font-bold border border-black inline-block px-1 py-1">
                            পণ্য গ্রহণ রসিদ
                        </div>
                        <div className="underline" >
                            No: {purchase?.invoice}
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="relative overflow-hidden">
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `url(${mi_logo})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "180px",
                            opacity: 0.15, // watermark opacity
                        }}
                    />
                    <div className="py-2 space-y-1">
                        <div className="flex justify-between">
                            <span>
                                <strong>তারিখ:</strong>
                            </span>
                            <span>{format(purchase?.createdAt, "dd/MM/yyyy")}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>
                                <strong>সাপ্লাইয়ার:</strong>
                            </span>
                            <span>{purchase?.supplier?.name}</span>
                        </div>
                    </div>

                    {/* Product Table */}
                    <div className="w-full border-collapse border border-black text-[11px]">

                        <div className="grid grid-cols-3 text-center">
                            <div className="border border-black p-1">
                                পণ্য
                            </div>
                            <div className="border border-black p-1">
                                বস্তা
                            </div>
                            <div className="border border-black p-1">
                                দর
                            </div>
                        </div>

                        <div className="grid grid-cols-3">
                            <div className="border border-black p-1">
                                {purchase?.product}
                            </div>

                            <div className="border border-black p-1 text-center">
                                {purchase?.bosta}
                            </div>

                            <div className="border border-black p-1 text-right">
                                {purchase?.purchasePrice}/-
                            </div>
                        </div>
                    </div>


                    <div className="mt-4 flex justify-between text-center">
                        <div>
                            <p> {purchase?.note}</p>
                            <div className="border-t border-black w-24 mx-auto" />
                            <p>ব্রোকার</p>
                        </div>

                        <div>
                            <div className="border-t border-black w-24 mx-auto mt-4" />
                            <p>গ্রহণকারী</p>
                        </div>
                    </div>

                    <div className="flex items-center mt-2 text-start justify-around text-[10px]">
                        <div>
                            <p>
                                mitrading.202ktg@gmail.com
                            </p>
                            <p>Software Powered by M.I Trading ERP</p>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default ProductReceivingSlip
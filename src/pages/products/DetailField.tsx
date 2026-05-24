type TSupplier = {
    name?: string;
    phone?: string;
    address?: string;
    type?: string;
};
export type TPurchaseFormData = {
    product: string;
    sku: string;
    invoice: string;
    lot: string;
    purchaseDate: string;
    purchasePrice: string | number;
    quantity: string | number;
    purchaseQty: string | number;
    bosta: string | number;
    labour: string | number;
    commission: string | number;
    others: string | number;
    othersField: string;
    note: string;
    unit: string;
    purchaseType?: string;
    isVerified?: boolean;
    supplier?: TSupplier;
};

type DetailFieldProps = {
    label: string;
    name: keyof TPurchaseFormData;
    value: string | number;
    isEditing: boolean;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    type?: "text" | "number" | "date";
    textarea?: boolean;
    readOnly?: boolean;
    displayValue?: string | number;
};

const DetailField = ({
    label,
    name,
    value,
    isEditing,
    onChange,
    type = "text",
    textarea = false,
    readOnly = false,
    displayValue,
}: DetailFieldProps) => {
    return (
        <div className="flex gap-3 items-start justify-between">
            <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wide min-w-[110px] pt-2">
                {label}:
            </label>

            <div className="w-full">
                {isEditing ? (
                    textarea ? (
                        <textarea
                            name={name}
                            value={String(value ?? "")}
                            onChange={onChange}
                            rows={3}
                            className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    ) : (
                        <input
                            type={type}
                            name={name}
                            readOnly={readOnly}
                            value={String(value ?? "")}
                            onChange={onChange}
                            className={`w-full p-2 text-sm border rounded-lg outline-none transition ${readOnly
                                ? "bg-gray-100 cursor-not-allowed text-gray-500"
                                : "focus:ring-2 focus:ring-blue-400"
                                }`}
                        />
                    )
                ) : (
                    <p className="text-sm md:text-base font-medium text-gray-800 break-words pt-2">
                        {displayValue ?? String(value || "N/A")}
                    </p>
                )}
            </div>
        </div>
    );
};

export default DetailField
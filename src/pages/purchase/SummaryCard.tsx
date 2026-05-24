
const SummaryCard = ({ head, value, unit }: { head: string, value: number, unit: string }) => {
    return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
            <p className="text-sm text-blue-600 font-medium">{head}</p>
            <h3 className="text-xl font-semiBold text-blue-800 mt-2">
                {value} <span className="text-xs font-normal">{unit}</span>
            </h3>
        </div>
    );
};

export default SummaryCard;
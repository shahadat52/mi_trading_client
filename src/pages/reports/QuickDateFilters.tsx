import { dateRange } from "../../utils/dateRange";

type QuickType = 'today' | 'last7days' | 'thisMonth' | 'thisYear';

const QuickDateFilters = ({ onChange }: {
    onChange: (range: { startDate: Date; endDate: Date }) => void;
}) => {

    const handleClick = (type: QuickType) => {
        const range = dateRange(type);
        onChange(range);
    };



    return (
        <select
            className="select select-accent w-full max-w-xs"
            onChange={(e) => handleClick(e.target.value as QuickType)}
            defaultValue="select-time"
        >
            <option value="select-time" disabled>
                Select Timeframe
            </option>
            <option value="today">Today</option>
            <option value="last7days">Last 7 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="thisYear">This Year</option>
        </select>
    );
};

export default QuickDateFilters;
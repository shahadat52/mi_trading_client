import { useState } from "react";

type Props = {
    value: number;
    onChange: (year: number) => void;
};

const YearInput = ({ value, onChange }: Props) => {
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        // allow only numbers
        if (!/^\d*$/.test(val)) return;

        const year = Number(val);

        // validation
        if (val.length === 4 && (year < 2000 || year > 2100)) {
            setError("Valid year range: 2000 - 2100");
        } else {
            setError("");
        }

        onChange(year);
    };

    return (
        <div className="w-full max-w-[75%]">
            <label className="block text-sm font-medium mb-1">
                Year
            </label>

            <input
                type="text"
                value={value || ""}
                onChange={handleChange}
                placeholder="Enter year (e.g. 2026)"
                className="bg-white w-full  rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={4}
            />

            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>
    );
};

export default YearInput;
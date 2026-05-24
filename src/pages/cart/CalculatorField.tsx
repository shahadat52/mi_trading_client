import { useEffect, useState } from "react";
import { evaluate } from "mathjs";

type Props = {
    initialValue: number | string;
    onUpdate: (value: number) => void;
    className?: string;
    placeholder?: string;
};

const CalculatorField = ({
    initialValue,
    onUpdate,
    className = "input",
    placeholder = "0",
}: Props) => {
    const [inputValue, setInputValue] = useState(String(initialValue ?? ""));

    // Redux বা Parent state থেকে value আপডেট হলে input update হবে
    useEffect(() => {
        setInputValue(String(initialValue ?? ""));
    }, [initialValue]);

    const handleEvaluate = () => {
        try {
            // শুধুমাত্র সংখ্যা এবং গাণিতিক অপারেটর অ্যালাউ করা হয়েছে
            const sanitized = inputValue.replace(/[^0-9+\-*/().]/g, "");
            if (!sanitized) throw new Error("Empty input");

            const result = evaluate(sanitized);

            if (typeof result === "number" && !isNaN(result) && isFinite(result)) {
                const finalValue = Number(result.toFixed(2));
                setInputValue(String(finalValue));
                onUpdate(finalValue); // Parent-কে নতুন ভ্যালু পাঠিয়ে দিচ্ছে
            }
        } catch {
            // ইনভ্যালিড ইনপুট দিলে আবার আগের ভ্যালুতে ফিরে যাবে
            setInputValue(String(initialValue ?? 0));
        }
    };

    return (
        <input
            type="text"
            className={className}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleEvaluate}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleEvaluate();
                }
            }}
            placeholder={placeholder}
        />
    );
};

export default CalculatorField;
const BN_NUMBERS: Record<number, string> = {
    0: "শূন্য",
    1: "এক",
    2: "দুই",
    3: "তিন",
    4: "চার",
    5: "পাঁচ",
    6: "ছয়",
    7: "সাত",
    8: "আট",
    9: "নয়",
    10: "দশ",
    11: "এগারো",
    12: "বারো",
    13: "তেরো",
    14: "চৌদ্দ",
    15: "পনেরো",
    16: "ষোল",
    17: "সতেরো",
    18: "আঠারো",
    19: "উনিশ",
};

const BN_TENS: Record<number, string> = {
    20: "বিশ",
    30: "ত্রিশ",
    40: "চল্লিশ",
    50: "পঞ্চাশ",
    60: "ষাট",
    70: "সত্তর",
    80: "আশি",
    90: "নব্বই",
};

export const engNumberToBanglaWords = (input: number | string): string => {
    const num = Number(input);

    if (isNaN(num)) return "ভুল ইনপুট";
    if (num === 0) return BN_NUMBERS[0];

    const convert = (n: number): string => {
        if (n < 20) return BN_NUMBERS[n];

        if (n < 100) {
            return BN_TENS[Math.floor(n / 10) * 10] +
                (n % 10 !== 0 ? " " + BN_NUMBERS[n % 10] : "");
        }

        if (n < 1000) {
            return BN_NUMBERS[Math.floor(n / 100)] + " শত" +
                (n % 100 !== 0 ? " " + convert(n % 100) : "");
        }

        if (n < 100000) {
            return convert(Math.floor(n / 1000)) + " হাজার" +
                (n % 1000 !== 0 ? " " + convert(n % 1000) : "");
        }

        if (n < 10000000) {
            return convert(Math.floor(n / 100000)) + " লাখ" +
                (n % 100000 !== 0 ? " " + convert(n % 100000) : "");
        }

        return convert(Math.floor(n / 10000000)) + " কোটি" +
            (n % 10000000 !== 0 ? " " + convert(n % 10000000) : "");
    };

    return convert(num);
};
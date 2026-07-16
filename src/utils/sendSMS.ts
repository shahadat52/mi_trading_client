export const sendWhatsAppMsg = (phone: string, due: number) => {
    const message = [
        "আসসালামু আলাইকুম,",
        "",
        "প্রিয় গ্রাহক,",
        `আপনার নিকট বর্তমানে ৳${Math.abs(due)} টাকা বকেয়া রয়েছে।`,
        "অনুগ্রহ করে যথা সময়ে পরিশোধ করুন।",

        "ধন্যবাদান্তে,",
        "M.I Trading"
    ].join("\n");

    const encodedMessage = encodeURIComponent(message);

    const cleanPhone = phone.replace(/\D/g, ""); // only digits

    const url = `https://api.whatsapp.com/send?phone=+88${cleanPhone}&text=${encodedMessage}`;

    window.open(url, "_blank");
};

export const sendSupplierDueWhatsAppMsg = (phone: string, due: number) => {
    const message = [
        "আসসালামু আলাইকুম/আদাব,",
        "প্রিয় সাপ্লাইয়ার,",
        `${due < 1 ? `আপনার কাছে ${Math.abs(due)} টাকা পাবো।` : `আপনি ${Math.abs(due)} টাকা পাবেন।`}`,

        "ধন্যবাদান্তে,",
        "M.I Trading"
    ].join("\n");

    const encodedMessage = encodeURIComponent(message);

    const cleanPhone = phone.replace(/\D/g, ""); // only digits

    const url = `https://api.whatsapp.com/send?phone=+88${cleanPhone}&text=${encodedMessage}`;

    window.open(url, "_blank");
};


export const sendSingleTxnWhatsAppMsg = (phone: string, type: string, paid: number, due: number) => {
    const message = [
        "আসসালামু আলাইকুম/আদাব,",
        "প্রিয় গ্রাহক,",
        `আপনি ${paid}  ${type === 'credit' ? 'টাকা জমা দিয়েছেন' : 'টাকার পণ্য নিয়েছেন'}।`,
        `বর্তমানে  ${Math.abs(due)} টাকা বকেয়া আছে।`,
        "",
        "ধন্যবাদ,",
        "M.I TRADING"
    ].join("\n");

    const encodedMessage = encodeURIComponent(message);

    const cleanPhone = phone.replace(/\D/g, ""); // only digits

    const url = `https://api.whatsapp.com/send?phone=+88${cleanPhone}&text=${encodedMessage}`;

    window.open(url, "_blank");
};

export const sendSupplierTxnWhatsAppMsg = (phone: string, type: string, paid: number, due: number) => {
    const message = [
        "আসসালামু আলাইকুম/আদাব,",
        "প্রিয় সাপ্লাইয়ার,",
        `${paid} টাকা ${type === 'credit' ? "মূল্যের পণ্য গ্রহণ করা হয়েছে" : "পরিশোধ করা হয়েছে"}।`,
        `বর্তমানে  ${Math.abs(due)} টাকা বকেয়া আছে।`,
        "",
        "ধন্যবাদ,",
        "M.I TRADING"
    ].join("\n");

    const encodedMessage = encodeURIComponent(message);

    const cleanPhone = phone.replace(/\D/g, ""); // only digits

    const url = `https://api.whatsapp.com/send?phone=+88${cleanPhone}&text=${encodedMessage}`;

    window.open(url, "_blank");
};

export const sendNumberMsg = (phone: string, message: string) => {
    window.location.href = `sms:${phone}?body=${encodeURIComponent(message)}`;
};



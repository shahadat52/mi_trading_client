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


export const sendSingleTxnWhatsAppMsg = (phone: string, type: string, paid: number, due: number) => {
    const message = [
        "আসসালামু আলাইকুম,",
        "",
        "প্রিয় গ্রাহক,",
        "",
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

export const sendNumberMsg = (phone: string, message: string) => {
    window.location.href = `sms:${phone}?body=${encodeURIComponent(message)}`;
};

export const sendSMSByReve = async (phone: any, message: string) => {



    const params = new URLSearchParams(
        {
            apikey: import.meta.env.VITE_REVE_API_KEY as string,
            secretkey: import.meta.env.VITE_REVE_SECRET_KEY as string,
            callerID: import.meta.env.VITE_REVE_SENDER_ID as string,
            toUser: phone,
            messageContent: message,
        }
    );

    const response = await fetch(
        `https://smpp.revesms.com:7790/sendtext?${params}`
    );

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result);
    }

    return result;
}

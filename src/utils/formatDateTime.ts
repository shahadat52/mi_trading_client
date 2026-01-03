export const formatDateTime = (dateString?: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("bn-BD", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("bn-BD", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
};

export const DateTime = (dateValue: string | Date | null | undefined) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
        return "";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};
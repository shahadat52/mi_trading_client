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

    // For input type="date"  →  YYYY-MM-DD
    return date.toISOString().split("T")[0];
};
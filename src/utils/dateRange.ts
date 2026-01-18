export type DateRange = {
    startDate: Date;
    endDate: Date;
};

export const dateRange = (
    type: 'today' | 'last7days' | 'thisMonth' | 'thisYear'
): DateRange => {
    const now = new Date();
    const start = new Date(now);
    const end = new Date(now);

    switch (type) {
        case 'today':
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            break;

        case 'last7days':
            start.setDate(now.getDate() - 6);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            break;

        case 'thisMonth':
            start.setDate(1);
            start.setHours(0, 0, 0, 0);
            end.setMonth(now.getMonth() + 1, 0);
            end.setHours(23, 59, 59, 999);
            break;

        case 'thisYear':
            start.setMonth(0, 1);
            start.setHours(0, 0, 0, 0);
            end.setMonth(11, 31);
            end.setHours(23, 59, 59, 999);
            break;
    }

    return { startDate: start, endDate: end };
};
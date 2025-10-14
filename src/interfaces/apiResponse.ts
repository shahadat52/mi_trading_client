export type TRES = {
    data: {
        data: {
            accessToken: string
            message: string
        };
        success: boolean
    };
    error: {
        data: {
            message: string
        }
    }

} | null
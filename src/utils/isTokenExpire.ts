export const isTokenExpired = (exp?: number): boolean => {
    if (!exp) return true;

    const currentTime = Math.floor(Date.now() / 1000); // seconds
    return exp < currentTime;
};
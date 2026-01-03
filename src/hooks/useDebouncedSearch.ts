import { useEffect, useState } from "react";

type UseDebouncedSearchOptions = {
    delay?: number;
    minLength?: number;
};

const useDebouncedSearch = (
    initialValue = "",
    options?: UseDebouncedSearchOptions
) => {
    const { delay = 600, minLength = 0 } = options || {};

    const [search, setSearch] = useState(initialValue);
    const [debouncedSearch, setDebouncedSearch] = useState(initialValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (search.length >= minLength) {
                setDebouncedSearch(search);
            } else {
                setDebouncedSearch("");
            }
        }, delay);

        return () => clearTimeout(handler);
    }, [search, delay, minLength]);

    return {
        search,
        setSearch,
        debouncedSearch,
    };
}

export default useDebouncedSearch

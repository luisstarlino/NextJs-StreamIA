/**
* @LuisStarlino
* Created AT: 27/10/2024 | 23:15
*/

//------------------------------------------------
// --- CONST'S
//------------------------------------------------
import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, [value, delay]);

    return debouncedValue;
};
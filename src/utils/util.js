import { useEffect, useState } from "react";

export const checkNumberFieldChange = (val) => {
    return !isNaN(+val) && val !== ' '
}
export const useWindowResize = () => {
    const [windowResize, setWindowResize] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowResize(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [windowResize]);

    return windowResize;
}
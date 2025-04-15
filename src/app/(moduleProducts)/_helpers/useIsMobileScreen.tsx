import { useEffect, useState } from "react";

function useIsMobileScreen() {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.matchMedia("(max-width: 600px)").matches);

        const handleResize = (e: any) => {
            setIsMobile(e.matches);
        };

        const mediaQuery = window.matchMedia("(max-width: 600px)");

        mediaQuery.addEventListener('change', handleResize);

        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    return {

        isMobile
    }

};

export default useIsMobileScreen;
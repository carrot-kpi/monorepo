import { useEffect } from "react";

export const useResetPageScroll = () => {
    useEffect(() => {
        window.scroll({ top: 0, left: 0 });
    }, []);
};

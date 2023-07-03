import { useEffect } from "react";

export const useResetPageScroll = () => {
    useEffect(() => {
        const bodyElement = window.document.getElementById("__app_body");
        if (!bodyElement) return;
        bodyElement.scroll({ top: 0, left: 0, behavior: "smooth" });
    }, []);
};

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFathom } from "./useFathom";

export const useFathomTrackPageWatch = () => {
    const location = useLocation();
    const fathom = useFathom();

    useEffect(() => {
        if (!fathom) return;
        fathom.trackPageview({ url: location.pathname });
    }, [location.pathname, fathom]);
};

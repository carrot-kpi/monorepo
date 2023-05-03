import { useFathom } from "@carrot-kpi/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useFathomTrackPageWatch = () => {
    const location = useLocation();
    const fathom = useFathom();

    useEffect(() => {
        if (!fathom) return;
        fathom.trackPageview({ url: location.pathname });
    }, [location.pathname, fathom]);
};

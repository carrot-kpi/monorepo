import { trackPageview } from "@guerrap/fathom-client";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useFathomTrackPageWatch = () => {
    const location = useLocation();

    useEffect(() => {
        trackPageview({ url: location.pathname });
    }, [location.pathname]);
};

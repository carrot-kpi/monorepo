import { useEffect, useState } from "react";
import { Fathom } from "../types/analytics";

export const useFathom = () => {
    const [fathom, setFathom] = useState<Fathom | null>(null);

    useEffect(() => {
        if (!window || !window.fathom) {
            console.warn("Fathom is missing");
            return;
        }
        setFathom(window.fathom as Fathom);
    }, []);

    return fathom;
};

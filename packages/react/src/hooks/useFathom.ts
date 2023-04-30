import { useEffect, useState } from "react";
import { Fathom } from "../analytics/analytics";
import { FathomRegisteredEventName, getEventId } from "../analytics/generated";

export const useFathom = () => {
    const [fathom, setFathom] = useState<Fathom | null>(null);

    useEffect(() => {
        if (!window || !window.fathom) {
            console.warn("fathom is missing");
            return;
        }
        window.fathom.trackRegisteredGoal = (
            registeredEventName: FathomRegisteredEventName,
            data: number
        ) => {
            const eventId = getEventId(registeredEventName);

            if (!eventId) {
                console.warn(
                    "can't track non existing fathom event",
                    registeredEventName
                );
                return;
            }
            window.fathom?.trackGoal(eventId, data);
        };

        setFathom(window.fathom as Fathom);
    }, []);

    return fathom;
};

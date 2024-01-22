import { useStagingMode } from "./useStagingMode";
import { useDevMode } from "./useDevMode";

export const useProdMode = () => {
    const devMode = useDevMode();
    const stagingMode = useStagingMode();

    return !devMode && !stagingMode;
};

import { HostState } from "../state";

const CACHE_KEY = "carrot-kpi-host-state-cache";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(CACHE_KEY);
        if (!serializedState) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("error while loading serialized shared state", e);
        return undefined;
    }
};

export const storeState = (state: HostState) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { modals, ...serializableState }: HostState = state;
        localStorage.setItem(CACHE_KEY, JSON.stringify(serializableState));
    } catch (e) {
        console.warn("error while saving serialized shared state", e);
    }
};

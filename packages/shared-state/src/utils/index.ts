const CACHE_KEY = "carrot-kpi-shared-state-cache";

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

export const storeState = (state: object) => {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(state));
    } catch (e) {
        console.warn("error while saving serialized shared state", e);
    }
};

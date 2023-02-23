import React, {
    createContext,
    ReactElement,
    ReactNode,
    useEffect,
    useState,
} from "react";
import { CACHER } from "@carrot-kpi/sdk";

export interface CacheablePreferences {
    theme: "dark" | "light" | "system";
    preferDecentralization: boolean;
}

export interface Preferences {
    values: CacheablePreferences;
    setTheme: (value: CacheablePreferences["theme"]) => void;
    setPreferDecentralization: (
        value: CacheablePreferences["preferDecentralization"]
    ) => void;
}

const PREFERENCES_CACHER_KEY = "preferences";

const DEFAULT_PREFERENCES: Preferences = {
    values: { theme: "system", preferDecentralization: false },
    /* eslint-disable @typescript-eslint/no-empty-function */
    setTheme: () => {},
    setPreferDecentralization: () => {},
    /* eslint-enable @typescript-eslint/no-empty-function */
};

export const PreferencesContext =
    createContext<Preferences>(DEFAULT_PREFERENCES);

interface PreferencesProviderProps {
    children: ReactNode;
}

export const PreferencesProvider = ({
    children,
}: PreferencesProviderProps): ReactElement => {
    const [theme, setTheme] = useState<CacheablePreferences["theme"]>("system");
    const [preferDecentralization, setPreferDecentralization] =
        useState<CacheablePreferences["preferDecentralization"]>(false);

    useEffect(() => {
        const cachedPreferences = CACHER.get<CacheablePreferences>(
            PREFERENCES_CACHER_KEY
        );

        if (!cachedPreferences) {
            CACHER.set<CacheablePreferences>(
                PREFERENCES_CACHER_KEY,
                DEFAULT_PREFERENCES.values,
                Number.MAX_SAFE_INTEGER
            );

            return;
        }

        setTheme(cachedPreferences.theme);
        setPreferDecentralization(cachedPreferences.preferDecentralization);
    }, [theme]);

    const handleSetTheme = (value: CacheablePreferences["theme"]) => {
        const cachedPreferences = CACHER.get<CacheablePreferences>(
            PREFERENCES_CACHER_KEY
        );

        if (!cachedPreferences) return;

        CACHER.set<CacheablePreferences>(
            PREFERENCES_CACHER_KEY,
            {
                ...cachedPreferences,
                theme: value,
            },
            Number.MAX_SAFE_INTEGER
        );
        setTheme(value);
    };

    const handleSetPreferDecentralization = (
        value: CacheablePreferences["preferDecentralization"]
    ) => {
        const cachedPreferences = CACHER.get<CacheablePreferences>(
            PREFERENCES_CACHER_KEY
        );

        if (!cachedPreferences) return;

        CACHER.set<CacheablePreferences>(
            PREFERENCES_CACHER_KEY,
            {
                ...cachedPreferences,
                preferDecentralization: value,
            },
            Number.MAX_SAFE_INTEGER
        );
        setPreferDecentralization(value);
    };

    return (
        <PreferencesContext.Provider
            value={{
                values: {
                    theme,
                    preferDecentralization,
                },
                setTheme: handleSetTheme,
                setPreferDecentralization: handleSetPreferDecentralization,
            }}
        >
            {children}
        </PreferencesContext.Provider>
    );
};

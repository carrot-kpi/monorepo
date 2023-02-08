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
    // FIXME: use system as default
    values: { theme: "light", preferDecentralization: false },
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
    // FIXME: system should be the default choice
    const [theme, setTheme] = useState<CacheablePreferences["theme"]>("light");
    const [preferDecentralization, setPreferDecentralization] =
        useState<CacheablePreferences["preferDecentralization"]>(false);

    useEffect(() => {
        const cachedPreferences = CACHER.get<CacheablePreferences>(
            PREFERENCES_CACHER_KEY
        );
        if (!cachedPreferences) return;
        // TODO: validate this, and set to system by default
        setTheme(cachedPreferences.theme || "light");
        setPreferDecentralization(!!cachedPreferences.preferDecentralization);
    }, []);

    return (
        <PreferencesContext.Provider
            value={{
                values: {
                    theme,
                    preferDecentralization,
                },
                setTheme,
                setPreferDecentralization,
            }}
        >
            {children}
        </PreferencesContext.Provider>
    );
};

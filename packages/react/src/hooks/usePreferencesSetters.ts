import { useContext } from "react";
import { PreferencesContext } from "../contexts/preferences";

export const usePreferencesSetters = () => {
    const { setTheme, setPreferDecentralization } =
        useContext(PreferencesContext);

    return {
        setTheme,
        setPreferDecentralization,
    };
};

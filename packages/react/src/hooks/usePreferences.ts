import { useContext } from "react";
import { PreferencesContext } from "../contexts/preferences";

export const usePreferences = () => {
    return useContext(PreferencesContext).values;
};

import { useTheme } from "@carrot-kpi/react";
import { useEffect } from "react";
import { useMedia } from "react-use";

export const ThemeUpdater = () => {
    const theme = useTheme();
    const systemDarkTheme = useMedia("(prefers-color-scheme: dark)");

    useEffect(() => {
        switch (theme) {
            case "dark": {
                document.documentElement.classList.add("dark");
                break;
            }
            case "light": {
                document.documentElement.classList.remove("dark");
                break;
            }
            default: {
                if (systemDarkTheme)
                    document.documentElement.classList.add("dark");
                else document.documentElement.classList.remove("dark");
            }
        }
    }, [systemDarkTheme, theme]);

    return null;
};

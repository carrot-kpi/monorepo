import { usePreferences } from "@carrot-kpi/react";
import { useEffect } from "react";

export const ThemeUpdater = () => {
    const { theme } = usePreferences();

    useEffect(() => {
        switch (theme) {
            case "dark": {
                document.documentElement.classList.add("dark");
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                return () => {};
            }
            case "light": {
                document.documentElement.classList.remove("dark");
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                return () => {};
            }
            default: {
                const match = window.matchMedia("(prefers-color-scheme: dark)");
                const handleChange = () => {
                    if (match.matches)
                        document.documentElement.classList.add("dark");
                    else document.documentElement.classList.remove("dark");
                };
                match.addEventListener("change", handleChange);
                handleChange();
                return () => {
                    match.removeEventListener("change", handleChange);
                };
            }
        }
    }, [theme]);

    return null;
};

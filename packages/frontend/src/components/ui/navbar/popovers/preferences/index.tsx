import React, { useCallback, useRef, useState } from "react";
import { Popover, Switch, Typography } from "@carrot-kpi/ui";
import { forwardRef } from "react";
import {
    usePreferDecentralization,
    useTheme,
    useSetTheme,
    useSetPreferDecentralization,
} from "@carrot-kpi/react";
import { useTranslation } from "react-i18next";
import { InfoPopover } from "../../../../info-popover";
import { useMedia } from "react-use";

interface PreferencesPopoverProps {
    open: boolean;
    anchor?: HTMLElement | null;
}

// TODO: move this in the UI lib with additional functionality (like variants for info, warning and error feedback)
export const PreferencesPopover = forwardRef<
    HTMLDivElement,
    PreferencesPopoverProps
>(function PreferencesPopover({ open, anchor }, ref) {
    const { t } = useTranslation();
    const theme = useTheme();
    const setTheme = useSetTheme();
    const preferDecentralization = usePreferDecentralization();
    const setPreferDecentralization = useSetPreferDecentralization();
    const systemDarkTheme = useMedia("(prefers-color-scheme: dark)");
    const darkThemeSwitchRef = useRef<HTMLDivElement>(null);

    const [darkThemePopoverOpen, setDarkThemePopoverOpen] = useState(false);

    const handleDarkThemeChange = useCallback(
        (value: boolean) => {
            setTheme(value ? "dark" : "light");
        },
        [setTheme]
    );

    const handleDarkThemeSwitchMouseEnter = useCallback(() => {
        setDarkThemePopoverOpen(true);
    }, []);

    const handleDarkThemeSwitchMouseLeave = useCallback(() => {
        setDarkThemePopoverOpen(false);
    }, []);

    return (
        <Popover
            open={open}
            anchor={anchor}
            ref={ref}
            className={{ root: "px-6 py-7 flex flex-col gap-4 text-center" }}
            placement="bottom-end"
        >
            <Typography variant="md" uppercase weight="medium">
                {t("preferences.title")}
            </Typography>
            <div className="flex justify-between gap-20 items-center">
                <Typography>{t("preferences.theme")}</Typography>
                <Popover
                    className={{ root: "p-2" }}
                    anchor={darkThemeSwitchRef.current}
                    open={darkThemePopoverOpen}
                >
                    <Typography>{t("coming.soon.dark.theme")}</Typography>
                </Popover>
                <div
                    onMouseEnter={handleDarkThemeSwitchMouseEnter}
                    onMouseLeave={handleDarkThemeSwitchMouseLeave}
                    ref={darkThemeSwitchRef}
                >
                    <Switch
                        disabled
                        checked={
                            (systemDarkTheme && theme === "system") ||
                            theme === "dark"
                        }
                        onChange={handleDarkThemeChange}
                    />
                </div>
            </div>
            {!__PREVIEW_MODE__ && (
                <div className="flex justify-between gap-20 items-center">
                    <div className="flex gap-2 items-center">
                        <Typography>
                            {t("preferences.decentralization")}
                        </Typography>
                        <InfoPopover>
                            <Typography
                                variant="sm"
                                className={{ root: "max-w-md" }}
                            >
                                {t("preferences.decentralization.info")}
                            </Typography>
                        </InfoPopover>
                    </div>
                    <Switch
                        checked={preferDecentralization}
                        onChange={setPreferDecentralization}
                    />
                </div>
            )}
        </Popover>
    );
});

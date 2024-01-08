import React, { useCallback, useMemo, useState } from "react";
import {
    Popover,
    Select,
    type SelectOption,
    Switch,
    Typography,
} from "@carrot-kpi/ui";
import {
    usePreferDecentralization,
    useSetPreferDecentralization,
    useSetStagingMode,
    useStagingMode,
} from "@carrot-kpi/react";
import { useTranslation } from "react-i18next";
import { ChainId, SUBGRAPH_URL } from "@carrot-kpi/sdk";
import { useChainId } from "wagmi";
import { InfoPopover } from "../info-popover";

// TODO: move this in the UI lib with additional functionality (like variants for info, warning and error feedback)
export const Preferences = () => {
    const { t } = useTranslation();
    const chainId = useChainId();
    const preferDecentralization = usePreferDecentralization();
    const setPreferDecentralization = useSetPreferDecentralization();

    const stagingMode = useStagingMode();
    const setStagingMode = useSetStagingMode();

    const [darkThemeSwitch, setDarkThemeSwitch] =
        useState<HTMLDivElement | null>(null);
    const themeOptions = useMemo(() => {
        const options: SelectOption<string>[] = [
            {
                value: "light",
                label: t("theme.light"),
            },
            {
                value: "dark",
                label: t("theme.dark"),
            },
            {
                value: "system",
                label: t("theme.system"),
            },
        ];
        return options;
    }, [t]);

    const [darkThemePopoverOpen, setDarkThemePopoverOpen] = useState(false);

    const handleDarkThemeSwitchMouseEnter = useCallback(() => {
        setDarkThemePopoverOpen(true);
    }, []);

    const handleDarkThemeSwitchMouseLeave = useCallback(() => {
        setDarkThemePopoverOpen(false);
    }, []);

    return (
        <div>
            <Typography data-testid="interface-settings-title" weight="medium">
                {t("preferences.title")}
            </Typography>
            <div className="flex flex-col gap-6 mt-10">
                <div className="flex justify-between gap-4 md:gap-20 items-center">
                    <Typography data-testid="theme-name-text">
                        {t("preferences.theme")}
                    </Typography>
                    <Popover
                        className={{ root: "p-2" }}
                        anchor={darkThemeSwitch}
                        open={darkThemePopoverOpen}
                    >
                        <Typography>{t("coming.soon.dark.theme")}</Typography>
                    </Popover>
                    <div
                        onMouseEnter={handleDarkThemeSwitchMouseEnter}
                        onMouseLeave={handleDarkThemeSwitchMouseLeave}
                        ref={setDarkThemeSwitch}
                    >
                        <Select
                            data-testid={`theme-dropdown-button`}
                            disabled
                            options={themeOptions}
                            messages={{ noResults: "" }}
                            value={
                                themeOptions.find(
                                    (option) => option.value === "light",
                                ) || null
                            }
                            // eslint-disable-next-line @typescript-eslint/no-empty-function
                            onChange={() => {}}
                            className={{
                                root: "opacity-50 pointer-events-none cursor-not-allowed",
                                inputWrapper: "w-32",
                                input: "w-32",
                            }}
                        />
                    </div>
                </div>
                {!!SUBGRAPH_URL[chainId as ChainId] && (
                    <div className="flex justify-between gap-4 md:gap-20 items-center">
                        <div className="flex gap-2 items-center">
                            <Typography data-testid="decentralization-mode-text">
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
                            data-testid="decentralization-mode-switch"
                            checked={preferDecentralization}
                            onChange={setPreferDecentralization}
                        />
                    </div>
                )}
                {__STAGING_MODE__ && (
                    <div className="flex justify-between gap-4 md:gap-20 items-center">
                        <div className="flex gap-2 items-center">
                            <Typography data-testid="staging-mode-text">
                                {t("preferences.stagingMode")}
                            </Typography>
                            <InfoPopover>
                                <Typography
                                    variant="sm"
                                    className={{ root: "max-w-md" }}
                                >
                                    {t("preferences.stagingMode.info")}
                                </Typography>
                            </InfoPopover>
                        </div>
                        <Switch
                            data-testid="staging-mode-switch"
                            checked={stagingMode}
                            onChange={setStagingMode}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

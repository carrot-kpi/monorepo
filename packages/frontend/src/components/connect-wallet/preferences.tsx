import React from "react";
import { Switch, Typography } from "@carrot-kpi/ui";
import {
    usePreferDecentralization,
    useSetPreferDecentralization,
    useSetTemplatePreviewMode,
    useTemplatePreviewMode,
} from "@carrot-kpi/react";
import { useTranslation } from "react-i18next";
import { useAccount } from "wagmi";

// TODO: move this in the UI lib with additional functionality (like variants for info, warning and error feedback)
export const Preferences = () => {
    const { t } = useTranslation();
    const { chain } = useAccount();
    const preferDecentralization = usePreferDecentralization();
    const setPreferDecentralization = useSetPreferDecentralization();

    const templatePreviewMode = useTemplatePreviewMode();
    const setTemplatePreviewMode = useSetTemplatePreviewMode();

    // const [darkThemeSwitch, setDarkThemeSwitch] =
    //     useState<HTMLDivElement | null>(null);
    // const themeOptions = useMemo(() => {
    //     const options: SelectOption<string>[] = [
    //         {
    //             value: "light",
    //             label: t("theme.light"),
    //         },
    //         {
    //             value: "dark",
    //             label: t("theme.dark"),
    //         },
    //         {
    //             value: "system",
    //             label: t("theme.system"),
    //         },
    //     ];
    //     return options;
    // }, [t]);

    // const [darkThemePopoverOpen, setDarkThemePopoverOpen] = useState(false);

    // const handleDarkThemeSwitchMouseEnter = useCallback(() => {
    //     setDarkThemePopoverOpen(true);
    // }, []);

    // const handleDarkThemeSwitchMouseLeave = useCallback(() => {
    //     setDarkThemePopoverOpen(false);
    // }, []);

    return (
        <div className="flex flex-col gap-4 h-full overflow-y-auto cui-scrollbar">
            {/* TODO: enable toggle once dark theme is available */}
            {/* <div className="flex justify-between gap-4 md:gap-20 items-center">
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
                </div> */}
            {!!chain?.serviceUrls.subgraph && (
                <div className="flex flex-col border border-black dark:border-white rounded-lg">
                    <div className="flex gap-2 items-center justify-between p-4 border-b border-black dark:border-white">
                        <Typography
                            data-testid="decentralization-mode-text"
                            variant="base"
                            weight="bold"
                        >
                            {t("preferences.decentralization")}
                        </Typography>
                        <Switch
                            data-testid="decentralization-mode-switch"
                            disabled={__ENVIRONMENT__ === "dev"}
                            checked={preferDecentralization}
                            onChange={setPreferDecentralization}
                        />
                    </div>
                    <Typography variant="sm" className={{ root: "p-4" }}>
                        {t("preferences.decentralization.info")}
                    </Typography>
                </div>
            )}
            {/* TODO: this setting is applied to both dev and staging environments but it's simply called "staging" mode.
            We need to find a name that is compatible with the fact that this setting should be available in both the dev
            and staging environments. Maybe preview mode? */}
            {__ENVIRONMENT__ !== "prod" && (
                <div className="flex flex-col border border-black dark:border-white rounded-lg">
                    <div className="flex gap-2 items-center justify-between p-4 border-b border-black dark:border-white">
                        <Typography
                            data-testid="staging-mode-text"
                            variant="base"
                            weight="bold"
                        >
                            {t("preferences.templatePreviewMode")}
                        </Typography>
                        <Switch
                            data-testid="staging-mode-switch"
                            checked={templatePreviewMode}
                            onChange={setTemplatePreviewMode}
                        />
                    </div>
                    <Typography variant="sm" className={{ root: "p-4" }}>
                        {t("preferences.templatePreviewMode.info")}
                    </Typography>
                </div>
            )}
        </div>
    );
};

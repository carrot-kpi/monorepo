import React, { type MouseEvent, useCallback } from "react";
import { Typography, type TypographyProps } from "../../typography";
import X from "../../../icons/x";
import ChevronLeft from "../../../icons/chevron-left";
import type { TokenListWithBalance } from "../types";
import { RemoteLogo, type RemoteLogoProps } from "../../remote-logo";
import { Divider, type DividerProps } from "../divider";
import { Skeleton } from "../../skeleton";
import { mergedCva } from "../../../utils/components";

const rootStyles = mergedCva([
    "cui-bg-white",
    "dark:cui-bg-black",
    "cui-rounded-xl",
    "cui-h-[60vh]",
    "sm:cui-w-full",
    "md:cui-min-w-[460px]",
    "md:cui-w-1/3",
    "lg:cui-w-1/4",
]);

const headerStyles = mergedCva([
    "cui-p-4",
    "cui-flex",
    "cui-justify-between",
    "cui-items-center",
]);

const iconStyles = mergedCva(["cui-cursor-pointer"]);

const listWrapperStyles = mergedCva([
    "cui-flex",
    "cui-w-full",
    "cui-h-96",
    "cui-justify-center",
    "cui-items-center",
]);

const listStyles = mergedCva([
    "cui-list-none",
    "cui-w-full",
    "cui-h-full",
    "cui-overflow-y-auto",
    "cui-scrollbar",
]);

const listItemStyles = mergedCva(
    [
        "cui-flex",
        "cui-items-center",
        "cui-gap-3",
        "cui-h-16",
        "cui-p-3",
        "cui-cursor-pointer",
    ],
    {
        variants: {
            selected: {
                true: [
                    "cui-bg-gray-200",
                    "hover:cui-bg-gray-200",
                    "dark:cui-bg-gray-600",
                    "dark:hover:cui-bg-gray-600",
                ],
                false: ["hover:cui-bg-gray-100", "dark:hover:cui-bg-gray-700"],
            },
        },
    },
);

const LOADING_SKELETON = new Array(5).fill(null).map((_, index) => {
    return (
        <li
            key={index}
            className={listItemStyles({ selected: false })}
            data-index={index}
        >
            <Skeleton circular width="28px" />
            <Skeleton width="60px" />
        </li>
    );
});

export interface ManageListsProps {
    onDismiss?: () => void;
    onSelectedListChange?: (token: TokenListWithBalance) => void;
    loading?: boolean;
    selectedList?: TokenListWithBalance | null;
    lists?: TokenListWithBalance[];
    chainId?: number;
    ipfsGatewayURL?: string;
    onSearch: () => void;
    className?: {
        root?: string;
        header?: string;
        title?: TypographyProps["className"];
        closeIcon?: string;
        backIcon?: string;
        divider?: DividerProps["className"];
        listWrapper?: string;
        list?: string;
        listItem?: string;
        listItemIcon?: RemoteLogoProps["className"];
        listItemText?: TypographyProps["className"];
        emptyListText?: TypographyProps["className"];
    };
    messages: {
        title: string;
        noLists: string;
    };
}

export const ManageLists = ({
    onDismiss,
    onSelectedListChange,
    loading,
    selectedList,
    lists,
    ipfsGatewayURL,
    onSearch,
    className,
    messages,
}: ManageListsProps) => {
    const handleListClick = useCallback(
        (event: MouseEvent) => {
            if (!onSelectedListChange || !lists || !event.target) return;
            const index = (event.target as HTMLLIElement).dataset.index;
            if (index !== undefined) {
                const parsedIndex = parseInt(index);
                if (parsedIndex >= 0) {
                    onSelectedListChange(lists[parsedIndex]);
                    if (!!onDismiss) onDismiss();
                }
            }
        },
        [lists, onDismiss, onSelectedListChange],
    );

    return (
        <div className={rootStyles({ className: className?.root })}>
            <div
                className={headerStyles({
                    className: className?.header,
                })}
            >
                <div className="cui-flex cui-items-center cui-gap-3">
                    <ChevronLeft
                        className={iconStyles({
                            className: className?.backIcon,
                        })}
                        onClick={onSearch}
                    />
                    <Typography variant="h4" className={className?.title}>
                        {messages.title}
                    </Typography>
                </div>
                <X
                    className={iconStyles({ className: className?.closeIcon })}
                    onClick={onDismiss}
                />
            </div>
            <Divider className={className?.divider} />
            <div
                className={listWrapperStyles({
                    className: className?.listWrapper,
                })}
            >
                {loading && (
                    <ul className={listStyles({ className: className?.list })}>
                        {LOADING_SKELETON}
                    </ul>
                )}
                {!loading &&
                    (!!lists && lists.length > 0 ? (
                        <ul
                            className={listStyles({
                                className: className?.list,
                            })}
                        >
                            {lists.map((list, index) => {
                                const { name, version, logoURI } = list;
                                const selected =
                                    !!selectedList &&
                                    name === selectedList.name &&
                                    version === selectedList.version;
                                return (
                                    <li
                                        key={name + version}
                                        className={listItemStyles({
                                            selected,
                                            className: className?.listItem,
                                        })}
                                        data-index={index}
                                        onClick={handleListClick}
                                    >
                                        <RemoteLogo
                                            src={logoURI}
                                            defaultText={name}
                                            ipfsGatewayURL={ipfsGatewayURL}
                                            className={{
                                                ...className?.listItemIcon,
                                                root: `cui-pointer-events-none ${className?.listItemIcon?.root}`,
                                            }}
                                        />
                                        <Typography
                                            className={{
                                                ...className?.listItemText,
                                                root: `cui-pointer-events-none ${className?.listItemText?.root}`,
                                            }}
                                        >
                                            {name}
                                        </Typography>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <Typography className={className?.emptyListText}>
                            {messages.noLists}
                        </Typography>
                    ))}
            </div>
        </div>
    );
};

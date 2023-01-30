import React, { MouseEvent, useCallback, useMemo } from "react";
import { Typography, TypographyProps } from "../../data-display/typography";
import { ReactComponent as X } from "../../assets/x.svg";
import { ReactComponent as ChevronLeft } from "../../assets/chevron-left.svg";
import { TokenListWithBalance } from "../types";
import { cva } from "class-variance-authority";
import { RemoteLogo, RemoteLogoProps } from "../../data-display/remote-logo";
import { Divider, DividerProps } from "../divider";

const rootStyles = cva([
    "cui-bg-white",
    "dark:cui-bg-black",
    "cui-rounded-xl",
    "cui-h-[60vh]",
    "sm:cui-w-full",
    "md:cui-min-w-[460px]",
    "md:cui-w-1/3",
    "lg:cui-w-1/4",
]);

const headerStyles = cva([
    "cui-p-4",
    "cui-flex",
    "cui-justify-between",
    "cui-items-center",
]);

const iconStyles = cva(["cui-cursor-pointer"]);

const listWrapperStyles = cva([
    "cui-flex",
    "cui-w-full",
    "cui-h-96",
    "cui-justify-center",
    "cui-items-center",
]);

const listStyles = cva([
    "cui-list-none",
    "cui-w-full",
    "cui-h-full",
    "cui-overflow-y-auto",
    "cui-scrollbar",
]);

const listItemStyles = cva(
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
    }
);

export interface ManageListsProps {
    onDismiss?: () => void;
    onSelectedListChange?: (token: TokenListWithBalance) => void;
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
    selectedList,
    lists,
    chainId,
    ipfsGatewayURL,
    onSearch,
    className,
    messages,
}: ManageListsProps) => {
    const listsInChain = useMemo(() => {
        if (!lists || lists.length === 0 || !chainId) return [];
        return lists.filter((list) =>
            list.tokens.some((token) => token.chainId === chainId)
        );
    }, [chainId, lists]);

    const handleListClick = useCallback(
        (event: MouseEvent) => {
            if (!onSelectedListChange || !event.target) return;
            const index = (event.target as HTMLLIElement).dataset.index;
            if (index !== undefined) {
                const parsedIndex = parseInt(index);
                if (parsedIndex >= 0) {
                    onSelectedListChange(listsInChain[parsedIndex]);
                    if (!!onDismiss) onDismiss();
                }
            }
        },
        [listsInChain, onDismiss, onSelectedListChange]
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
                    <Typography variant="h5" className={className?.title}>
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
                {listsInChain.length > 0 ? (
                    <ul className={listStyles({ className: className?.list })}>
                        {listsInChain.map((list, index) => {
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
                                            root: "cui-pointer-events-none",
                                            ...className?.listItemIcon,
                                        }}
                                    />
                                    <Typography
                                        className={{
                                            root: "cui-pointer-events-none",
                                            ...className?.listItemText,
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
                )}
            </div>
        </div>
    );
};

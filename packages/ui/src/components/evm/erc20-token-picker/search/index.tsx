import React, {
    ChangeEvent,
    MouseEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Typography, TypographyProps } from "../../../data-display/typography";
import { ReactComponent as X } from "../../../../assets/x.svg";
import { Button, ButtonProps } from "../../../input/button";
import { TextInput, TextInputProps } from "../../../input/text";
import { useDebounce } from "react-use";
import { TokenInfoWithBalance, TokenListWithBalance } from "../types";
import { RemoteLogo, RemoteLogoProps } from "../../../data-display/remote-logo";
import {
    filterERC20Tokens,
    getDefaultERC20TokenLogoURL,
    sortERC20Tokens,
} from "../../../../utils/erc20";
import { Divider, DividerProps } from "../divider";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Skeleton } from "../../../feedback";
import { mergedCva } from "../../../../utils/components";

const rootStyles = mergedCva([
    "cui-flex",
    "cui-flex-col",
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

const inputContainerStyles = mergedCva(["cui-p-5"]);

const iconStyles = mergedCva(["cui-cursor-pointer"]);

const listWrapperStyles = mergedCva(
    ["cui-w-full", "cui-grow", "cui-overflow-hidden"],
    {
        variants: {
            empty: {
                true: ["cui-flex", "cui-justify-center", "cui-items-center"],
            },
        },
    }
);

const listStyles = mergedCva(["cui-scrollbar"]);

const listItemStyles = mergedCva(
    [
        "cui-flex",
        "cui-flex-col",
        "cui-gap-1",
        "cui-justify-center",
        "cui-h-16",
        "cui-px-3",
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

export interface SearchProps {
    open?: boolean;
    onDismiss?: () => void;
    loading?: boolean;
    onSelectedTokenChange?: (token: TokenInfoWithBalance) => void;
    selectedToken?: TokenInfoWithBalance | null;
    selectedList?: TokenListWithBalance;
    lists?: TokenListWithBalance[];
    chainId?: number;
    ipfsGatewayURL?: string;
    onManageLists: () => void;
    className?: {
        root?: string;
        header?: string;
        title?: TypographyProps["className"];
        closeIcon?: string;
        divider?: DividerProps["className"];
        inputWrapper?: string;
        input?: TextInputProps["className"];
        listWrapper?: string;
        list?: string;
        listItem?: string;
        listItemIcon?: RemoteLogoProps["className"];
        listItemTextPrimary?: TypographyProps["className"];
        listItemTextSecondary?: TypographyProps["className"];
        emptyListText?: string;
        manageListsButtonWrapper?: string;
        manageListsButton?: ButtonProps["className"];
    };
    messages: {
        title: string;
        inputPlaceholder: string;
        noTokens: string;
        manageLists: string;
    };
}

export const Search = ({
    open,
    onDismiss,
    loading,
    onSelectedTokenChange,
    selectedToken,
    selectedList,
    lists,
    chainId,
    ipfsGatewayURL,
    onManageLists,
    className,
    messages,
}: SearchProps) => {
    const fixedListRef = useRef<FixedSizeList>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    useEffect(() => {
        if (!open) return;
        setSearchQuery("");
        setDebouncedSearchQuery("");
        if (!!fixedListRef.current) fixedListRef.current.scrollTo(0);
    }, [open]);

    useDebounce(
        () => {
            setDebouncedSearchQuery(searchQuery);
        },
        300,
        [searchQuery]
    );

    const tokensInChain = useMemo(() => {
        if (!selectedList) return [];
        return selectedList.tokens.filter((token) => token.chainId === chainId);
    }, [chainId, selectedList]);

    const filteredTokens: TokenInfoWithBalance[] = useMemo(() => {
        return filterERC20Tokens(tokensInChain, debouncedSearchQuery);
    }, [debouncedSearchQuery, tokensInChain]);

    const sortedTokens: TokenInfoWithBalance[] = useMemo(() => {
        return sortERC20Tokens(filteredTokens);
    }, [filteredTokens]);

    const handleSearchChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(event.target.value);
            if (!!fixedListRef.current) fixedListRef.current.scrollTo(0);
        },
        [setSearchQuery]
    );

    const handleTokenClick = useCallback(
        (event: MouseEvent) => {
            if (!onSelectedTokenChange || !event.target) return;
            const index = (event.target as HTMLLIElement).dataset.index;
            if (index !== undefined) {
                const parsedIndex = parseInt(index);
                if (parsedIndex >= 0) {
                    onSelectedTokenChange(sortedTokens[parsedIndex]);
                    if (!!onDismiss) onDismiss();
                }
            }
        },
        [onDismiss, onSelectedTokenChange, sortedTokens]
    );

    return (
        <div
            className={rootStyles({
                className: className?.root,
            })}
        >
            <div
                className={headerStyles({
                    className: className?.header,
                })}
            >
                <Typography variant="h5" className={className?.title}>
                    {messages.title}
                </Typography>
                <X
                    className={iconStyles({ className: className?.closeIcon })}
                    onClick={onDismiss}
                />
            </div>
            <Divider className={className?.divider} />
            <div
                className={inputContainerStyles({
                    className: className?.inputWrapper,
                })}
            >
                <TextInput
                    id="token-search"
                    disabled={loading}
                    placeholder={messages.inputPlaceholder}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={{
                        ...className?.input,
                        input: `cui-w-full ${className?.input?.input}`,
                        inputWrapper: `cui-w-full ${className?.input?.inputWrapper}`,
                    }}
                />
            </div>
            <Divider className={className?.divider} />
            <div
                className={listWrapperStyles({
                    empty: sortedTokens.length === 0,
                    className: className?.listWrapper,
                })}
            >
                {loading || sortedTokens.length > 0 ? (
                    <AutoSizer>
                        {({ height, width }) => {
                            return (
                                <FixedSizeList
                                    ref={fixedListRef}
                                    height={height}
                                    width={width}
                                    itemCount={
                                        loading ? 10 : sortedTokens.length
                                    }
                                    itemData={
                                        loading
                                            ? new Array(10).fill(null)
                                            : sortedTokens
                                    }
                                    itemSize={72}
                                    className={listStyles({
                                        className: className?.list,
                                    })}
                                >
                                    {({ index, style }) => {
                                        let address,
                                            symbol,
                                            name,
                                            logoURI,
                                            defaultLogoSrc,
                                            selected;
                                        if (!loading) {
                                            const {
                                                chainId,
                                                address: tokenAddress,
                                                symbol: tokenSymbol,
                                                name: tokenName,
                                                logoURI: tokenLogoURI,
                                            } = sortedTokens[index];
                                            address = tokenAddress;
                                            symbol = tokenSymbol;
                                            name = tokenName;
                                            logoURI = tokenLogoURI;
                                            defaultLogoSrc =
                                                getDefaultERC20TokenLogoURL(
                                                    chainId,
                                                    address
                                                );
                                            selected =
                                                !!selectedToken &&
                                                chainId ===
                                                    selectedToken.chainId &&
                                                address ===
                                                    selectedToken.address;
                                        }

                                        return (
                                            <li
                                                key={loading ? address : index}
                                                className={listItemStyles({
                                                    selected,
                                                    className:
                                                        className?.listItem,
                                                })}
                                                style={style}
                                                data-index={index}
                                                onClick={handleTokenClick}
                                            >
                                                <div className="cui-flex cui-items-center cui-gap-2 cui-pointer-events-none">
                                                    {loading ? (
                                                        <Skeleton
                                                            circular
                                                            width="24px"
                                                        />
                                                    ) : (
                                                        <RemoteLogo
                                                            src={logoURI}
                                                            size="sm"
                                                            defaultSrc={
                                                                defaultLogoSrc
                                                            }
                                                            defaultText={symbol}
                                                            ipfsGatewayURL={
                                                                ipfsGatewayURL
                                                            }
                                                            className={{
                                                                ...className?.listItemIcon,
                                                                root: `cui-pointer-events-none ${className?.listItemIcon?.root}`,
                                                            }}
                                                        />
                                                    )}
                                                    {loading ? (
                                                        <Skeleton width="40px" />
                                                    ) : (
                                                        <Typography
                                                            className={
                                                                className?.listItemTextPrimary
                                                            }
                                                        >
                                                            {symbol}
                                                        </Typography>
                                                    )}
                                                </div>
                                                {loading ? (
                                                    <Skeleton
                                                        variant="xs"
                                                        width="60px"
                                                    />
                                                ) : (
                                                    <Typography
                                                        variant="xs"
                                                        className={{
                                                            root: `cui-text-gray-600 dark:cui-text-gray-200 cui-pointer-events-none ${className?.listItemTextSecondary?.root}`,
                                                        }}
                                                    >
                                                        {name}
                                                    </Typography>
                                                )}
                                            </li>
                                        );
                                    }}
                                </FixedSizeList>
                            );
                        }}
                    </AutoSizer>
                ) : (
                    <Typography>{messages.noTokens}</Typography>
                )}
            </div>
            {!!lists && lists.length > 0 && (
                <>
                    <Divider className={className?.divider} />
                    <div className="cui-p-5">
                        <Button
                            loading={loading}
                            className={{
                                ...className?.manageListsButton,
                                root: `cui-w-full ${className?.manageListsButton?.root}`,
                            }}
                            onClick={onManageLists}
                        >
                            {messages.manageLists}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

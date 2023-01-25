import React, {
    ChangeEvent,
    MouseEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Text, TextProps } from "../../text";
import { ReactComponent as X } from "../../assets/x.svg";
import { Button, CarrotButtonProps } from "../../button";
import { TextInput, TextInputProps } from "../../input/text";
import { useDebounce } from "react-use";
import { TokenInfoWithBalance, TokenListWithBalance } from "../types";
import { cva } from "class-variance-authority";
import { RemoteLogo, RemoteLogoProps } from "../../remote-logo";
import {
    filterERC20Tokens,
    getDefaultERC20TokenLogoURL,
    sortERC20Tokens,
} from "../../utils/erc20";
import { Divider, DividerProps } from "../divider";

const rootStyles = cva([
    "cui-bg-white",
    "dark:cui-bg-black",
    "cui-rounded-xl",
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

const inputContainerStyles = cva(["cui-p-5"]);

const iconStyles = cva(["cui-cursor-pointer"]);

const listWrapperStyles = cva([
    "cui-flex",
    "cui-w-full",
    "cui-h-96",
    "cui-justify-center",
    "cui-items-center",
    "cui-overflow-hidden",
    "cui-rounded-b-xl",
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
        "cui-flex-col",
        "cui-gap-1",
        "cui-justify-center",
        "cui-h-16",
        "cui-p-5",
        "hover:cui-bg-gray-200",
        "dark:hover:cui-bg-gray-700",
        "cui-cursor-pointer",
    ],
    {
        variants: {
            selected: {
                true: [
                    "cui-bg-gray-300",
                    "hover:cui-bg-gray-300",
                    "dark:cui-bg-gray-600",
                    "dark:hover:cui-bg-gray-600",
                ],
            },
        },
    }
);

export interface SearchProps {
    onDismiss?: () => void;
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
        title?: TextProps["className"];
        closeIcon?: string;
        divider?: DividerProps["className"];
        inputWrapper?: string;
        input?: TextInputProps["className"];
        listWrapper?: string;
        list?: string;
        listItem?: string;
        listItemIcon?: RemoteLogoProps["className"];
        listItemTextPrimary?: TextProps["className"];
        listItemTextSecondary?: TextProps["className"];
        emptyListText?: string;
        manageListsButtonWrapper?: string;
        manageListsButton?: CarrotButtonProps["className"];
    };
}

export const Search = ({
    onDismiss,
    onSelectedTokenChange,
    selectedToken,
    selectedList,
    lists,
    chainId,
    ipfsGatewayURL,
    onManageLists,
    className,
}: SearchProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    useEffect(() => {
        setSearchQuery("");
        setDebouncedSearchQuery("");
    }, []);

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
                <Text mono weight="bold" size="xl" className={className?.title}>
                    Select a token
                </Text>
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
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={{
                        root: "cui-w-full",
                        input: "cui-w-full",
                        ...className?.input,
                    }}
                />
            </div>
            <Divider className={className?.divider} />
            <div
                className={listWrapperStyles({
                    className: className?.listWrapper,
                })}
            >
                {sortedTokens.length > 0 ? (
                    <ul className={listStyles({ className: className?.list })}>
                        {sortedTokens.map((token, index) => {
                            const { chainId, address, symbol, name, logoURI } =
                                token;
                            const defaultLogoSrc = getDefaultERC20TokenLogoURL(
                                chainId,
                                address
                            );
                            const selected =
                                !!selectedToken &&
                                chainId === selectedToken.chainId &&
                                address === selectedToken.address;
                            return (
                                <li
                                    key={address}
                                    className={listItemStyles({
                                        selected,
                                        className: className?.listItem,
                                    })}
                                    data-index={index}
                                    onClick={handleTokenClick}
                                >
                                    <div className="cui-flex cui-gap-2 cui-pointer-events-none">
                                        <RemoteLogo
                                            src={logoURI}
                                            size="sm"
                                            defaultSrcs={defaultLogoSrc}
                                            defaultText={symbol}
                                            ipfsGatewayURL={ipfsGatewayURL}
                                            className={{
                                                root: "cui-pointer-events-none",
                                                ...className?.listItemIcon,
                                            }}
                                        />
                                        <Text
                                            mono
                                            className={
                                                className?.listItemTextPrimary
                                            }
                                        >
                                            {symbol}
                                        </Text>
                                    </div>
                                    <Text
                                        mono
                                        size="xs"
                                        className={{
                                            root: `cui-text-gray-600 dark:cui-text-gray-200 cui-pointer-events-none ${className?.listItemTextSecondary?.root}`,
                                        }}
                                    >
                                        {name}
                                    </Text>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <Text mono>Nothing</Text>
                )}
            </div>
            {!!lists && lists.length > 1 && (
                <>
                    <Divider className={className?.divider} />
                    <div className="cui-p-5">
                        <Button
                            className={{
                                root: "cui-w-full",
                                ...className?.manageListsButton,
                            }}
                            onClick={onManageLists}
                        >
                            Manage token lists
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

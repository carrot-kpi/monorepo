import React, {
    ChangeEvent,
    MouseEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { TextMono, TextMonoProps } from "../../text-mono";
import { ReactComponent as X } from "../../assets/x.svg";
import { Button, CarrotButtonProps } from "../../button";
import { TextInput, TextInputProps } from "../../input/text";
import { isAddress } from "@ethersproject/address";
import { useDebounce } from "react-use";
import { TokenInfoWithBalance, TokenListWithBalance } from "../types";
import { cva } from "class-variance-authority";
import { RemoteLogo } from "../../remote-logo";
import { getDefaultERC20TokenLogoURL } from "../../utils/erc20";

const tokenItemStyles = cva(
    [
        "cui-flex",
        "cui-items-center",
        "cui-h-16",
        "cui-p-3",
        "hover:cui-bg-gray-200",
        "dark:hover:cui-bg-gray-700",
        "cui-cursor-pointer",
    ],
    {
        variants: {
            selected: {
                true: ["cui-bg-gray-300", "hover:cui-bg-gray-300"],
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
        headerContainer?: string;
        title?: TextMonoProps["className"];
        closeIcon?: string;
        divider?: string;
        inputContainer?: string;
        input?: TextInputProps["className"];
        listContainer?: string;
        listItem?: string;
        emptyListContainer?: string;
        manageListsButtonContainer?: string;
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
        if (tokensInChain.length === 0) return [];
        if (!debouncedSearchQuery) return tokensInChain;
        if (isAddress(debouncedSearchQuery)) {
            const lowerCaseDebouncedSearchQuery =
                debouncedSearchQuery.toLowerCase();
            const tokenByAddress = tokensInChain.find(
                (token) =>
                    token.address.toLowerCase() ===
                    lowerCaseDebouncedSearchQuery
            );
            return !!tokenByAddress ? [tokenByAddress] : [];
        }
        const lowercaseSearchParts = debouncedSearchQuery
            .toLowerCase()
            .split(/\s+/)
            .filter((s) => s.length > 0);
        if (lowercaseSearchParts.length === 0) return filteredTokens;
        const matchesSearch = (s: string): boolean => {
            const sParts = s
                .toLowerCase()
                .split(/\s+/)
                .filter((s) => s.length > 0);
            return lowercaseSearchParts.every(
                (p) => p.length === 0 || sParts.some((sp) => sp.includes(p))
            );
        };
        return tokensInChain.filter((token) => {
            const { symbol, name } = token;
            return (
                (symbol && matchesSearch(symbol)) ||
                (name && matchesSearch(name))
            );
        });
    }, [debouncedSearchQuery, tokensInChain]);

    const sortedTokens: TokenInfoWithBalance[] = useMemo(() => {
        return filteredTokens.sort((a, b) => {
            const balanceA = a.balance;
            const balanceB = b.balance;

            let result = 0;
            if (balanceA && balanceB)
                result = balanceA.gt(balanceB)
                    ? -1
                    : balanceA.eq(balanceB)
                    ? 0
                    : 1;
            else if (balanceA && balanceA.gt("0")) result = -1;
            else if (balanceB && balanceB.gt("0")) result = 1;
            if (result !== 0) return result;

            if (a.symbol && b.symbol)
                return a.symbol.toLowerCase() < b.symbol.toLowerCase() ? -1 : 1;
            else return a.symbol ? -1 : b.symbol ? -1 : 0;
        });
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
            className={`cui-bg-white dark:cui-bg-black cui-rounded-xl cui-border cui-border-black dark:cui-border-white sm:cui-w-full md:cui-w-1/3 lg:cui-w-1/4 ${className?.root}`}
        >
            <div
                className={`cui-p-3 cui-flex cui-justify-between cui-items-center ${className?.headerContainer}`}
            >
                <TextMono
                    weight="medium"
                    size="lg"
                    className={className?.title}
                >
                    Select a token
                </TextMono>
                <X
                    className={`cui-cursor-pointer ${className?.closeIcon}`}
                    onClick={onDismiss}
                />
            </div>
            <div
                className={`cui-h-[1px] cui-w-full cui-bg-black dark:cui-bg-white ${className?.divider}`}
            />
            <div className={`cui-p-3 ${className?.inputContainer}`}>
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
            <div
                className={`cui-h-[1px] cui-w-full cui-bg-black dark:cui-bg-white ${className?.divider}`}
            />
            <div className="cui-flex cui-w-full cui-h-96 cui-justify-center cui-items-center">
                {sortedTokens.length > 0 ? (
                    <ul className="cui-list-none cui-w-full cui-h-full cui-overflow-y-auto">
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
                                    className={tokenItemStyles({ selected })}
                                    data-index={index}
                                    onClick={handleTokenClick}
                                >
                                    <RemoteLogo
                                        src={logoURI}
                                        defaultSrcs={defaultLogoSrc}
                                        defaultText={symbol}
                                        ipfsGatewayURL={ipfsGatewayURL}
                                    />
                                    <div className="cui-flex cui-flex-col cui-ml-3">
                                        <TextMono>{symbol}</TextMono>
                                        <TextMono
                                            size="xs"
                                            className={{
                                                root: "cui-text-gray-600 dark:cui-text-gray-200",
                                            }}
                                        >
                                            {name}
                                        </TextMono>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <TextMono>Nothing</TextMono>
                )}
            </div>
            <div
                className={`cui-h-[1px] cui-w-full cui-bg-black dark:cui-bg-white ${className?.divider}`}
            />
            {!!lists && lists.length > 0 && (
                <div className="cui-p-3">
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
            )}
        </div>
    );
};

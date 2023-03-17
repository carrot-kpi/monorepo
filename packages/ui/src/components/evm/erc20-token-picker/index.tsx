import React, {
    ChangeEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Search, SearchProps } from "./search";
import { Modal } from "../../utils/modal";
import { TokenInfoWithBalance, TokenListWithBalance } from "./types";
import { ManageLists, ManageListsProps } from "./manage-lists";
import { useSearchedTokens } from "./hooks/useSearchedTokens";
import { FixedSizeList } from "react-window";
import { useDebounce } from "react-use";
import { useImportableToken } from "./hooks/useImportableToken";
import {
    cacheTokenInfoWithBalance,
    tokenInfoWithBalanceEquals,
} from "../../../utils/erc20";

export * from "./types";

type ERC20TokenPickerView =
    | "search"
    | "import-token"
    | "import-list"
    | "manage-lists";

export interface ERC20TokenPickerProps {
    open?: boolean;
    onDismiss?: () => void;
    loading?: boolean;
    selectedToken?: TokenInfoWithBalance | null;
    onSelectedTokenChange?: (token: TokenInfoWithBalance) => void;
    withBalances?: boolean;
    accountAddress?: string;
    chainId?: number;
    lists?: TokenListWithBalance[];
    selectedList?: TokenListWithBalance;
    onSelectedListChange?: (list: TokenListWithBalance) => void;
    className?: {
        search: SearchProps["className"];
        manageLists: ManageListsProps["className"];
    };
    messages: {
        search: SearchProps["messages"];
        manageLists: ManageListsProps["messages"];
    };
}

export function ERC20TokenPicker({
    open,
    onDismiss,
    loading,
    onSelectedTokenChange,
    withBalances,
    accountAddress,
    selectedToken,
    chainId,
    lists,
    selectedList,
    onSelectedListChange,
    className,
    messages,
}: ERC20TokenPickerProps) {
    const [currentView, setCurrentView] =
        useState<ERC20TokenPickerView>("search");

    const fixedListRef = useRef<FixedSizeList>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    useDebounce(
        () => {
            setDebouncedQuery(searchQuery);
        },
        300,
        [searchQuery]
    );

    const { tokens: searchableTokens, loadingBalances } = useSearchedTokens(
        debouncedQuery,
        chainId,
        selectedList,
        withBalances,
        accountAddress
    );
    const { importableToken, loadingBalance: loadingImportableTokenBalance } =
        useImportableToken(
            debouncedQuery,
            chainId,
            withBalances,
            accountAddress
        );

    const tokens = useMemo(() => {
        return importableToken ? [importableToken] : searchableTokens;
    }, [importableToken, searchableTokens]);

    // on open, clear the search query and scroll to the top of the list
    useEffect(() => {
        if (!open) return;
        setCurrentView("search");
        setSearchQuery("");
        if (!!fixedListRef.current) fixedListRef.current.scrollTo(0);
    }, [open]);

    const handleSearchChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(event.target.value);
            if (!!fixedListRef.current) fixedListRef.current.scrollTo(0);
        },
        []
    );

    const handleSelectedTokenChange = useCallback(
        (token: TokenInfoWithBalance) => {
            if (tokenInfoWithBalanceEquals(importableToken, token)) {
                cacheTokenInfoWithBalance(token);
                setDebouncedQuery("");
                setSearchQuery("");
            }
            if (onSelectedTokenChange) onSelectedTokenChange(token);
        },
        [importableToken, onSelectedTokenChange]
    );

    const handleManageListsClick = useCallback(() => {
        setCurrentView("manage-lists");
    }, []);

    const handleSearchClick = useCallback(() => {
        setCurrentView("search");
    }, []);

    return (
        <Modal open={open} onDismiss={onDismiss}>
            {currentView === "search" && (
                <Search
                    tokens={tokens}
                    searchQuery={searchQuery}
                    onSearchQueryChange={handleSearchChange}
                    loadingBalances={
                        loadingBalances ||
                        !!(importableToken && loadingImportableTokenBalance)
                    }
                    fixedListRef={fixedListRef}
                    onDismiss={onDismiss}
                    loading={loading}
                    onSelectedTokenChange={handleSelectedTokenChange}
                    selectedToken={selectedToken}
                    lists={lists}
                    onManageLists={handleManageListsClick}
                    className={className?.search}
                    messages={messages.search}
                />
            )}
            {currentView === "manage-lists" && (
                <ManageLists
                    onDismiss={onDismiss}
                    loading={loading}
                    onSelectedListChange={onSelectedListChange}
                    selectedList={selectedList}
                    lists={lists}
                    chainId={chainId}
                    onSearch={handleSearchClick}
                    className={className?.manageLists}
                    messages={messages.manageLists}
                />
            )}
        </Modal>
    );
}

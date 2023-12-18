import React, {
    type ChangeEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { Search, type SearchProps } from "./search";
import { Modal } from "../modal";
import type { TokenInfoWithBalance, TokenListWithBalance } from "./types";
import { ManageLists, type ManageListsProps } from "./manage-lists";
import { useSearchedTokens } from "./hooks/useSearchedTokens";
import { FixedSizeList } from "react-window";
import { useDebounce } from "react-use";
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
    onSearchQueryChange?: (query: string) => void;
    onSelectedTokenChange?: (token: TokenInfoWithBalance) => void;
    chainId?: number;
    lists?: TokenListWithBalance[];
    selectedList?: TokenListWithBalance | null;
    onSelectedListChange?: (list: TokenListWithBalance) => void;
    className?: {
        search: SearchProps["className"];
        manageLists: ManageListsProps["className"];
    };
    messages: {
        search: SearchProps["messages"];
        manageLists: ManageListsProps["messages"];
    };
    dataTestIds?: {
        search?: SearchProps["dataTestIds"];
        manageLists?: ManageListsProps["dataTestIds"];
    };
}

export function ERC20TokenPicker({
    open,
    onDismiss,
    loading,
    onSearchQueryChange,
    onSelectedTokenChange,
    selectedToken,
    chainId,
    lists,
    selectedList,
    onSelectedListChange,
    className,
    messages,
    dataTestIds,
}: ERC20TokenPickerProps) {
    const [currentView, setCurrentView] =
        useState<ERC20TokenPickerView>("search");

    const fixedListRef = useRef<FixedSizeList>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    useDebounce(
        () => {
            setDebouncedQuery(searchQuery);
            if (!!onSearchQueryChange) onSearchQueryChange(searchQuery);
        },
        300,
        [searchQuery],
    );

    const { tokens } = useSearchedTokens(debouncedQuery, chainId, selectedList);

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
        [],
    );

    const handleSelectedTokenChange = useCallback(
        (token: TokenInfoWithBalance) => {
            if (onSelectedTokenChange) onSelectedTokenChange(token);
        },
        [onSelectedTokenChange],
    );

    const handleSelectedListChange = useCallback(
        (list: TokenListWithBalance) => {
            if (onSelectedListChange) {
                setCurrentView("search");
                onSelectedListChange(list);
            }
        },
        [onSelectedListChange],
    );

    const handleManageListsClick = useCallback(() => {
        setCurrentView("manage-lists");
    }, []);

    const handleSearchClick = useCallback(() => {
        setCurrentView("search");
    }, []);

    const handleOnDismiss = () => {
        setSearchQuery("");
        if (!!onDismiss) onDismiss();
    };

    return (
        <Modal open={open} onDismiss={onDismiss}>
            {currentView === "search" && (
                <Search
                    tokens={tokens}
                    searchQuery={searchQuery}
                    onSearchQueryChange={handleSearchChange}
                    fixedListRef={fixedListRef}
                    onDismiss={handleOnDismiss}
                    loading={loading}
                    onSelectedTokenChange={handleSelectedTokenChange}
                    selectedToken={selectedToken}
                    lists={lists}
                    onManageLists={handleManageListsClick}
                    className={className?.search}
                    messages={messages.search}
                    dataTestIds={dataTestIds?.search}
                />
            )}
            {currentView === "manage-lists" && (
                <ManageLists
                    onDismiss={onDismiss}
                    loading={loading}
                    onSelectedListChange={handleSelectedListChange}
                    selectedList={selectedList}
                    lists={lists}
                    chainId={chainId}
                    onSearch={handleSearchClick}
                    className={className?.manageLists}
                    messages={messages.manageLists}
                    dataTestIds={dataTestIds?.manageLists}
                />
            )}
        </Modal>
    );
}

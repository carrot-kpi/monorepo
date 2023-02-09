import React, { useCallback, useLayoutEffect, useState } from "react";
import { Search, SearchProps } from "./search";
import { Modal } from "../../utils/modal";
import { TokenInfoWithBalance, TokenListWithBalance } from "./types";
import { ManageLists, ManageListsProps } from "./manage-lists";

export * from "./types";

type ERC20TokenPickerView =
    | "search"
    | "import-token"
    | "import-list"
    | "manage-lists";

export interface ERC20TokenPickerProps {
    open?: boolean;
    onDismiss?: () => void;
    selectedToken?: TokenInfoWithBalance | null;
    onSelectedTokenChange?: (token: TokenInfoWithBalance) => void;
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
    onSelectedTokenChange,
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

    useLayoutEffect(() => {
        if (open) setCurrentView("search");
    }, [open]);

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
                    open={open}
                    onDismiss={onDismiss}
                    onSelectedTokenChange={onSelectedTokenChange}
                    selectedToken={selectedToken}
                    chainId={chainId}
                    lists={lists}
                    selectedList={selectedList}
                    onManageLists={handleManageListsClick}
                    className={className?.search}
                    messages={messages.search}
                />
            )}
            {currentView === "manage-lists" && (
                <ManageLists
                    onDismiss={onDismiss}
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

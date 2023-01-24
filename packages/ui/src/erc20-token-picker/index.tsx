import React, { useCallback, useLayoutEffect, useState } from "react";
import { Search, SearchProps } from "./search";
import { Modal } from "../modal";
import { TokenInfoWithBalance, TokenListWithBalance } from "./types";
import { ManageLists, ManageListsProps } from "./manage-lists";

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
                    onDismiss={onDismiss}
                    onSelectedTokenChange={onSelectedTokenChange}
                    selectedToken={selectedToken}
                    chainId={chainId}
                    lists={lists}
                    selectedList={selectedList}
                    onManageLists={handleManageListsClick}
                    className={className?.search}
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
                />
            )}
        </Modal>
    );
}

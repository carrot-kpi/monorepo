import React, { type ChangeEventHandler, type Ref, useCallback } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import X from "../../../../icons/x";
import { mergedCva } from "../../../../utils/components";
import { tokenInfoWithBalanceEquals } from "../../../../utils/erc20";
import {
    Typography,
    type TypographyProps,
} from "../../../data-display/typography";
import { Button, type ButtonProps } from "../../../input/button";
import { TextInput, type TextInputProps } from "../../../input/text";
import { Divider, type DividerProps } from "../divider";
import type { TokenInfoWithBalance, TokenListWithBalance } from "../types";
import { Row, type RowProps } from "./row";

const rootStyles = mergedCva([
    "cui-flex",
    "cui-flex-col",
    "cui-bg-white",
    "dark:cui-bg-black",
    "cui-rounded-xl",
    "cui-m-4",
    "cui-h-[60vh]",
    "cui-w-full",
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

const inputContainerStyles = mergedCva(["cui-p-3"]);

const iconStyles = mergedCva(["cui-cursor-pointer"]);

const listWrapperStyles = mergedCva(
    ["cui-w-full", "cui-grow", "cui-overflow-hidden"],
    {
        variants: {
            empty: {
                true: ["cui-flex", "cui-justify-center", "cui-items-center"],
            },
        },
    },
);

const listStyles = mergedCva(["cui-scrollbar"]);

export interface SearchProps {
    tokens: TokenInfoWithBalance[];
    searchQuery: string;
    onSearchQueryChange: ChangeEventHandler<HTMLInputElement>;
    loadingBalances?: boolean;
    fixedListRef?: Ref<FixedSizeList>;
    onDismiss?: () => void;
    loading?: boolean;
    onSelectedTokenChange?: (token: TokenInfoWithBalance) => void;
    selectedToken?: TokenInfoWithBalance | null;
    lists?: TokenListWithBalance[];
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
        listItem?: RowProps["className"];
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
    onDismiss,
    tokens,
    searchQuery,
    fixedListRef,
    loadingBalances,
    onSearchQueryChange,
    loading,
    onSelectedTokenChange,
    selectedToken,
    lists,
    ipfsGatewayURL,
    onManageLists,
    className,
    messages,
}: SearchProps) => {
    const handleSelect = useCallback(
        (index: number) => {
            const selectedToken = tokens[index];
            if (onSelectedTokenChange) onSelectedTokenChange(selectedToken);
            if (onDismiss) onDismiss();
        },
        [onDismiss, onSelectedTokenChange, tokens],
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
                <Typography variant="h4" className={className?.title}>
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
                    onChange={onSearchQueryChange}
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
                    empty: !loading && tokens.length === 0,
                    className: className?.listWrapper,
                })}
            >
                {loading || tokens.length > 0 ? (
                    <AutoSizer>
                        {({ height, width }) => {
                            return (
                                <FixedSizeList
                                    ref={fixedListRef}
                                    height={height || 0}
                                    width={width || 0}
                                    itemCount={loading ? 10 : tokens.length}
                                    itemData={
                                        loading
                                            ? new Array(10).fill(null)
                                            : tokens
                                    }
                                    itemSize={72}
                                    className={listStyles({
                                        className: className?.list,
                                    })}
                                >
                                    {({ index, style }) => {
                                        const token: TokenInfoWithBalance =
                                            tokens[index];
                                        return (
                                            <Row
                                                index={index}
                                                style={style}
                                                selected={tokenInfoWithBalanceEquals(
                                                    selectedToken,
                                                    token,
                                                )}
                                                loading={loading}
                                                loadingBalances={
                                                    loadingBalances
                                                }
                                                onSelect={handleSelect}
                                                ipfsGatewayURL={ipfsGatewayURL}
                                                className={className?.listItem}
                                                {...token}
                                            />
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
                    <div className="cui-p-3">
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

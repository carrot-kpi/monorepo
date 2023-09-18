import React, {
    type ReactElement,
    type ForwardedRef,
    useCallback,
    useState,
    useRef,
    forwardRef,
    useId,
    type ChangeEvent,
    useEffect,
} from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import type { BaseInputProps } from "./commons/input";
import ChevronUp from "../icons/chevron-up";
import ChevronDown from "../icons/chevron-down";
import { Popover } from "./popover";
import { TextInput } from "./text-input";
import { useClickAway, useDebounce } from "react-use";
import { mergedCva, mergedCx } from "../utils/components";
import { FixedSizeList } from "react-window";

const dropdownRootStyles = mergedCva(
    [
        "cui-rounded-xxl",
        "cui-border",
        "cui-border-black",
        "cui-max-h-48",
        "cui-bg-white",
        "dark:cui-bg-black",
        "dark:cui-border-white",
        "cui-z-20",
        "cui-overflow-hidden",
        "cui-h-full",
    ],
    {
        variants: {
            empty: {
                true: ["cui-h-fit"],
            },
        },
    },
);

const emptyOptionListStyles = mergedCva([
    "cui-flex",
    "cui-justify-center",
    "cui-items-center",
    "cui-p-3",
    "cui-h-12",
]);

const optionListStyles = mergedCva(["cui-scrollbar"]);

const optionStyles = mergedCva(
    [
        "cui-cursor-pointer",
        "cui-p-3",
        "cui-font-mono",
        "cui-font-normal",
        "cui-outline-none",
        "cui-placeholder-opacity-20",
        "dark:cui-placeholder-opacity-30",
        "cui-text-black",
        "dark:cui-text-white",
        "cui-box-border",
        "hover:cui-bg-gray-200",
        "dark:hover:cui-bg-gray-700",
    ],
    {
        variants: {
            picked: {
                true: [
                    "cui-bg-gray-300",
                    "hover:cui-bg-gray-300",
                    "dark:cui-bg-gray-600",
                    "dark:hover:cui-bg-gray-600",
                ],
            },
        },
        defaultVariants: {
            picked: false,
        },
    },
);

const customOptionWrapperStyles = mergedCva(["cui-pointer-events-none"]);

export type ValueType = string | number;

export interface SelectOption<V extends ValueType = ValueType> {
    label: string;
    value: V;
    disabled?: boolean;
}

export type SelectProps<T extends SelectOption<ValueType>> = {
    id?: string;
    options: T[];
    value: T | null;
    search?: boolean;
    onChange: (value: T) => void;
    renderOption?: (value: T) => ReactElement;
    loading?: boolean;
    messages: {
        noResults: string;
    };
    className?: BaseInputProps<unknown>["className"] & {
        inputRoot?: string;
        wrapper?: string;
        dropdownRoot?: string;
        listWrapper?: string;
        emptyList?: string;
        list?: string;
        option?: string;
        customOptionWrapper?: string;
    };
} & Omit<BaseInputProps<unknown>, "onChange" | "value" | "id">;

function Component<T extends SelectOption<ValueType>>(
    {
        id,
        options,
        value,
        search,
        onChange,
        className,
        renderOption,
        disabled,
        loading,
        messages,
        ...rest
    }: SelectProps<T>,
    ref: ForwardedRef<HTMLInputElement>,
): ReactElement {
    const generatedId = useId();
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setdebouncedQuery] = useState(query);
    const [filteredOptions, setFilteredOptions] = useState(options);

    const resolvedId = id || generatedId;

    useClickAway(dropdownRef, () => {
        setOpen(false);
        setQuery("");
    });

    useEffect(() => {
        setFilteredOptions(
            options.filter((option) =>
                option.label
                    .toLowerCase()
                    .includes(debouncedQuery.toLowerCase()),
            ),
        );
    }, [debouncedQuery, options]);

    useDebounce(
        () => {
            setdebouncedQuery(query);
        },
        200,
        [query],
    );

    const handleClick = useCallback(() => {
        if (!open && (disabled || loading)) return;
        setOpen(!open);
    }, [disabled, loading, open]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }, []);

    const getPickHandler = useCallback(
        (option: T) => () => {
            setOpen(false);
            onChange(option);
        },
        [onChange],
    );

    return (
        <div className={className?.root}>
            <TextInput
                ref={(element) => {
                    if (ref) {
                        if (typeof ref === "function") ref(element);
                        else ref.current = element;
                    }
                    setAnchorEl(element);
                }}
                id={resolvedId}
                readOnly={!search}
                icon={open ? ChevronUp : ChevronDown}
                value={open && search ? query : value?.label}
                disabled={disabled}
                loading={loading}
                {...rest}
                className={{
                    ...className,
                    input: `cui-cursor-pointer ${className?.input}`,
                    inputIcon: `cui-w-4 ${className?.inputIcon}`,
                }}
                onChange={handleChange}
                onClick={handleClick}
            />
            <Popover
                anchor={anchorEl}
                open={open}
                placement="bottom-start"
                className={{
                    root: dropdownRootStyles({
                        empty: filteredOptions.length === 0,
                        className: className?.dropdownRoot,
                    }),
                }}
                ref={dropdownRef}
            >
                {filteredOptions.length === 0 ? (
                    <div
                        style={{
                            width: anchorEl?.parentElement?.clientWidth,
                        }}
                        className={emptyOptionListStyles({
                            className: className?.emptyList,
                        })}
                    >
                        {messages.noResults}
                    </div>
                ) : (
                    <AutoSizer disableWidth>
                        {({ height }) => {
                            return (
                                <FixedSizeList
                                    height={height}
                                    width={"auto"}
                                    itemCount={filteredOptions.length}
                                    itemData={filteredOptions}
                                    itemSize={48}
                                    style={{
                                        width: anchorEl?.parentElement
                                            ?.clientWidth,
                                    }}
                                    className={optionListStyles({
                                        className: className?.list,
                                    })}
                                >
                                    {({ index, style }) => {
                                        const option = filteredOptions[index];
                                        return (
                                            <div
                                                key={index}
                                                style={style}
                                                className={optionStyles({
                                                    picked:
                                                        value?.value ===
                                                        option.value,
                                                    className:
                                                        className?.option,
                                                })}
                                                onClick={getPickHandler(option)}
                                            >
                                                {!!renderOption ? (
                                                    <div
                                                        className={mergedCx(
                                                            customOptionWrapperStyles(),
                                                            className?.customOptionWrapper,
                                                        )}
                                                    >
                                                        {renderOption(option)}
                                                    </div>
                                                ) : (
                                                    option.label
                                                )}
                                            </div>
                                        );
                                    }}
                                </FixedSizeList>
                            );
                        }}
                    </AutoSizer>
                )}
            </Popover>
        </div>
    );
}

export const Select = forwardRef(Component) as <
    T extends SelectOption<ValueType>,
>(
    props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLSelectElement> },
) => ReturnType<typeof Component>;

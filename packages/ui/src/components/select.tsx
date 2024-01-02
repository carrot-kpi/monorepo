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
    useMemo,
} from "react";
import type { BaseInputProps } from "./commons/input";
import ChevronUp from "../icons/chevron-up";
import ChevronDown from "../icons/chevron-down";
import { Popover } from "./popover";
import { TextInput } from "./text-input";
import { useClickAway, useDebounce } from "react-use";
import { mergedCva, mergedCx } from "../utils/components";
import { FixedSizeList, type ListChildComponentProps } from "react-window";
import { Typography } from "./typography";

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
        "cui-h-fit",
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
        "cui-h-12",
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

export interface SelectOption<V extends ValueType> {
    label: string;
    value: V;
    disabled?: boolean;
}

export interface ClassName extends Pick<BaseInputProps<unknown>, "className"> {
    inputRoot?: string;
    wrapper?: string;
    dropdownRoot?: string;
    listWrapper?: string;
    emptyList?: string;
    list?: string;
    option?: string;
    customOptionWrapper?: string;
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
    dataTestIds?: {
        textInput?: string;
        option?: string;
    };
    className?: ClassName;
} & Omit<BaseInputProps<unknown>, "onChange" | "value" | "id">;

type ItemData<T extends SelectOption<ValueType>> = Pick<
    SelectProps<T>,
    "options" | "value" | "onChange" | "renderOption"
> & {
    dataTestIds?: {
        option?: string;
    };
    className?: Pick<ClassName, "option" | "customOptionWrapper">;
};

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
        dataTestIds,
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

    const handleInnerChange = useCallback(
        (item: T) => {
            setOpen(false);
            onChange(item);
        },
        [onChange],
    );

    const itemData = useMemo(() => {
        const data: ItemData<T> = {
            options: filteredOptions,
            onChange: handleInnerChange,
            value,
            className,
            renderOption,
            dataTestIds: {
                option: dataTestIds?.option,
            },
        };
        return data;
    }, [
        className,
        handleInnerChange,
        filteredOptions,
        renderOption,
        value,
        dataTestIds,
    ]);

    return (
        <div className={className?.root}>
            <TextInput
                data-testid={dataTestIds?.textInput}
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
                        <Typography>{messages.noResults}</Typography>
                    </div>
                ) : (
                    <FixedSizeList<ItemData<T>>
                        height={Math.min(filteredOptions.length, 4) * 48}
                        width={anchorEl?.parentElement?.clientWidth || "auto"}
                        itemCount={filteredOptions.length}
                        itemData={itemData}
                        itemSize={48}
                        className={optionListStyles({
                            className: className?.list,
                        })}
                    >
                        {OptionRow}
                    </FixedSizeList>
                )}
            </Popover>
        </div>
    );
}

function OptionRow<T extends SelectOption<ValueType>>({
    index,
    style,
    data: { onChange, options, className, value, renderOption, dataTestIds },
}: ListChildComponentProps<ItemData<T>>) {
    const item = options[index];

    const handleClick = useCallback(() => {
        onChange(item);
    }, [item, onChange]);

    return (
        <div
            data-testid={
                dataTestIds?.option && `${dataTestIds.option}-${item.value}`
            }
            style={style}
            className={optionStyles({
                picked: value?.value === item.value,
                className: className?.option,
            })}
            onClick={handleClick}
        >
            {!!renderOption ? (
                <div
                    className={mergedCx(
                        customOptionWrapperStyles(),
                        className?.customOptionWrapper,
                    )}
                >
                    {renderOption(item)}
                </div>
            ) : (
                item.label
            )}
        </div>
    );
}

export const Select = forwardRef(Component) as <
    T extends SelectOption<ValueType>,
>(
    props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLSelectElement> },
) => ReturnType<typeof Component>;

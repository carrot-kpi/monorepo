import React, {
    type ReactElement,
    type ForwardedRef,
    useCallback,
    useState,
    useRef,
    forwardRef,
    useId,
} from "react";
import type { BaseInputProps } from "./commons/input";
import ChevronUp from "../icons/chevron-up";
import ChevronDown from "../icons/chevron-down";
import { Popover } from "./popover";
import { TextInput } from "./text-input";
import { useClickAway } from "react-use";
import { mergedCva, mergedCx } from "../utils/components";

const dropdownRootStyles = mergedCva([
    "cui-rounded-xxl",
    "cui-border",
    "cui-border-black",
    "cui-max-h-48",
    "cui-bg-white",
    "dark:cui-bg-black",
    "dark:cui-border-white",
    "cui-z-20",
    "cui-overflow-hidden",
]);

const optionListStyles = mergedCva([
    "cui-max-h-48",
    "cui-w-full",
    "cui-scrollbar",
    "cui-overflow-y-auto",
]);

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

export interface SelectOption<V extends ValueType = ValueType> {
    label: string;
    value: V;
    disabled?: boolean;
}

export type SelectProps<T extends SelectOption<ValueType>> = {
    id?: string;
    options: T[];
    value: T | null;
    onChange: (value: T) => void;
    renderOption?: (value: T) => ReactElement;
    loading?: boolean;
    className?: BaseInputProps<unknown>["className"] & {
        inputRoot?: string;
        wrapper?: string;
        dropdownRoot?: string;
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
        onChange,
        className,
        renderOption,
        disabled,
        loading,
        ...rest
    }: SelectProps<T>,
    ref: ForwardedRef<HTMLInputElement>,
): ReactElement {
    const generatedId = useId();
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    const resolvedId = id || generatedId;

    useClickAway(dropdownRef, () => {
        setOpen(false);
    });

    const handleClick = useCallback(() => {
        if (!open && (disabled || loading)) return;
        setOpen(!open);
    }, [disabled, loading, open]);

    const getPickHandler = useCallback(
        (option: T) => () => {
            onChange(option);
            setOpen(false);
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
                readOnly
                icon={open ? ChevronUp : ChevronDown}
                value={value?.label || ""}
                disabled={disabled}
                loading={loading}
                {...rest}
                className={{
                    ...className,
                    input: `cui-cursor-pointer ${className?.input}`,
                    inputIcon: `cui-w-4 ${className?.inputIcon}`,
                }}
                onClick={handleClick}
            />
            <Popover
                anchor={anchorEl}
                open={open}
                placement="bottom-start"
                className={{
                    root: dropdownRootStyles({
                        className: className?.dropdownRoot,
                    }),
                }}
                ref={dropdownRef}
            >
                <ul
                    style={{ width: anchorEl?.parentElement?.clientWidth }}
                    className={optionListStyles({
                        className: className?.list,
                    })}
                >
                    {options.map((option) => {
                        return (
                            <li
                                className={optionStyles({
                                    picked: value?.value === option.value,
                                    className: className?.option,
                                })}
                                onClick={getPickHandler(option)}
                                key={option.value}
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
                            </li>
                        );
                    })}
                </ul>
            </Popover>
        </div>
    );
}

export const Select = forwardRef(Component) as <
    T extends SelectOption<ValueType>,
>(
    props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLSelectElement> },
) => ReturnType<typeof Component>;

import React, {
    ReactElement,
    useCallback,
    useEffect,
    useState,
    MouseEvent as SpecificMouseEvent,
} from "react";
import { BaseInputProps, inputStyles, BaseInputWrapper } from "../commons";
import { usePopper } from "react-popper";
import { ReactComponent as ChevronUp } from "../../assets/chevron-up.svg";
import { cva, cx } from "class-variance-authority";

const dropdownRootStyles = cva([
    "cui-rounded-xxl",
    "cui-border",
    "cui-bg-white",
    "dark:cui-bg-black",
    "dark:cui-border-white",
    "cui-z-10",
    "cui-overflow-hidden",
]);

const arrowStyles = cva(
    [
        "cui-select-caret",
        "cui-absolute",
        "cui-pointer-events-none",
        "cui-cursor-pointer",
        "cui-text-black",
        "dark:cui-text-white",
        "cui-right-4",
        "cui-top-1/2",
        "cui-transform",
        "-cui-translate-y-1/2",
    ],
    {
        variants: {
            open: {
                false: ["cui-rotate-180"],
            },
        },
        defaultVariants: {
            open: false,
        },
    }
);

const optionStyles = cva(
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
    }
);

const selectAnchorStyles = cva(["cui-select-wrapper", "cui-relative"]);
const customOptionWrapperStyles = cva(["cui-pointer-events-none"]);

export interface SelectOption {
    label: string;
    value: ValueType;
    disabled?: boolean;
}

export type ValueType = string | number;

export type SelectProps<O extends SelectOption = SelectOption> = {
    fullWidth?: boolean;
    options: O[];
    value: O | null;
    helperText?: string;
    error?: boolean;
    onChange: (value: O) => void;
    renderOption?: (value: O) => ReactElement;
    className?: BaseInputProps<unknown>["className"] & {
        inputRoot?: string;
        wrapper?: string;
        dropdownRoot?: string;
        option?: string;
        customOptionWrapper?: string;
    };
} & Omit<BaseInputProps<unknown>, "onChange" | "value">;

export const Select = <O extends SelectOption>({
    id,
    variant,
    label,
    border,
    options,
    helperText,
    error = false,
    value,
    onChange,
    className,
    renderOption,
    fullWidth,
    ...rest
}: SelectProps<O>): ReactElement => {
    const [anchorElement, setAnchorElement] = useState<HTMLDivElement | null>(
        null
    );
    const [popperElement, setPopperElement] = useState<HTMLUListElement | null>(
        null
    );
    const [open, setOpen] = useState(false);

    const { styles, attributes } = usePopper(anchorElement, popperElement, {
        placement: "bottom",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 8],
                },
            },
        ],
    });

    useEffect(() => {
        const handleCloseOnClick = (event: MouseEvent) => {
            if (!open || !popperElement || !anchorElement) return;
            if (
                !popperElement.contains(event.target as Node) &&
                !anchorElement.contains(event.target as Node)
            )
                setOpen(false);
        };

        document.addEventListener("mousedown", handleCloseOnClick);
        return () => {
            document.removeEventListener("mousedown", handleCloseOnClick);
        };
    }, [anchorElement, open, popperElement]);

    const handleClick = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handlePick = useCallback(
        (event: SpecificMouseEvent<HTMLLIElement>) => {
            if (!event.target) return;
            const value = (event.target as HTMLLIElement).dataset.value;
            if (!!onChange && !!value) onChange(JSON.parse(value) as O);
            setOpen(false);
        },
        [onChange]
    );

    return (
        <div
            className={cx(
                selectRootStyles({
                    fullWidth,
                }),
                className?.root
            )}
        >
            <BaseInputWrapper
                id={id}
                label={label}
                error={error}
                helperText={helperText}
                className={{ root: className?.inputRoot }}
            >
                <div
                    className={selectAnchorStyles({
                        className: className?.wrapper,
                    })}
                    ref={setAnchorElement}
                >
                    <input
                        id={id}
                        type="text"
                        readOnly
                        value={value?.label || ""}
                        {...rest}
                        onClick={handleClick}
                        className={cx(
                            inputStyles({
                                error,
                                variant,
                                border,
                            }),
                            "cui-cursor-pointer",
                            className?.input
                        )}
                    />
                    <ChevronUp
                        className={arrowStyles({
                            open,
                        })}
                        onClick={handleClick}
                    />
                </div>
            </BaseInputWrapper>
            {open && (
                <ul
                    ref={setPopperElement}
                    style={{
                        ...styles.popper,
                        width: anchorElement?.clientWidth,
                    }}
                    className={dropdownRootStyles({
                        className: className?.dropdownRoot,
                    })}
                    {...attributes.popper}
                >
                    {options.map((option) => {
                        return (
                            <li
                                className={optionStyles({
                                    picked: value?.value === option.value,
                                    className: className?.option,
                                })}
                                onClick={handlePick}
                                data-value={JSON.stringify(option)}
                                key={option.label}
                            >
                                {!!renderOption ? (
                                    <div
                                        className={cx(
                                            customOptionWrapperStyles(),
                                            className?.customOptionWrapper
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
            )}
        </div>
    );
};

import React, {
    ReactElement,
    useCallback,
    useEffect,
    useState,
    MouseEvent as SpecificMouseEvent,
} from "react";
import { BaseInputProps, inputStyles, LabelWrapper } from "../commons";
import { usePopper } from "react-popper";
import { ReactComponent as ArrowDown } from "../../assets/arrow-down.svg";
import { cva } from "class-variance-authority";

const arrowStyles = cva(
    [
        "cui-absolute cui-cursor-pointer cui-fill-black dark:cui-fill-white cui-right-4 cui-top-1/2 cui-transform -cui-translate-y-1/2",
    ],
    {
        variants: {
            open: {
                true: ["cui-rotate-180"],
            },
        },
        defaultVariants: {
            open: false,
        },
    }
);

const optionStyles = cva(
    [
        "cui-cursor-pointer first:cui-rounded-t-xxl last:cui-rounded-b-xxl cui-p-3 cui-font-mono cui-font-normal cui-outline-none cui-placeholder-opacity-20 dark:cui-placeholder-opacity-30 cui-text-black dark:cui-text-white cui-box-border hover:cui-bg-gray-600 dark:hover:cui-bg-gray-700",
    ],
    {
        variants: {
            picked: {
                true: [
                    "cui-bg-gray-300 hover:cui-bg-gray-300 dark:cui-bg-gray-600 dark:hover:cui-bg-gray-600",
                ],
                false: ["cui-bg-white dark:cui-bg-black"],
            },
        },
        defaultVariants: {
            picked: false,
        },
    }
);

export interface SelectOption {
    label: string;
    value: ValueType;
    disabled?: boolean;
}

export type ValueType = string | number;

export type SelectProps<O extends SelectOption = SelectOption> = {
    options: O[];
    value: O | null;
    onChange: (value: O) => void;
    renderOption?: (value: O) => ReactElement;
} & Omit<BaseInputProps<unknown>, "onChange" | "value">;

export const Select = <O extends SelectOption>({
    id,
    size,
    label,
    border,
    options,
    value,
    onChange,
    className,
    renderOption,
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
        <>
            <LabelWrapper id={id} label={label}>
                <div className="cui-relative" ref={setAnchorElement}>
                    <input
                        id={id}
                        type="text"
                        readOnly
                        value={value?.label || ""}
                        {...rest}
                        onClick={handleClick}
                        className={inputStyles({
                            size,
                            border,
                            className: [
                                "cui-w-fit cui-cursor-pointer dark:cui-bg-black cui-border-black",
                                className,
                            ],
                        })}
                    />
                    <ArrowDown
                        className={arrowStyles({ open })}
                        onClick={handleClick}
                    />
                </div>
            </LabelWrapper>
            {open && (
                <ul
                    ref={setPopperElement}
                    style={{
                        ...styles.popper,
                        width: anchorElement?.clientWidth,
                    }}
                    className="cui-rounded-xxl cui-border cui-bg-white dark:cui-border-white cui-z-10"
                    {...attributes.popper}
                >
                    {options.map((option) => {
                        return (
                            <li
                                className={optionStyles({
                                    picked: value?.value === option.value,
                                })}
                                onClick={handlePick}
                                data-value={JSON.stringify(option)}
                                key={option.label}
                            >
                                {!!renderOption ? (
                                    <div className="cui-pointer-events-none">
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
        </>
    );
};

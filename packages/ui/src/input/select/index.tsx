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
                true: [],
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
        "cui-cursor-pointer first:cui-rounded-t-xxl last:cui-rounded-b-xxl cui-p-3 cui-font-mono cui-font-normal cui-outline-none cui-placeholder-opacity-20 dark:cui-placeholder-opacity-30 cui-text-black dark:cui-text-white cui-box-border",
    ],
    {
        variants: {
            picked: {
                true: ["cui-bg-gray-300 dark:cui-bg-gray-500"],
                false: [],
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

export type SelectProps = {
    options: SelectOption[];
    value: SelectOption | null;
    onChange: (value: SelectOption) => void;
} & Omit<BaseInputProps, "onChange">;

export const Select = ({
    id,
    size,
    label,
    border,
    options,
    value,
    onChange,
    className,
    ...rest
}: SelectProps): ReactElement => {
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
                    offset: [0, 16],
                },
            },
        ],
    });

    useEffect(() => {
        const handleCloseOnClick = (event: MouseEvent) => {
            if (!open || !popperElement) return;
            if (!popperElement.contains(event.target as Node)) setOpen(false);
        };

        document.addEventListener("mousedown", handleCloseOnClick);
        return () => {
            document.removeEventListener("mousedown", handleCloseOnClick);
        };
    }, [open, popperElement]);

    const handleClick = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handlePick = useCallback(
        (event: SpecificMouseEvent<HTMLLIElement>) => {
            if (!event.target) return;
            const value = (event.target as HTMLLIElement).dataset.value;
            if (!!onChange && !!value)
                onChange(JSON.parse(value) as SelectOption);
            setOpen(false);
        },
        [onChange]
    );

    return (
        <div className="cui-inline-block">
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
                            className: [className, "cui-cursor-pointer"],
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
                    className="cui-rounded-xxl cui-border cui-border-black dark:cui-border-white cui-bg-transparent"
                    {...attributes.popper}
                >
                    {options.map((option) => (
                        <li
                            className={optionStyles({
                                picked: value?.value === option.value,
                            })}
                            onClick={handlePick}
                            data-value={JSON.stringify(option)}
                            key={option.label}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

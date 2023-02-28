import React, {
    ReactElement,
    useCallback,
    useEffect,
    useState,
    MouseEvent as SpecificMouseEvent,
    useRef,
    forwardRef,
    ForwardedRef,
} from "react";
import { BaseInputProps } from "../commons";
import { ReactComponent as ChevronUp } from "../../../assets/chevron-up.svg";
import { ReactComponent as ChevronDown } from "../../../assets/chevron-down.svg";
import { cva, cx } from "class-variance-authority";
import { Popover } from "../../utils/popover";
import { TextInput } from "../text";

const dropdownRootStyles = cva([
    "cui-rounded-xxl",
    "cui-border",
    "cui-bg-white",
    "dark:cui-bg-black",
    "dark:cui-border-white",
    "cui-z-10",
    "cui-overflow-hidden",
]);

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

const customOptionWrapperStyles = cva(["cui-pointer-events-none"]);

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
    className?: BaseInputProps<unknown>["className"] & {
        inputRoot?: string;
        wrapper?: string;
        dropdownRoot?: string;
        option?: string;
        customOptionWrapper?: string;
    };
} & Omit<BaseInputProps<unknown>, "onChange" | "value">;

const Component = <O extends SelectOption>(
    {
        id,
        options,
        value,
        onChange,
        className,
        renderOption,
        ...rest
    }: SelectProps<O>,
    ref: ForwardedRef<HTMLInputElement>
): ReactElement => {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleCloseOnClick = (event: MouseEvent) => {
            if (!open || !dropdownRef.current || !anchorEl) return;
            if (
                !dropdownRef.current.contains(event.target as Node) &&
                !anchorEl.contains(event.target as Node)
            )
                setOpen(false);
        };

        document.addEventListener("mousedown", handleCloseOnClick);
        return () => {
            document.removeEventListener("mousedown", handleCloseOnClick);
        };
    }, [anchorEl, open]);

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
        <div className={className?.root}>
            <TextInput
                ref={(element) => {
                    if (ref) {
                        if (typeof ref === "function") ref(element);
                        else ref.current = element;
                    }
                    setAnchorEl(element);
                }}
                id={id}
                readOnly
                icon={open ? ChevronUp : ChevronDown}
                value={value?.label || ""}
                {...rest}
                className={{
                    root: "cui-cursor-pointer",
                    input: "cui-cursor-pointer",
                    inputIcon: "cui-w-4",
                    ...className,
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
                <ul style={{ width: anchorEl?.parentElement?.clientWidth }}>
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
            </Popover>
        </div>
    );
};

export const Select = forwardRef(Component) as <O extends SelectOption>(
    props: SelectProps<O> & { ref?: React.ForwardedRef<HTMLSelectElement> }
) => ReturnType<typeof Component>;

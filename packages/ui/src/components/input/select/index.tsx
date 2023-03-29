import React, {
    ReactElement,
    useCallback,
    useState,
    MouseEvent as SpecificMouseEvent,
    useRef,
    forwardRef,
    ForwardedRef,
    useId,
} from "react";
import { BaseInputProps } from "../commons";
import { ReactComponent as ChevronUp } from "../../../assets/chevron-up.svg";
import { ReactComponent as ChevronDown } from "../../../assets/chevron-down.svg";
import { cx } from "class-variance-authority";
import { Popover } from "../../utils/popover";
import { TextInput } from "../text";
import { useClickAway } from "react-use";
import { mergedCva } from "../../../utils/components";

const dropdownRootStyles = mergedCva([
    "cui-rounded-xxl",
    "cui-border",
    "cui-max-h-48",
    "cui-bg-white",
    "dark:cui-bg-black",
    "dark:cui-border-white",
    "cui-z-10",
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
    }
);

const customOptionWrapperStyles = mergedCva(["cui-pointer-events-none"]);

export interface SelectOption {
    label: string;
    value: ValueType;
    disabled?: boolean;
}

export type ValueType = string | number;

export type SelectProps<O extends SelectOption = SelectOption> = {
    id?: string;
    options: O[];
    value: O | null;
    onChange: (value: O) => void;
    renderOption?: (value: O) => ReactElement;
    className?: BaseInputProps<unknown>["className"] & {
        inputRoot?: string;
        wrapper?: string;
        dropdownRoot?: string;
        list?: string;
        option?: string;
        customOptionWrapper?: string;
    };
} & Omit<BaseInputProps<unknown>, "onChange" | "value" | "id">;

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
    const generatedId = useId();
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    const resolvedId = id || generatedId;

    useClickAway(dropdownRef, () => {
        setOpen(false);
    });

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
                        else if (ref.current) ref.current = element;
                    }
                    setAnchorEl(element);
                }}
                id={resolvedId}
                readOnly
                icon={open ? ChevronUp : ChevronDown}
                value={value?.label || ""}
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
                                onClick={handlePick}
                                data-value={JSON.stringify(option)}
                                key={option.value}
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

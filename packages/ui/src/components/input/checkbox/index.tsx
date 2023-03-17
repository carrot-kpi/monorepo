import React, {
    forwardRef,
    HTMLAttributes,
    ReactElement,
    useCallback,
    useId,
    useState,
} from "react";
import { Typography } from "../../data-display";
import { ReactComponent as InfoIcon } from "../../../assets/info-icon.svg";
import { BaseInputWrapperProps, infoIconStyles } from "../commons";
import { ReactComponent as Tick } from "../../../assets/tick.svg";
import { mergedCva } from "../../../utils/components";
import { Popover } from "../../utils";

const inputWrapperStyles = mergedCva(["cui-flex", "cui-items-center"], {
    variants: {
        hasLabel: {
            true: ["cui-gap-2"],
        },
    },
});

const checkmarkBackgroundStyles = mergedCva(
    [
        "cui-relative",
        "cui-w-5",
        "cui-h-5",
        "cui-cursor-pointer",
        "cui-border",
        "cui-rounded-md",
        "cui-border-black",
        "dark:cui-border-white",
        "cui-transition-colors",
    ],
    {
        variants: {
            checked: {
                true: ["cui-bg-orange"],
            },
        },
    }
);

const checkmarkStyles = mergedCva(
    [
        "cui-absolute",
        "cui-top-0",
        "cui-left-0",
        "cui-w-full",
        "cui-h-full",
        "cui-text-black",
        "dark:cui-text-white",
        "cui-transition-opacity",
    ],
    {
        variants: {
            checked: {
                true: ["cui-opacity-100"],
                false: ["cui-opacity-0"],
            },
        },
    }
);

const inputStyles = mergedCva([
    "cui-cursor-pointer",
    "cui-absolute",
    "cui-top-0",
    "cui-left-0",
    "cui-w-full",
    "cui-h-full",
    "cui-opacity-0",
]);

const labelStyles = mergedCva([
    "cui-flex",
    "cui-items-center",
    "cui-gap-1.5",
    "cui-w-fit",
]);

export interface BaseCheckboxProps {
    checked?: boolean;
    id?: string;
    className?: BaseInputWrapperProps["className"] & {
        checkboxinputWrapper?: string;
        checkmark?: string;
    };
}

export type CheckboxProps = Omit<
    HTMLAttributes<HTMLInputElement>,
    "type" | "className" | "id" | keyof BaseCheckboxProps
> &
    BaseCheckboxProps &
    Omit<BaseInputWrapperProps, "id">;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    function Checkbox(
        { id, label, className, checked, info, ...rest },
        ref
    ): ReactElement {
        const generatedId = useId();
        const [infoIcon, setInfoIcon] = useState<SVGSVGElement | null>(null);
        const [infoPopoverOpen, setInfoPopoverOpen] = useState(false);

        const resolvedId = id || generatedId;

        const handleInfoMouseEnter = useCallback(() => {
            setInfoPopoverOpen(true);
        }, []);

        const handleInfoMouseExit = useCallback(() => {
            setInfoPopoverOpen(false);
        }, []);

        return (
            <div
                className={inputWrapperStyles({
                    hasLabel: !!label,
                    className: className?.inputWrapper,
                })}
            >
                <div
                    className={checkmarkBackgroundStyles({
                        checked,
                        className: className?.checkboxinputWrapper,
                    })}
                >
                    <Tick
                        className={checkmarkStyles({
                            checked,
                            className: className?.checkmark,
                        })}
                    />
                    <input
                        type="checkbox"
                        ref={ref}
                        checked={checked}
                        {...rest}
                        id={resolvedId}
                        className={inputStyles({
                            className: className?.input,
                        })}
                    />
                </div>
                <label
                    className={labelStyles({ className: className?.label })}
                    htmlFor={resolvedId}
                >
                    <Typography className={className?.labelText}>
                        {label}
                    </Typography>
                    {info && (
                        <>
                            <InfoIcon
                                ref={setInfoIcon}
                                className={infoIconStyles({
                                    className: className?.infoIcon,
                                })}
                                onMouseEnter={handleInfoMouseEnter}
                                onMouseLeave={handleInfoMouseExit}
                            />
                            <Popover
                                anchor={infoIcon}
                                open={infoPopoverOpen}
                                className={{
                                    root: `cui-p-2 ${className?.infoPopover}`,
                                }}
                            >
                                {info}
                            </Popover>
                        </>
                    )}
                </label>
            </div>
        );
    }
);

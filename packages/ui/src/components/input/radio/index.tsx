import React, {
    forwardRef,
    HTMLAttributes,
    ReactElement,
    ReactNode,
    useCallback,
    useId,
    useRef,
    useState,
} from "react";
import { mergedCva } from "../../../utils/components";
import { Typography } from "../../data-display";
import { ReactComponent as InfoIcon } from "../../../assets/info-icon.svg";
import { BaseInputWrapperProps, infoIconStyles } from "../commons";
import { Popover } from "../../utils";

const inputWrapperStyles = mergedCva(
    ["cui-flex", "cui-items-center", "cui-gap-1.5"],
    {
        variants: {
            hasLabel: {
                true: ["cui-gap-2"],
            },
        },
    }
);

const radioBackgroundStyles = mergedCva(
    [
        "cui-relative",
        "hover:cui-cursor-pointer",
        "cui-rounded-full",
        "cui-border cui-border-black dark:cui-border-white",
        "cui-h-4",
        "cui-w-4",
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

export interface BaseRadioProps {
    id?: string;
    checked?: boolean;
    value?: string | number;
    name?: string;
    disabled?: boolean;
    info?: ReactNode;
    className?: BaseInputWrapperProps["className"] & {
        radioInputWrapper?: string;
    };
}

export type RadioProps = Omit<
    HTMLAttributes<HTMLInputElement>,
    "type" | "className" | "id" | keyof BaseRadioProps
> &
    Pick<BaseInputWrapperProps, "label" | "className"> &
    BaseRadioProps;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
    {
        id,
        label,
        className,
        value,
        name,
        disabled,
        info,
        checked,
        onChange,
        ...rest
    },
    ref
): ReactElement {
    const generatedId = useId();
    const infoIconRef = useRef<SVGSVGElement>(null);
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
                className={radioBackgroundStyles({
                    checked,
                    className: className?.radioInputWrapper,
                })}
            >
                <input
                    type="radio"
                    ref={ref}
                    value={value}
                    checked={checked}
                    disabled={disabled}
                    name={name}
                    onChange={onChange}
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
                            ref={infoIconRef}
                            className={infoIconStyles({
                                className: className?.infoIcon,
                            })}
                            onMouseEnter={handleInfoMouseEnter}
                            onMouseLeave={handleInfoMouseExit}
                        />
                        <Popover
                            anchor={infoIconRef.current}
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
});

import React, { forwardRef, useId } from "react";
import type { ReactElement } from "react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";
import {
    type BaseInputProps,
    inputStyles,
    BaseInputWrapper,
} from "./commons/input";

export { type NumberFormatValues } from "react-number-format";

export type NumberInputProps = Omit<
    NumericFormatProps & BaseInputProps<string>,
    "size" | "id" | "className"
> & { id?: string; className: BaseInputProps<string>["className"] };

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    function NumberInput(
        {
            id,
            variant,
            value,
            label,
            placeholder,
            border,
            info,
            errorText,
            icon,
            iconPlacement,
            action,
            actionPlacement,
            error = false,
            className,
            loading,
            disabled,
            ...rest
        },
        ref,
    ): ReactElement {
        const generatedId = useId();

        const resolvedId = id || generatedId;

        return (
            <BaseInputWrapper
                id={resolvedId}
                label={label}
                error={error}
                errorText={errorText}
                info={info}
                icon={icon}
                iconPlacement={iconPlacement}
                action={action}
                actionPlacement={actionPlacement}
                className={className}
            >
                <NumericFormat
                    type="text"
                    defaultValue=""
                    thousandSeparator=","
                    decimalSeparator="."
                    value={value}
                    disabled={disabled || loading}
                    placeholder={placeholder}
                    getInputRef={ref}
                    id={resolvedId}
                    {...rest}
                    className={inputStyles({
                        error,
                        variant,
                        border,
                        loading,
                        hasLeftIcon: !!icon && iconPlacement === "left",
                        className: className?.input,
                    })}
                />
            </BaseInputWrapper>
        );
    },
);

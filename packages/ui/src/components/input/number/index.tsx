import React, { forwardRef, useId } from "react";
import { ReactElement } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { BaseInputProps, inputStyles, BaseInputWrapper } from "../commons";

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
            ...rest
        },
        ref
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
                    placeholder={placeholder}
                    getInputRef={ref}
                    id={resolvedId}
                    {...rest}
                    className={inputStyles({
                        error,
                        variant,
                        border,
                        hasLeftIcon: !!icon && iconPlacement === "left",
                        className: className?.input,
                    })}
                />
            </BaseInputWrapper>
        );
    }
);

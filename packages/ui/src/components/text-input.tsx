import React, { forwardRef, useId } from "react";
import type { ReactElement } from "react";
import type { BaseInputProps } from "./commons/input";
import { inputStyles, BaseInputWrapper } from "./commons/input";

export type TextInputProps = Omit<BaseInputProps<string>, "id"> & {
    id?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    function TextInput(
        {
            id,
            label,
            variant,
            border,
            errorText,
            info,
            icon,
            iconPlacement,
            action,
            actionPlacement,
            error = false,
            className,
            value,
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
                <input
                    id={resolvedId}
                    type="text"
                    ref={ref}
                    value={value || ""}
                    disabled={loading || disabled}
                    {...rest}
                    className={inputStyles({
                        error,
                        variant,
                        loading,
                        border,
                        hasLeftIcon: !!icon && iconPlacement === "left",
                        className: className?.input,
                    })}
                />
            </BaseInputWrapper>
        );
    },
);

import React, { type ReactElement, type ReactNode, useId } from "react";
import { BaseInputWrapper, type BaseInputWrapperProps } from "../commons";
import { Typography } from "../../data-display";
import { mergedCva } from "../../../utils/components";

export interface RadioGroupProps
    extends Omit<BaseInputWrapperProps, "className" | "id"> {
    id?: string;
    className?: BaseInputWrapperProps["className"] & {
        radioInputsWrapper?: string;
    };
    children: ReactNode[];
}

const radioInputsWrapperStyles = mergedCva(["flex", "gap-4"]);

export const RadioGroup = ({
    id,
    label,
    error,
    errorText,
    info,
    children,
    className,
}: RadioGroupProps): ReactElement => {
    const generatedId = useId();

    const resolvedId = id || generatedId;

    return (
        <BaseInputWrapper
            id={resolvedId}
            error={error}
            errorText={errorText}
            info={info}
            className={className}
        >
            <Typography className={className?.labelText}>{label}</Typography>
            <div
                className={radioInputsWrapperStyles({
                    className: className?.radioInputsWrapper,
                })}
            >
                {children}
            </div>
        </BaseInputWrapper>
    );
};

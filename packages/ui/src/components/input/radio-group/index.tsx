import React, { ReactElement, ReactNode } from "react";
import { BaseInputWrapper, BaseInputWrapperProps } from "../commons";
import { Typography } from "../../data-display";
import { mergedCva } from "../../../utils/components";

export interface RadioGroupProps
    extends Omit<BaseInputWrapperProps, "className"> {
    children: ReactNode[];
    className?: BaseInputWrapperProps["className"] & {
        radioInputsWrapper?: string;
    };
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
    return (
        <BaseInputWrapper
            id={id}
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

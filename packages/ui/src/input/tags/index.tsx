import { cva } from "class-variance-authority";
import React, { forwardRef, useCallback, useState } from "react";
import { ReactElement } from "react";
import { BaseInputProps, BaseInputWrapper, inputStyles } from "../commons";
import { Tag, TagProps } from "./tag";

const tagsWrapper = cva(["cui-flex", "cui-flex-wrap", "cui-gap-2", "cui-mt-2"]);

export type TagsInputProps = Omit<BaseInputProps<string[]>, "onChange"> & {
    onChange: (tags: string[]) => void;
    className?: BaseInputProps<unknown>["className"] & {
        tagsWrapper?: string;
        tag?: TagProps["className"];
    };
};

export const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
    function TagsInput(
        {
            id,
            label,
            variant,
            border,
            helperText,
            error = false,
            className,
            value,
            onChange,
            ...rest
        },
        ref
    ): ReactElement {
        const [inputValue, setInputValue] = useState<string>("");

        const handleOnChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputValue(event.target.value);
            },
            []
        );

        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key !== "Enter" || !inputValue) return;
                onChange(value ? [...value, inputValue] : [inputValue]);
                if (!!inputValue) setInputValue("");
            },
            [inputValue, onChange, value]
        );

        const handleTagRemove = useCallback(
            (index: number) => {
                if (!!value && value.length > 0)
                    onChange(value.filter((_, i) => i !== index));
            },
            [onChange, value]
        );

        return (
            <BaseInputWrapper
                id={id}
                label={label}
                error={error}
                helperText={helperText}
                className={className}
            >
                <input
                    id={id}
                    type="text"
                    ref={ref}
                    {...rest}
                    value={inputValue}
                    onChange={handleOnChange}
                    onKeyDown={handleKeyDown}
                    className={inputStyles({
                        error,
                        variant,
                        border,
                        className: className?.input,
                    })}
                />
                {!!value && value.length > 0 && (
                    <div
                        className={tagsWrapper({
                            className: className?.tagsWrapper,
                        })}
                    >
                        {value.map((tag, index) => (
                            <Tag
                                key={tag + index}
                                text={tag}
                                index={index}
                                onRemove={handleTagRemove}
                                className={className?.tag}
                            />
                        ))}
                    </div>
                )}
            </BaseInputWrapper>
        );
    }
);

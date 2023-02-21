import { cva } from "class-variance-authority";
import React, { forwardRef, useCallback, useState } from "react";
import { ReactElement } from "react";
import { Button } from "../button";
import { BaseInputProps, BaseInputWrapper, inputStyles } from "../commons";
import { Tag, TagProps } from "./tag";

const tagsWrapperStyles = cva([
    "cui-flex",
    "cui-flex-wrap",
    "cui-gap-2",
    "cui-mt-2",
]);

const inputWrapperStyles = cva(["cui-flex", "cui-gap-2"]);

export type TagsInputProps = Omit<BaseInputProps<string[]>, "onChange"> & {
    onChange: (tags: string[]) => void;
    addButtonLabel: string;
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
            addButtonLabel,
            onChange,
            ...rest
        },
        ref
    ): ReactElement {
        const [inputValue, setInputValue] = useState<string>("");

        const addTag = useCallback(() => {
            onChange(value ? [...value, inputValue] : [inputValue]);
            if (!!inputValue) setInputValue("");
        }, [inputValue, onChange, value]);

        const handleOnChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputValue(event.target.value);
            },
            []
        );

        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key !== "Enter" || !inputValue) return;
                addTag();
            },
            [addTag, inputValue]
        );

        const handleOnClick = useCallback(() => {
            if (!inputValue) return;
            addTag();
        }, [addTag, inputValue]);

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
                <div className={inputWrapperStyles()}>
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
                    <Button onClick={handleOnClick} size="xsmall">
                        {addButtonLabel}
                    </Button>
                </div>
                {!!value && value.length > 0 && (
                    <div
                        className={tagsWrapperStyles({
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

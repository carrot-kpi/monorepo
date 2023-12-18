import React, { forwardRef, useCallback, useId, useState } from "react";
import type { ReactElement } from "react";
import { mergedCva } from "../utils/components";
import { Button } from "./button";
import type { BaseInputProps } from "./commons/input";
import { TextInput } from "./text-input";
import { Typography, type TypographyProps } from "./typography";
import Remove from "../icons/remove";

const tagStyles = mergedCva([
    "cui-rounded-xxl cui-border cui-border-black dark:cui-border-white",
    "cui-px-2 cui-py-1 cui-w-fit cui-bg-white dark:cui-bg-black dark:cui-text-white",
    "cui-flex cui-items-center cui-gap-1 hover:cui-cursor-pointer cui-select-none",
]);

const iconStyles = mergedCva([
    "cui-fill-gray-100 hover:cui-fill-green dark:hover:cui-fill-orange cui-stroke-black",
    "dark:cui-stroke-white dark:cui-fill-black hover:cui-cursor-pointer -cui-mr-1",
]);

export interface TagProps {
    text: string;
    className?: {
        root?: string;
        text?: TypographyProps["className"];
        removeIcon?: string;
    };
    index: number;
    onRemove: (index: number) => void;
    dataTestIds?: {
        removeButton?: string;
    };
}

const Tag = ({
    className,
    text,
    index,
    onRemove,
    dataTestIds,
}: TagProps): ReactElement => {
    const handleRemove = useCallback(() => {
        onRemove(index);
    }, [index, onRemove]);

    return (
        <div className={tagStyles({ className: className?.root })}>
            <Typography variant="xs" uppercase className={className?.text}>
                {text}
            </Typography>
            <Remove
                data-testId={dataTestIds?.removeButton}
                className={iconStyles({ className: className?.removeIcon })}
                onClick={handleRemove}
            />
        </div>
    );
};

const buttonStyles = mergedCva(["cui-h-3"]);

const tagsWrapperStyles = mergedCva([
    "cui-flex",
    "cui-flex-wrap",
    "cui-gap-2",
    "cui-mt-2",
]);

export type TagsInputProps = Omit<
    BaseInputProps<string[]>,
    "onChange" | "id"
> & {
    id?: string;
    onChange: (tags: string[]) => void;
    messages: { add: string };
    className?: BaseInputProps<unknown>["className"] & {
        root?: string;
        button?: string;
        tagsWrapper?: string;
        tag?: TagProps["className"];
    };
    dataTestIds?: {
        textInput?: string;
        addButton?: string;
        tag?: TagProps["dataTestIds"];
    };
};

export const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
    function TagsInput(
        {
            id,
            className,
            value,
            variant,
            messages,
            onChange,
            disabled,
            loading,
            dataTestIds,
            ...rest
        },
        ref,
    ): ReactElement {
        const generatedId = useId();
        const [inputValue, setInputValue] = useState<string>("");

        const resolvedId = id || generatedId;

        const addTag = useCallback(() => {
            onChange(value ? [...value, inputValue] : [inputValue]);
            if (!!inputValue) setInputValue("");
        }, [inputValue, onChange, value]);

        const handleOnChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputValue(event.target.value);
            },
            [],
        );

        const handleKeyDown = useCallback(
            (event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key !== "Enter" || !inputValue) return;
                addTag();
            },
            [addTag, inputValue],
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
            [onChange, value],
        );

        return (
            <div className={className?.root}>
                <TextInput
                    data-testId={dataTestIds?.textInput}
                    id={resolvedId}
                    ref={ref}
                    variant={variant}
                    {...rest}
                    action={
                        <Button
                            data-testId={dataTestIds?.addButton}
                            onClick={handleOnClick}
                            size="xsmall"
                            loading={loading}
                            disabled={disabled}
                            className={{
                                root: buttonStyles({
                                    className: className?.button,
                                }),
                            }}
                        >
                            {messages.add}
                        </Button>
                    }
                    value={inputValue}
                    onChange={handleOnChange}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    loading={loading}
                    className={{
                        ...className,
                        input: `cui-pr-16 ${className?.input}`,
                        inputActionWrapper: `cui-pr-2 ${className?.inputActionWrapper}`,
                    }}
                />
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
                                dataTestIds={dataTestIds?.tag}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    },
);

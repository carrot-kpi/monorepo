import React, { forwardRef, useCallback, useId, useState } from "react";
import type { ReactElement } from "react";
import { mergedCva } from "../../../utils/components";
import { Button } from "../button";
import type { BaseInputProps } from "../commons";
import { TextInput } from "../text";
import { Tag, type TagProps } from "./tag";

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
};

export const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
    function TagsInput(
        { id, className, value, variant, messages, onChange, ...rest },
        ref
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
            <div className={className?.root}>
                <TextInput
                    id={resolvedId}
                    ref={ref}
                    variant={variant}
                    {...rest}
                    action={
                        <Button
                            onClick={handleOnClick}
                            size="xsmall"
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
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }
);

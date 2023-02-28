import { cva } from "class-variance-authority";
import React, { forwardRef, useCallback, useState } from "react";
import { ReactElement } from "react";
import { Button } from "../button";
import { BaseInputProps } from "../commons";
import { TextInput } from "../text";
import { Tag, TagProps } from "./tag";

const buttonStyles = cva(["cui-h-3"]);

const tagsWrapperStyles = cva([
    "cui-flex",
    "cui-flex-wrap",
    "cui-gap-2",
    "cui-mt-2",
]);

export type TagsInputProps = Omit<BaseInputProps<string[]>, "onChange"> & {
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
            <div className={className?.root}>
                <TextInput
                    id={id}
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
                        input: "cui-pr-16",
                        inputActionWrapper: "cui-pr-2",
                        ...className,
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

import { cva } from "class-variance-authority";
import React, { useCallback, useEffect, useState } from "react";
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

export const TagsInput = ({
    id,
    label,
    size,
    border,
    helperText,
    error = false,
    className,
    value,
    onChange,
    ...rest
}: TagsInputProps): ReactElement => {
    const [tags, setTags] = useState<string[]>(value || []);
    const [tagError, setTagError] = useState<boolean>(false);
    const [tagErrorMessage, setTagErrorMessage] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        onChange(tags);
    }, [onChange, tags]);

    const handleOnChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value);
        },
        []
    );

    const handleTagCreate = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== "Enter") return;
            if (inputValue === "") return;
            if (tags.find((tag) => tag === inputValue)) {
                setTagError(true);
                setTagErrorMessage("Tag already existing");
                return;
            }

            setTagError(false);
            setTagErrorMessage("");
            setTags((prevState) => [...prevState, inputValue]);
            setInputValue("");
        },
        [inputValue, tags]
    );

    const handleTagRemove = useCallback((indexToRemove: number) => {
        setTags((prevStatus) =>
            prevStatus.filter((_, index) => index !== indexToRemove)
        );
    }, []);

    return (
        <BaseInputWrapper
            id={id}
            label={label}
            error={error || tagError}
            helperText={helperText || tagErrorMessage}
            className={className}
        >
            <input
                id={id}
                type="text"
                {...rest}
                value={inputValue}
                onChange={handleOnChange}
                onKeyDown={handleTagCreate}
                className={inputStyles({
                    error,
                    size,
                    border,
                    className: className?.input,
                })}
            />
            {tags.length > 0 && (
                <div
                    className={tagsWrapper({
                        className: className?.tagsWrapper,
                    })}
                >
                    {tags.map((tag, index) => (
                        <Tag
                            key={tag}
                            text={tag}
                            onRemove={() => handleTagRemove(index)}
                            className={className?.tag}
                        />
                    ))}
                </div>
            )}
        </BaseInputWrapper>
    );
};

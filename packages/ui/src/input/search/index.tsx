import { cx } from "class-variance-authority";
import React, { forwardRef, ReactElement } from "react";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import { inputStyles } from "../commons";

export interface SearchInputProps {
    onChange: () => void;
    id: string;
    className?: {
        root?: string;
        iconWrapper?: string;
        icon?: string;
        input?: string;
    };
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    function SearchInput(
        { id, className, onChange, ...rest },
        ref
    ): ReactElement {
        return (
            <div
                className={cx(
                    "cui-relative cui-w-full md:cui-w-fit",
                    className?.root
                )}
            >
                <div
                    className={cx(
                        "cui-absolute cui-top-3 cui-left-3 dark:cui-text-white",
                        className?.iconWrapper
                    )}
                >
                    <SearchIcon className={className?.icon} />
                </div>
                <input
                    id={id}
                    type="search"
                    ref={ref}
                    className={cx(
                        inputStyles(),
                        "cui-pl-12 cui-w-full",
                        className?.input
                    )}
                    placeholder="Search by name"
                    onChange={onChange}
                    {...rest}
                />
            </div>
        );
    }
);

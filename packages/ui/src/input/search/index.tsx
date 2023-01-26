import { cx } from "class-variance-authority";
import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import { inputStyles } from "../commons";

export interface SearchInputProps {
    onChange: () => void;
    className?: {
        root?: string;
        iconWrapper?: string;
        icon?: string;
        input?: string;
    };
}

export const SearchInput = ({ onChange, className }: SearchInputProps) => (
    <div
        className={cx("cui-relative cui-w-full md:cui-w-fit", className?.root)}
    >
        <div
            className={cx(
                "cui-absolute cui-top-3 cui-left-3",
                className?.iconWrapper
            )}
        >
            <SearchIcon className={className?.icon} />
        </div>
        <input
            onChange={onChange}
            type="search"
            className={cx(
                inputStyles(),
                "cui-pl-12 cui-w-full",
                className?.input
            )}
            placeholder="Search by name"
        />
    </div>
);

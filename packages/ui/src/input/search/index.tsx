import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import { inputStyles } from "../commons";

export interface SearchInputProps {
    onChange: () => void;
}

export const SearchInput = ({ onChange }: SearchInputProps) => (
    <div className="cui-relative cui-w-full md:cui-w-fit">
        <div className="cui-absolute cui-top-3 cui-left-3">
            <SearchIcon />
        </div>
        <input
            onChange={onChange}
            type="search"
            className={inputStyles({ className: "cui-pl-12 cui-w-full" })}
            placeholder="Search by name"
        />
    </div>
);

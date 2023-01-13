import React from "react";
import { TextMono } from "@carrot-kpi/ui";

const CheckboxInput = ({ title }: { title: string }) => (
    <div className="flex items-center space-x-2">
        <input type="checkbox" name={title} id={title} className="w-5 h-5" />
        <TextMono>{title}</TextMono>
    </div>
);

export const CheckOption = ({
    title,
    total,
}: {
    title: string;
    total: number;
}) => (
    <label className="flex items-center justify-between cursor-pointer">
        <CheckboxInput title={title} />
        <TextMono size="sm">{total}</TextMono>
    </label>
);

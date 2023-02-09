import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { SearchInput as SearchInputComponent, SearchInputProps } from ".";

export default {
    title: "Input/Search",
    component: SearchInputComponent,
} as ComponentMeta<typeof SearchInputComponent>;

const Template: Story<SearchInputProps> = (props: SearchInputProps) => (
    <SearchInputComponent {...props} />
);

export const Search: Story<SearchInputProps> = Template.bind({});

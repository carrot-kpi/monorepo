import { Select, SelectOption } from "@carrot-kpi/ui";
import React, { useState } from "react";

export const CampaignsTopNav = ({
    toggleFilters,
}: {
    toggleFilters: () => void;
}) => {
    const [campaignsOrder, setCampaignsOrder] = useState<SelectOption>({
        value: 1,
        label: "Latest",
    });
    const [campaignsState, setCampaignState] = useState<SelectOption>({
        value: 1,
        label: "Active",
    });

    return (
        <div className="flex px-6 py-6 bg-white border-t border-b border-gray-400 md:px-12 dark:bg-black">
            <div className="flex flex-col items-center justify-between w-full md:flex-row">
                <div className="flex flex-col w-full md:space-x-5 md:flex-row">
                    <div className="flex mb-4 space-x-5 md:mb-0">
                        <div
                            className="p-3 border rounded-xl "
                            onClick={toggleFilters}
                        >
                            FY
                        </div>
                        <Select
                            label=""
                            id="campaigns-filter-order"
                            onChange={setCampaignsOrder}
                            options={[
                                {
                                    label: "Latest",
                                    value: 1,
                                },
                                {
                                    label: "Newest",
                                    value: 2,
                                },
                            ]}
                            placeholder="Latest"
                            value={campaignsOrder}
                        />
                    </div>
                    <div className="flex flex-row-reverse mb-4 md:flex-row md:space-x-5 md:mb-0">
                        <Select
                            label=""
                            id="campaigns-filter-state"
                            onChange={setCampaignState}
                            options={[
                                {
                                    label: "Active",
                                    value: 1,
                                },
                                {
                                    label: "Inactive",
                                    value: 2,
                                },
                            ]}
                            placeholder="Latest"
                            value={campaignsState}
                        />
                        <div className="p-3 mr-5 border rounded-xl">MY</div>
                    </div>
                </div>
                <input
                    type="search"
                    className="w-full p-2 border rounded md:w-auto"
                    placeholder="Search by name"
                />
            </div>
        </div>
    );
};

import React from "react";

export const TemplatesTopNav = ({
    toggleFilters,
}: {
    toggleFilters: () => void;
}) => {
    return (
        <div className="flex px-6 py-6 bg-white border-t border-b border-gray-400 md:px-12">
            <div className="flex flex-col items-center justify-between w-full md:flex-row">
                <div className="flex flex-col w-full md:space-x-5 md:flex-row">
                    <div className="flex mb-4 space-x-5 md:mb-0">
                        <div
                            className="p-3 border rounded-xl "
                            onClick={toggleFilters}
                        >
                            FY
                        </div>
                        <div className="flex-grow p-3 border md:flex-initial rounded-xl">
                            Latest
                        </div>
                    </div>
                    <div className="flex flex-row-reverse mb-4 md:flex-row md:space-x-5 md:mb-0">
                        <div className="flex-grow p-3 border rounded-xl md:flex-initial">
                            Active
                        </div>
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

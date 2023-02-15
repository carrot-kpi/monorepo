import { Loader } from "@carrot-kpi/ui";
import React from "react";

export const KPITokenPageLoading = () => (
    <div className="flex items-center justify-center mt-64 mb-80 text-orange">
        <Loader className="w-28 md:w-full" />
    </div>
);

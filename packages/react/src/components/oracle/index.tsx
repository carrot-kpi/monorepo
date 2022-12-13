import React, { ReactNode } from "react";
import { ReactElement } from "react";
import { TemplateComponent } from "../template-component";
import { useOracle } from "../../hooks/useOracle";

interface OracleProps {
    fallback: ReactNode;
    address?: string;
}

export function Oracle({ address, fallback }: OracleProps): ReactElement {
    const { loading, oracle } = useOracle(address);

    if (loading || !oracle) return <>{fallback}</>;
    return (
        <TemplateComponent
            type="page"
            template={oracle.template}
            fallback={fallback}
            props={{ oracle }}
        />
    );
}

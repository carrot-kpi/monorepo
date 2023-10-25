import {
    useSetDevMode,
    useSetIPFSGatewayURL,
    useSetKPITokenTemplateBaseURL,
    useSetOracleTemplateBaseURL,
    useSetStagingMode,
} from "@carrot-kpi/react";

interface LibraryModeSharedStateUpdaterProps {
    ipfsGatewayURL: string;
    kpiTokenTemplateBaseURL?: string;
    oracleTemplateBaseURL?: string;
    enableStagingMode?: boolean;
}

export const LibraryModeSharedStateUpdater = ({
    kpiTokenTemplateBaseURL,
    oracleTemplateBaseURL,
    ipfsGatewayURL,
    enableStagingMode = false,
}: LibraryModeSharedStateUpdaterProps) => {
    const setDevMode = useSetDevMode();
    const setStagingMode = useSetStagingMode();
    const setIPFSGatewayURL = useSetIPFSGatewayURL();
    const setKPITokenTemplateBaseURL = useSetKPITokenTemplateBaseURL();
    const setOracleTemplateBaseURL = useSetOracleTemplateBaseURL();

    setDevMode(true);
    setStagingMode(enableStagingMode);
    setIPFSGatewayURL(ipfsGatewayURL);
    setKPITokenTemplateBaseURL(kpiTokenTemplateBaseURL);
    setOracleTemplateBaseURL(oracleTemplateBaseURL);

    return null;
};

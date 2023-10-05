import {
    useSetDevMode,
    useSetIPFSGatewayURL,
    useSetKPITokenTemplateBaseURL,
    useSetOracleTemplateBaseURL,
    useSetStagingMode,
} from "@carrot-kpi/react";

interface LibraryModeSharedStateUpdaterProps {
    ipfsGatewayURL: string;
    kpiTokenTemplateBaseURL: string;
    oracleTemplateBaseURL: string;
}

export const LibraryModeSharedStateUpdater = ({
    kpiTokenTemplateBaseURL,
    oracleTemplateBaseURL,
    ipfsGatewayURL,
}: LibraryModeSharedStateUpdaterProps) => {
    const setDevMode = useSetDevMode();
    const setStagingMode = useSetStagingMode();
    const setIPFSGatewayURL = useSetIPFSGatewayURL();
    const setKPITokenTemplateBaseURL = useSetKPITokenTemplateBaseURL();
    const setOracleTemplateBaseURL = useSetOracleTemplateBaseURL();

    setDevMode(true);
    setStagingMode(false);
    setIPFSGatewayURL(ipfsGatewayURL);
    setKPITokenTemplateBaseURL(kpiTokenTemplateBaseURL);
    setOracleTemplateBaseURL(oracleTemplateBaseURL);

    return null;
};

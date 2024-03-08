import {
    useSetDevMode,
    useSetIPFSGatewayURL,
    useSetKPITokenTemplateBaseURL,
    useSetOracleTemplateBaseURL,
    useSetTemplatePreviewMode,
} from "@carrot-kpi/react";

interface LibraryModeSharedStateUpdaterProps {
    ipfsGatewayURL: string;
    kpiTokenTemplateBaseURL?: string;
    oracleTemplateBaseURL?: string;
    enableTemplatePreviewMode?: boolean;
}

export const LibraryModeSharedStateUpdater = ({
    kpiTokenTemplateBaseURL,
    oracleTemplateBaseURL,
    ipfsGatewayURL,
    enableTemplatePreviewMode = false,
}: LibraryModeSharedStateUpdaterProps) => {
    const setDevMode = useSetDevMode();
    const setTemplatePreviewMode = useSetTemplatePreviewMode();
    const setIPFSGatewayURL = useSetIPFSGatewayURL();
    const setKPITokenTemplateBaseURL = useSetKPITokenTemplateBaseURL();
    const setOracleTemplateBaseURL = useSetOracleTemplateBaseURL();

    setDevMode(true);
    setTemplatePreviewMode(enableTemplatePreviewMode);
    setIPFSGatewayURL(ipfsGatewayURL);
    setKPITokenTemplateBaseURL(kpiTokenTemplateBaseURL);
    setOracleTemplateBaseURL(oracleTemplateBaseURL);

    return null;
};

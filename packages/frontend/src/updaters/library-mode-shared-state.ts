import {
    useSetEnvironment,
    useSetIPFSGatewayURL,
    useSetKPITokenTemplateBaseURL,
    useSetOracleTemplateBaseURL,
    useSetTemplatePreviewMode,
} from "@carrot-kpi/react";
import { Environment } from "@carrot-kpi/shared-state";

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
    const setEnvironment = useSetEnvironment();
    const setTemplatePreviewMode = useSetTemplatePreviewMode();
    const setIPFSGatewayURL = useSetIPFSGatewayURL();
    const setKPITokenTemplateBaseURL = useSetKPITokenTemplateBaseURL();
    const setOracleTemplateBaseURL = useSetOracleTemplateBaseURL();

    setEnvironment(Environment.Local);
    setTemplatePreviewMode(enableTemplatePreviewMode);
    setIPFSGatewayURL(ipfsGatewayURL);
    setKPITokenTemplateBaseURL(kpiTokenTemplateBaseURL);
    setOracleTemplateBaseURL(oracleTemplateBaseURL);

    return null;
};

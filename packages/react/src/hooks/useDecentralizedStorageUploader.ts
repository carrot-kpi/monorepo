import { useSelector, type State } from "@carrot-kpi/shared-state";
import { Service, getServiceURL } from "@carrot-kpi/sdk/utils/services";
import { useDevMode } from "./useDevMode";
import { useStagingMode } from "./useStagingMode";

export type DecentralizedStorageOption = "ipfs";
export type Uploader = (content: string) => Promise<string>;

const localUploader: Uploader = async (content: string): Promise<string> => {
    const formData = new FormData();
    formData.append(
        "file",
        new File([content], "carrot-content", { type: "text/plain" }),
    );
    const response = await fetch("http://localhost:5002/api/v0/add", {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: formData,
    });
    if (!response.ok)
        throw new Error(
            `could not upload content to ipfs, request failed with status ${response.status}`,
        );
    const { Hash } = (await response.json()) as { Hash: string };
    return Hash;
};

export const useDecentralizedStorageUploader = (): Uploader => {
    const devMode = useDevMode();
    const stagingMode = useStagingMode();
    const pinningProxyJWT = useSelector<
        State,
        State["auth"]["pinningProxyJWT"]
    >((state) => state.auth.pinningProxyJWT);

    const remoteUploader = async (content: string): Promise<string> => {
        const response = await fetch(
            `${getServiceURL(
                Service.PINNING_PROXY,
                !devMode && !stagingMode,
            )}/pins`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${pinningProxyJWT}`,
                },
                body: JSON.stringify({
                    content: btoa(content),
                }),
            },
        );
        if (!response.ok)
            throw new Error(
                `could not upload content to ipfs, request failed with status ${response.status}`,
            );
        const { cid } = (await response.json()) as { cid: string };
        return cid;
    };

    return devMode ? localUploader : remoteUploader;
};

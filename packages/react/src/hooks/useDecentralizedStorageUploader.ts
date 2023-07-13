import { useSelector, type State } from "@carrot-kpi/shared-state";
import { useDevMode } from "./useDevMode";

export type DecentralizedStorageOption = "ipfs";
export type Uploader = (content: string) => Promise<string>;

const localUploader: Uploader = async (content: string): Promise<string> => {
    const formData = new FormData();
    formData.append(
        "file",
        new File([content], "carrot-content", { type: "text/plain" })
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
            `could not upload content to ipfs, request failed with status ${response.status}`
        );
    const { Hash } = (await response.json()) as { Hash: string };
    return Hash;
};

export const useDecentralizedStorageUploader = (): Uploader => {
    const devMode = useDevMode();
    const pinningProxyJWT = useSelector<
        State,
        State["auth"]["pinningProxyJWT"]
    >((state) => state.auth.pinningProxyJWT);

    const remoteUploader = async (content: string): Promise<string> => {
        const response = await fetch(
            "https://pinning-proxy.carrot-kpi.dev/pins",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${pinningProxyJWT}`,
                },
                body: JSON.stringify({
                    content: JSON.stringify(btoa(content)),
                }),
            }
        );
        if (!response.ok)
            throw new Error(
                `could not upload content to ipfs, request failed with status ${response.status}`
            );
        const { cid } = (await response.json()) as { cid: string };
        return cid;
    };

    return devMode ? localUploader : remoteUploader;
};

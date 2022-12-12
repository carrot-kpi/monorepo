import { KpiTokenSpecification } from "@carrot-kpi/sdk";

export type UploadableSpecification = Omit<KpiTokenSpecification, "ipfsHash">;
export type DecentralizedStorageOption = "ipfs" | "playground";
export type SpecificationUploader = (
    specification: UploadableSpecification
) => Promise<string>;

const WEB3_STORAGE_API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNBNzU3RjVlNzUyRUE1M2IwYTE1QzA3MDJhODcyMTFjOUJGQTM5N0QiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDE4NDI5NTIzOTEsIm5hbWUiOiJqb2x0LXByZXZpZXctYnVpbGRzIn0.GMPv4WC8q-CIyCRjkIgG2EV2DnmD10bXd7sZoMcEVrs";

const SPECIFICATION_UPLOADER: Record<
    DecentralizedStorageOption,
    SpecificationUploader
> = {
    ipfs: async (specification: UploadableSpecification): Promise<string> => {
        const formData = new FormData();
        formData.append(
            "file",
            new File([JSON.stringify(specification)], "specification", {
                type: "text/plain",
            })
        );
        const response = await fetch("https://api.web3.storage/upload", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${WEB3_STORAGE_API_TOKEN}`,
                "X-Client": "carrot-kpi/js",
            },
            body: formData,
        });
        if (!response.ok)
            throw new Error(
                `could not upload file to ipfs, request failed with status ${response.status}`
            );
        const { cid } = (await response.json()) as { cid: string };
        return cid;
    },
    playground: async (
        specification: UploadableSpecification
    ): Promise<string> => {
        const formData = new FormData();
        formData.append(
            "file",
            new File([JSON.stringify(specification)], "specification", {
                type: "text/plain",
            })
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
                `could not upload file to ipfs, request failed with status ${response.status}`
            );
        const { Hash } = (await response.json()) as { Hash: string };
        return Hash;
    },
};

export const useDecentralizedStorageUploader = (
    decentralizedStorage: DecentralizedStorageOption
): SpecificationUploader => {
    return SPECIFICATION_UPLOADER[decentralizedStorage];
};

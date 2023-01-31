import {
    Address,
    BigInt,
    Bytes,
    ipfs,
    json,
    log,
} from "@graphprotocol/graph-ts";

export const ADDRESS_ZERO = Address.fromHexString(
    "0x0000000000000000000000000000000000000000"
);
export const ADDRESS_ONE = Address.fromHexString(
    "0x0000000000000000000000000000000000000001"
);
export const BI_0 = BigInt.fromI32(0);
export const BI_1 = BigInt.fromI32(1);

export const CONTEXT_KEY_KPI_TOKENS_MANAGER_BYTES_ADDRESS =
    "KPI_TOKENS_MANAGER_BYTES_ADDRESS";
export const CONTEXT_KEY_ORACLES_MANAGER_BYTES_ADDRESS =
    "ORACLES_MANAGER_BYTES_ADDRESS";

export function addressToBytes(address: Address): Bytes {
    return Bytes.fromHexString(address.toHex());
}

export function templateId(
    managerAddress: Address,
    onChainId: BigInt,
    onChainVersion: BigInt
): Bytes {
    return Bytes.fromHexString(
        managerAddress
            .toHex()
            .concat(onChainId.toHex().concat(onChainVersion.toHex()))
    );
}

export class TemplateSpecification {
    name: string;
    description: string;
    tags: string[];
    repository: string;
    commitHash: string;

    constructor(
        name: string,
        description: string,
        tags: string[],
        repository: string,
        commitHash: string
    ) {
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.repository = repository;
        this.commitHash = commitHash;
    }
}

export function cidToSpecification(cid: string): TemplateSpecification | null {
    const specificationBytes = ipfs.cat(
        cid.endsWith("/") ? cid.concat("base.json") : cid.concat("/base.json")
    );
    if (specificationBytes === null) {
        log.error("specification bytes is null for cid {}", [cid]);
        return null;
    }
    const specificationJson = json.fromBytes(specificationBytes);
    if (specificationJson.isNull()) {
        log.error("specification json is null for cid {}", [cid]);
        return null;
    }

    const specificationObject = specificationJson.toObject();
    const commitHash = specificationObject.get("commitHash");
    if (commitHash === null) {
        log.error("commit hash is null for cid {}", [cid]);
        return null;
    }

    const name = specificationObject.get("name");
    if (name === null) {
        log.error("name is null for cid {}", [cid]);
        return null;
    }

    const description = specificationObject.get("description");
    if (description === null) {
        log.error("description is null for cid {}", [cid]);
        return null;
    }

    const tags = specificationObject.get("tags");
    if (tags === null) {
        log.error("tags is null for cid {}", [cid]);
        return null;
    }

    const repository = specificationObject.get("repository");
    if (repository === null) {
        log.error("repository is null for cid {}", [cid]);
        return null;
    }

    const tagsArray = tags.toArray();
    const convertedTagsArray: string[] = [];
    for (let i = 0; i < tagsArray.length; i++) {
        convertedTagsArray.push(tagsArray[i].toString());
    }

    return new TemplateSpecification(
        name.toString(),
        description.toString(),
        convertedTagsArray,
        repository.toString(),
        commitHash.toString()
    );
}

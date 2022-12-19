import {
    Address,
    BigInt,
    Bytes,
    ipfs,
    json,
    log,
} from "@graphprotocol/graph-ts";
import { Template } from "../generated/schema";

export function templateId(onChainId: BigInt, onChainVersion: BigInt): Bytes {
    return Bytes.fromHexString(
        onChainId.toHex().concat(onChainVersion.toHex())
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

export function createTemplate(
    id: BigInt,
    version: BigInt,
    address: Address,
    specificationCid: string
): Template | null {
    const specification = cidToSpecification(specificationCid);
    if (specification === null) {
        log.error("could not get specification for cid {}", [specificationCid]);
        return null;
    }

    const template = new Template(templateId(id, version));
    template.address = address;
    template.version = version;

    template.name = specification.name;
    template.description = specification.description;
    template.tags = specification.tags;
    template.repository = specification.repository;
    template.commitHash = specification.commitHash;
    template.active = true;

    return template;
}

export function getTemplate(id: BigInt, version: BigInt): Template | null {
    return Template.load(templateId(id, version));
}

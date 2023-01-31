import { Address, dataSource, ipfs, json, log } from "@graphprotocol/graph-ts";
import {
    Initialize as InitializeEvent,
    Finalize as FinalizeEvent,
    KPIToken as KPITokenContract,
} from "../generated/templates/KPIToken/KPIToken";
import { KPIToken } from "../generated/schema";
import { Oracle as OracleTemplate } from "../generated/templates";
import {
    addressToBytes,
    CONTEXT_KEY_KPI_TOKENS_MANAGER_BYTES_ADDRESS,
    templateId,
} from "./commons";

class KPITokenDescription {
    title: string;
    description: string;
    tags: string[];

    constructor(title: string, description: string, tags: string[]) {
        this.title = title;
        this.description = description;
        this.tags = tags;
    }
}

export function cidToDescription(cid: string): KPITokenDescription | null {
    const descriptionBytes = ipfs.cat(cid);
    if (descriptionBytes === null) {
        log.error("description bytes is null for cid {}", [cid]);
        return null;
    }
    const descriptionJson = json.fromBytes(descriptionBytes);
    if (descriptionJson.isNull()) {
        log.error("description json is null for cid {}", [cid]);
        return null;
    }

    const descriptionObject = descriptionJson.toObject();
    const title = descriptionObject.get("title");
    if (title === null) {
        log.error("title is null for cid {}", [cid]);
        return null;
    }

    const description = descriptionObject.get("description");
    if (description === null) {
        log.error("description is null for cid {}", [cid]);
        return null;
    }

    const tags = descriptionObject.get("tags");
    if (tags === null) {
        log.error("tags is null for cid {}", [cid]);
        return null;
    }

    const tagsArray = tags.toArray();
    const convertedTagsArray: string[] = [];
    for (let i = 0; i < tagsArray.length; i++) {
        convertedTagsArray.push(tagsArray[i].toString());
    }

    return new KPITokenDescription(
        title.toString(),
        description.toString(),
        convertedTagsArray
    );
}

function createKPIToken(address: Address): KPIToken | null {
    const kpiToken = new KPIToken(addressToBytes(address));
    const kpiTokenContract = KPITokenContract.bind(address);
    const context = dataSource.context();

    kpiToken.owner = kpiTokenContract.owner();
    kpiToken.finalized = false;
    kpiToken.expiration = kpiTokenContract.expiration().toI32();

    const kpiTokenTemplateStruct = kpiTokenContract.template();
    const kpiTokensManagerAddress = Address.fromBytes(
        context.getBytes(CONTEXT_KEY_KPI_TOKENS_MANAGER_BYTES_ADDRESS)
    );
    kpiToken.template = templateId(
        kpiTokensManagerAddress,
        kpiTokenTemplateStruct.id,
        kpiTokenTemplateStruct.version
    );

    const descriptionCid = kpiTokenContract.description();
    const description = cidToDescription(descriptionCid);
    if (description === null) {
        log.error("could not get description for cid {}", [descriptionCid]);
        return null;
    }
    kpiToken.descriptionCid = descriptionCid;
    kpiToken.title = description.title;
    kpiToken.description = description.description;
    kpiToken.tags = description.tags;

    const oracleAddresses = kpiTokenContract.oracles();
    for (let i = 0; i < oracleAddresses.length; i++) {
        const oracleAddress = oracleAddresses[i];
        OracleTemplate.create(oracleAddress);
        kpiToken.oracles.push(addressToBytes(oracleAddress));
    }

    return kpiToken;
}

export function handleInitialize(event: InitializeEvent): void {
    const kpiToken = createKPIToken(event.address);
    if (kpiToken === null) {
        log.error("could not create kpi token with address {}", [
            event.address.toString(),
        ]);
        return;
    }
    kpiToken.save();
}

export function handleFinalize(event: FinalizeEvent): void {
    const kpiToken = KPIToken.load(addressToBytes(event.address));
    if (kpiToken === null) {
        log.error("could not find finalized kpi token with address", [
            event.address.toString(),
        ]);
        return;
    }
    kpiToken.finalized = true;
    kpiToken.save();
}

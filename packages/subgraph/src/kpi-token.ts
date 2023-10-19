import { Address, Bytes } from "@graphprotocol/graph-ts";
import {
    Initialize as InitializeEvent,
    OwnershipTransferred as OwnershipTransferredEvent,
    Finalize as FinalizeEvent,
} from "../generated/templates/KPIToken/KPIToken";
import { KPIToken } from "../generated/schema";
import { KPITokenDescription, Oracle } from "../generated/templates";
import { addressToBytes, templateId } from "./commons";

export function getKPIToken(address: Address): KPIToken {
    const kpiToken = KPIToken.load(address);
    if (kpiToken === null)
        throw new Error(
            "could not find kpi token with address " + address.toHex(),
        );
    return kpiToken;
}

export function handleInitialize(event: InitializeEvent): void {
    const kpiToken = new KPIToken(addressToBytes(event.address));

    kpiToken.owner = event.params.creator;
    kpiToken.finalized = false;
    kpiToken.expiration = event.params.expiration;
    kpiToken.creationTimestamp = event.params.creationTimestamp;

    kpiToken.template = templateId(
        event.params.templateId,
        event.params.templateVersion,
    );

    const descriptionCid = event.params.description;
    KPITokenDescription.create(descriptionCid);
    kpiToken.descriptionCid = descriptionCid;
    kpiToken.description = Bytes.fromUTF8(descriptionCid);

    const oracleAddresses = event.params.oracles;
    for (let i = 0; i < oracleAddresses.length; i++)
        Oracle.create(oracleAddresses[i]);

    kpiToken.save();
}

export function handleOwnershipTransferred(
    event: OwnershipTransferredEvent,
): void {
    const kpiToken = getKPIToken(event.address);
    kpiToken.owner = event.params.newOwner;
    kpiToken.save();
}

export function handleFinalize(event: FinalizeEvent): void {
    const kpiToken = getKPIToken(event.address);
    kpiToken.finalized = true;
    kpiToken.progress = event.params.progress;
    kpiToken.save();
}

import { Address, Bytes, dataSource, log } from "@graphprotocol/graph-ts";
import {
    Initialize as InitializeEvent,
    Finalize as FinalizeEvent,
    KPIToken as KPITokenContract,
} from "../generated/templates/KPIToken/KPIToken";
import { KPIToken } from "../generated/schema";
import { KPITokenDescription, Oracle } from "../generated/templates";
import {
    addressToBytes,
    CONTEXT_KEY_KPI_TOKENS_MANAGER_BYTES_ADDRESS,
    templateId,
} from "./commons";

export function handleInitialize(event: InitializeEvent): void {
    const kpiToken = new KPIToken(addressToBytes(event.address));
    const kpiTokenContract = KPITokenContract.bind(event.address);
    const context = dataSource.context();

    kpiToken.owner = kpiTokenContract.owner();
    kpiToken.finalized = false;
    kpiToken.expiration = kpiTokenContract.expiration();
    kpiToken.creationTimestamp = kpiTokenContract.creationTimestamp();

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
    KPITokenDescription.create(descriptionCid);
    kpiToken.descriptionCid = descriptionCid;
    kpiToken.description = Bytes.fromUTF8(descriptionCid);

    const oracleAddresses = kpiTokenContract.oracles();
    for (let i = 0; i < oracleAddresses.length; i++)
        // context contains the oracles manager address passed in from the factory
        Oracle.createWithContext(oracleAddresses[i], context);

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

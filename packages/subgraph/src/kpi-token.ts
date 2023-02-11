import { Address, Bytes, dataSource, log } from "@graphprotocol/graph-ts";
import {
    Initialize as InitializeEvent,
    Finalize as FinalizeEvent,
    KPIToken as KPITokenContract,
} from "../generated/templates/KPIToken/KPIToken";
import { KPIToken } from "../generated/schema";
import {
    KPITokenDescription,
    Oracle as OracleTemplate,
} from "../generated/templates";
import {
    addressToBytes,
    CONTEXT_KEY_KPI_TOKENS_MANAGER_BYTES_ADDRESS,
    templateId,
} from "./commons";

function createKPIToken(address: Address): KPIToken | null {
    const kpiToken = new KPIToken(addressToBytes(address));
    const kpiTokenContract = KPITokenContract.bind(address);
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

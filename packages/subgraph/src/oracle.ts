import { Address, dataSource, log } from "@graphprotocol/graph-ts";
import {
    Initialize as InitializeEvent,
    Finalize as FinalizeEvent,
    Oracle as OracleContract,
} from "../generated/templates/Oracle/Oracle";
import { Oracle } from "../generated/schema";
import {
    addressToBytes,
    CONTEXT_KEY_ORACLES_MANAGER_BYTES_ADDRESS,
    templateId,
} from "./commons";

export function handleInitialize(event: InitializeEvent): void {
    const oracle = new Oracle(addressToBytes(event.address));
    const oracleContract = OracleContract.bind(event.address);
    const context = dataSource.context();

    oracle.kpiToken = addressToBytes(oracleContract.kpiToken());
    oracle.finalized = false;

    const oracleTemplateStruct = oracleContract.template();
    const oraclesManagerAddress = Address.fromBytes(
        context.getBytes(CONTEXT_KEY_ORACLES_MANAGER_BYTES_ADDRESS)
    );
    oracle.template = templateId(
        oraclesManagerAddress,
        oracleTemplateStruct.id,
        oracleTemplateStruct.version
    );
    oracle.save();
}

export function handleFinalize(event: FinalizeEvent): void {
    const oracle = Oracle.load(addressToBytes(event.address));
    if (oracle === null) {
        log.error("could not find finalized oracle with address", [
            event.address.toString(),
        ]);
        return;
    }
    oracle.finalized = true;
    oracle.save();
}

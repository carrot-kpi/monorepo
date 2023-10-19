import { log } from "@graphprotocol/graph-ts";
import {
    Initialize as InitializeEvent,
    Finalize as FinalizeEvent,
} from "../generated/templates/Oracle/Oracle";
import { Oracle } from "../generated/schema";
import { addressToBytes, templateId } from "./commons";

export function handleInitialize(event: InitializeEvent): void {
    const oracle = new Oracle(addressToBytes(event.address));

    oracle.kpiToken = addressToBytes(event.params.kpiToken);
    oracle.finalized = false;

    oracle.template = templateId(
        event.params.templateId,
        event.params.templateVersion,
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

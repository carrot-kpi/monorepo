import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import {
    AddTemplate as AddTemplateEvent,
    OraclesManager1 as KPITokensManager1Contract,
    OwnershipTransferred as OwnershipTransferredEvent,
    RemoveTemplate as RemoveTemplateEvent,
    UpdateTemplateSpecification as UpdateTemplateSpecificationEvent,
    UpgradeTemplate as UpgradeTemplateEvent,
} from "../generated/OraclesManager1/OraclesManager1";
import { OraclesManager } from "../generated/schema";
import { createTemplate, getTemplate } from "./commons";
import { cidToSpecification } from "./commons";

function getKPITokensManager1(address: Address): OraclesManager {
    const id = Bytes.fromHexString(address.toHex());
    let manager = OraclesManager.load(id);
    if (manager === null) {
        manager = new OraclesManager(id);
        manager.templatesAmount = BigInt.fromU32(0);
        manager.owner = KPITokensManager1Contract.bind(address).owner();
        manager.templates = new Array();
    }
    return manager;
}

export function handleAddTemplate(event: AddTemplateEvent): void {
    const template = createTemplate(
        event.params.id,
        BigInt.fromU32(1),
        event.params.template,
        event.params.specification
    );
    if (template === null) {
        log.error("could not create template with id {}", [
            event.params.id.toString(),
        ]);
        return;
    }
    template.save();

    const manager = getKPITokensManager1(event.address);
    manager.templates.push(template.id);
    manager.templatesAmount = manager.templatesAmount.plus(BigInt.fromU32(1));
    manager.save();
}

export function handleOwnershipTransferred(
    event: OwnershipTransferredEvent
): void {
    const manager = getKPITokensManager1(event.address);
    manager.owner = event.params.newOwner;
    manager.save();
}

export function handleRemoveTemplate(event: RemoveTemplateEvent): void {
    const template = getTemplate(event.params.id, event.params.version);
    if (template === null) {
        log.error("could not find removed template with id {} and version {}", [
            event.params.id.toString(),
            event.params.version.toString(),
        ]);
        return;
    }
    template.active = true;
    template.save();
}

export function handleUpdateTemplateSpecification(
    event: UpdateTemplateSpecificationEvent
): void {
    const template = getTemplate(event.params.id, event.params.version);
    if (template === null) {
        log.error("could not find updated template with id {} and version", [
            event.params.id.toString(),
            event.params.version.toString(),
        ]);
        return;
    }

    const specificationCid = event.params.newSpecification;
    const specification = cidToSpecification(specificationCid);
    if (specification === null) {
        log.error("could not get specification for cid {}", [specificationCid]);
        return;
    }
    template.name = specification.name;
    template.description = specification.description;
    template.tags = specification.tags;
    template.repository = specification.repository;
    template.commitHash = specification.commitHash;
    template.save();
}

export function handleUpgradeTemplate(event: UpgradeTemplateEvent): void {
    const oldTemplateVersion = event.params.newVersion.minus(BigInt.fromU32(1));
    const oldTemplate = getTemplate(event.params.id, oldTemplateVersion);
    if (oldTemplate === null) {
        log.error(
            "could not deactivate upgraded template with id {} and version {}",
            [event.params.id.toString(), event.params.newVersion.toString()]
        );
        return;
    }
    oldTemplate.active = false;
    oldTemplate.save();

    const newSpecificationCid = event.params.newSpecification;
    const specification = cidToSpecification(newSpecificationCid);
    if (specification === null) {
        log.error("could not get specification for cid {}", [
            newSpecificationCid,
        ]);
        return;
    }
    const newTemplate = createTemplate(
        event.params.id,
        event.params.newVersion,
        event.params.newTemplate,
        event.params.newSpecification
    );
    if (newTemplate === null) {
        log.error(
            "could not create upgraded template with id {} and version {}",
            [event.params.id.toString(), event.params.newVersion.toString()]
        );
        return;
    }
    newTemplate.save();
}

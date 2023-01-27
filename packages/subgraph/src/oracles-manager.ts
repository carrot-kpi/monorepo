import { Address, BigInt, log } from "@graphprotocol/graph-ts";
import {
    AddTemplate as AddTemplateEvent,
    OraclesManager as OraclesManagerContract,
    OwnershipTransferred as OwnershipTransferredEvent,
    RemoveTemplate as RemoveTemplateEvent,
    UpdateTemplateSpecification as UpdateTemplateSpecificationEvent,
    UpgradeTemplate as UpgradeTemplateEvent,
} from "../generated/templates/OraclesManager/OraclesManager";
import { OraclesManager, OracleTemplate } from "../generated/schema";
import { addressToBytes, BI_0, BI_1, templateId } from "./commons";
import { cidToSpecification } from "./commons";

export function createTemplate(
    managerAddress: Address,
    id: BigInt,
    version: BigInt,
    address: Address,
    specificationCid: string
): OracleTemplate | null {
    const manager = getOraclesManager(managerAddress);
    manager.save();

    const template = new OracleTemplate(
        templateId(managerAddress, id, version)
    );
    template.address = address;
    template.managerId = id;
    template.version = version;

    const specification = cidToSpecification(specificationCid);
    if (specification === null) {
        log.error("could not get specification for cid {}", [specificationCid]);
        return null;
    }
    template.name = specification.name;
    template.description = specification.description;
    template.tags = specification.tags;
    template.repository = specification.repository;
    template.commitHash = specification.commitHash;
    template.active = true;
    template.manager = manager.id;

    return template;
}

export function getTemplate(
    managerAddress: Address,
    id: BigInt,
    version: BigInt
): OracleTemplate | null {
    return OracleTemplate.load(templateId(managerAddress, id, version));
}

export function getOraclesManager(address: Address): OraclesManager {
    const id = addressToBytes(address);
    let manager = OraclesManager.load(id);
    if (manager === null) {
        manager = new OraclesManager(id);
        const managerContract = OraclesManagerContract.bind(address);
        const templatesAmount = managerContract.templatesAmount();
        manager.templatesAmount = templatesAmount;
        const templateStructs = managerContract.enumerate(
            BI_0,
            templatesAmount
        );
        for (let i = 0; i < templateStructs.length; i++) {
            const templateStruct = templateStructs[i];
            for (
                let j = templateStructs[i].version;
                j.gt(BI_0);
                j = j.minus(BI_1)
            ) {
                const specificVersionTemplateStruct = managerContract.template1(
                    templateStruct.id,
                    j
                );
                const specificVersionTemplate = createTemplate(
                    address,
                    specificVersionTemplateStruct.id,
                    specificVersionTemplateStruct.version,
                    specificVersionTemplateStruct.addrezz,
                    specificVersionTemplateStruct.specification
                );
                if (specificVersionTemplate === null) {
                    log.error(
                        "could not create template with id {} and version {}",
                        [
                            specificVersionTemplateStruct.id.toString(),
                            specificVersionTemplateStruct.version.toString(),
                        ]
                    );
                    continue;
                }
                specificVersionTemplate.save();
            }
        }
        manager.owner = managerContract.owner();
    }
    return manager;
}

export function handleAddTemplate(event: AddTemplateEvent): void {
    const template = createTemplate(
        event.address,
        event.params.id,
        BI_1,
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

    const manager = getOraclesManager(event.address);
    manager.templatesAmount = manager.templatesAmount.plus(BI_1);
    manager.save();
}

export function handleOwnershipTransferred(
    event: OwnershipTransferredEvent
): void {
    const manager = getOraclesManager(event.address);
    manager.owner = event.params.newOwner;
    manager.save();
}

export function handleRemoveTemplate(event: RemoveTemplateEvent): void {
    const template = getTemplate(
        event.address,
        event.params.id,
        event.params.version
    );
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
    const template = getTemplate(
        event.address,
        event.params.id,
        event.params.version
    );
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
    const oldTemplateVersion = event.params.newVersion.minus(BI_1);
    const oldTemplate = getTemplate(
        event.address,
        event.params.id,
        oldTemplateVersion
    );
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
        event.address,
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

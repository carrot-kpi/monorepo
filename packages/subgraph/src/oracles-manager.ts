import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import {
    Initialize as InitializeEvent,
    AddTemplate as AddTemplateEvent,
    OwnershipTransferred as OwnershipTransferredEvent,
    RemoveTemplate as RemoveTemplateEvent,
    UpdateTemplateSpecification as UpdateTemplateSpecificationEvent,
    UpgradeTemplate as UpgradeTemplateEvent,
} from "../generated/OraclesManager/OraclesManager";
import {
    OraclesManager,
    OracleTemplate,
    OracleTemplateSet,
} from "../generated/schema";
import {
    addressToBytes,
    BI_0,
    BI_1,
    bytesToAddress,
    cidToSpecificationURI,
    getOraclesManagerAddress,
    i32ToBytes,
    templateId,
} from "./commons";
import { OracleTemplateSpecification } from "../generated/templates";

function cidToSpecification(cid: string): Bytes {
    const specificationBaseJSONCid = cidToSpecificationURI(cid);
    OracleTemplateSpecification.create(specificationBaseJSONCid);
    return Bytes.fromUTF8(specificationBaseJSONCid);
}

function createTemplate(
    managerAddress: Address,
    id: BigInt,
    version: BigInt,
    address: Address,
    specificationCid: string,
): OracleTemplate | null {
    const manager = getOraclesManager();
    manager.save();

    const template = new OracleTemplate(templateId(id, version));
    template.address = address;
    template.managerId = id;
    template.version = version;
    template.specificationCid = specificationCid;
    template.specification = cidToSpecification(specificationCid);
    template.templateSet = getTemplateSet(managerAddress, id).id;

    return template;
}

function getTemplateSet(
    managerAddress: Address,
    managerId: BigInt,
): OracleTemplateSet {
    const id = addressToBytes(managerAddress).concat(
        i32ToBytes(managerId.toI32()),
    );
    let templateSet = OracleTemplateSet.load(id);
    if (templateSet == null) {
        templateSet = new OracleTemplateSet(id);
        templateSet.manager = addressToBytes(managerAddress);
        templateSet.managerId = managerId;
        templateSet.active = true;
        templateSet.save();
    }
    return templateSet;
}

export function getTemplate(
    id: BigInt,
    version: BigInt,
): OracleTemplate | null {
    return OracleTemplate.load(templateId(id, version));
}

export function getOraclesManager(): OraclesManager {
    const address = getOraclesManagerAddress();
    const manager = OraclesManager.load(address);
    if (manager === null)
        throw new Error(
            "could not find oracles manager with address " + address.toHex(),
        );
    return manager;
}

export function handleInitialize(event: InitializeEvent): void {
    const address = getOraclesManagerAddress();
    if (event.address != address)
        throw new Error(
            "oracles manager address mismatch: got " +
                event.address.toHex() +
                ", expected " +
                address.toHex(),
        );

    const manager = new OraclesManager(address);
    manager.owner = event.params.owner;
    manager.templatesAmount = BI_0;
    manager.save();
}

export function handleAddTemplate(event: AddTemplateEvent): void {
    const template = createTemplate(
        event.address,
        event.params.id,
        BI_1,
        event.params.template,
        event.params.specification,
    );
    if (template === null) {
        log.error("could not create template with id {}", [
            event.params.id.toString(),
        ]);
        return;
    }
    template.save();

    const manager = getOraclesManager();
    manager.templatesAmount = manager.templatesAmount.plus(BI_1);
    manager.save();
}

export function handleOwnershipTransferred(
    event: OwnershipTransferredEvent,
): void {
    const manager = getOraclesManager();
    manager.owner = event.params.newOwner;
    manager.save();
}

export function handleRemoveTemplate(event: RemoveTemplateEvent): void {
    const templateSet = getTemplateSet(
        bytesToAddress(event.address),
        event.params.id,
    );
    if (templateSet === null) {
        log.error("could not find removed template set with id {}", [
            event.params.id.toString(),
        ]);
        return;
    }
    templateSet.active = false;
    templateSet.save();

    const manager = getOraclesManager();
    manager.templatesAmount = manager.templatesAmount.minus(BI_1);
    manager.save();
}

export function handleUpdateTemplateSpecification(
    event: UpdateTemplateSpecificationEvent,
): void {
    const template = getTemplate(event.params.id, event.params.version);
    if (template === null) {
        log.error("could not find updated template with id {} and version {}", [
            event.params.id.toString(),
            event.params.version.toString(),
        ]);
        return;
    }
    template.specificationCid = event.params.newSpecification;
    template.specification = cidToSpecification(event.params.newSpecification);
    template.save();
}

export function handleUpgradeTemplate(event: UpgradeTemplateEvent): void {
    const newTemplate = createTemplate(
        event.address,
        event.params.id,
        event.params.newVersion,
        event.params.newTemplate,
        event.params.newSpecification,
    );
    if (newTemplate === null) {
        log.error(
            "could not create upgraded template with id {} and version {}",
            [event.params.id.toString(), event.params.newVersion.toString()],
        );
        return;
    }
    newTemplate.save();
}

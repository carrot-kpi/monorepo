import { newMockEvent } from "matchstick-as";
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";
import {
    AddTemplate,
    OwnershipTransferred,
    RemoveTemplate,
    UpdateTemplateSpecification,
    UpgradeTemplate,
} from "../../generated/KPITokensManager1/KPITokensManager1";

export function createAddTemplateEvent(
    id: BigInt,
    template: Address,
    specification: string
): AddTemplate {
    const addTemplateEvent = changetype<AddTemplate>(newMockEvent());
    addTemplateEvent.parameters = new Array();
    addTemplateEvent.parameters.push(
        new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
    );
    addTemplateEvent.parameters.push(
        new ethereum.EventParam(
            "template",
            ethereum.Value.fromAddress(template)
        )
    );
    addTemplateEvent.parameters.push(
        new ethereum.EventParam(
            "specification",
            ethereum.Value.fromString(specification)
        )
    );
    return addTemplateEvent;
}

export function createOwnershipTransferredEvent(
    previousOwner: Address,
    newOwner: Address
): OwnershipTransferred {
    const ownershipTransferredEvent = changetype<OwnershipTransferred>(
        newMockEvent()
    );
    ownershipTransferredEvent.parameters = new Array();
    ownershipTransferredEvent.parameters.push(
        new ethereum.EventParam(
            "previousOwner",
            ethereum.Value.fromAddress(previousOwner)
        )
    );
    ownershipTransferredEvent.parameters.push(
        new ethereum.EventParam(
            "newOwner",
            ethereum.Value.fromAddress(newOwner)
        )
    );
    return ownershipTransferredEvent;
}

export function createRemoveTemplateEvent(
    id: BigInt,
    newVersion: BigInt
): RemoveTemplate {
    const removeTemplateEvent = changetype<RemoveTemplate>(newMockEvent());
    removeTemplateEvent.parameters = new Array();
    removeTemplateEvent.parameters.push(
        new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
    );
    removeTemplateEvent.parameters.push(
        new ethereum.EventParam(
            "newVersion",
            ethereum.Value.fromUnsignedBigInt(newVersion)
        )
    );
    return removeTemplateEvent;
}

export function createUpdateTemplateSpecificationEvent(
    id: BigInt,
    newVersion: BigInt,
    newSpecification: string
): UpdateTemplateSpecification {
    const updateTemplateSpecificationEvent =
        changetype<UpdateTemplateSpecification>(newMockEvent());
    updateTemplateSpecificationEvent.parameters = new Array();
    updateTemplateSpecificationEvent.parameters.push(
        new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
    );
    updateTemplateSpecificationEvent.parameters.push(
        new ethereum.EventParam(
            "newVersion",
            ethereum.Value.fromUnsignedBigInt(newVersion)
        )
    );
    updateTemplateSpecificationEvent.parameters.push(
        new ethereum.EventParam(
            "newSpecification",
            ethereum.Value.fromString(newSpecification)
        )
    );
    return updateTemplateSpecificationEvent;
}

export function createUpgradeTemplateEvent(
    id: BigInt,
    newTemplate: Address,
    newVersion: BigInt,
    newSpecification: string
): UpgradeTemplate {
    const upgradeTemplateEvent = changetype<UpgradeTemplate>(newMockEvent());
    upgradeTemplateEvent.parameters = new Array();
    upgradeTemplateEvent.parameters.push(
        new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
    );
    upgradeTemplateEvent.parameters.push(
        new ethereum.EventParam(
            "newTemplate",
            ethereum.Value.fromAddress(newTemplate)
        )
    );
    upgradeTemplateEvent.parameters.push(
        new ethereum.EventParam(
            "newVersion",
            ethereum.Value.fromUnsignedBigInt(newVersion)
        )
    );
    upgradeTemplateEvent.parameters.push(
        new ethereum.EventParam(
            "newSpecification",
            ethereum.Value.fromString(newSpecification)
        )
    );

    return upgradeTemplateEvent;
}

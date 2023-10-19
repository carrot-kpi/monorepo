import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
    Initialize as InitializeEvent,
    CreateToken as CreateTokenEvent,
    OwnershipTransferred as OwnershipTransferredEvent,
    SetPermissionless as SetPermissionlessEvent,
    UpdateCreatorAllowance as UpdateCreatorAllowanceEvent,
    SetFeeReceiver as SetFeeReceiverEvent,
} from "../generated/Factory/Factory";
import { Factory } from "../generated/schema";
import { KPIToken as KPITokenTemplate } from "../generated/templates";
import {
    addressToBytes,
    BI_1,
    getFactoryAddress,
    getKPITokensManagerAddress,
    getOraclesManagerAddress,
} from "./commons";

export function getFactory(): Factory {
    const address = getFactoryAddress();
    const factory = Factory.load(address);
    if (factory === null) throw new Error("could not find factory");
    return factory;
}

export function handleInitialize(event: InitializeEvent): void {
    const address = getFactoryAddress();
    if (event.address != address)
        throw new Error(
            "factory address mismatch: got " +
                event.address.toHex() +
                ", expected " +
                address.toHex(),
        );

    const factory = new Factory(address);
    factory.owner = event.params.owner;
    factory.kpiTokensManager = getKPITokensManagerAddress();
    factory.oraclesManager = getOraclesManagerAddress();
    factory.feeReceiver = addressToBytes(event.params.feeReceiver);
    factory.kpiTokensAmount = BigInt.fromU32(0);
    factory.permissionless = false;
    factory.allowedCreators = [];
    factory.save();
}

export function handleOwnershipTransferred(
    event: OwnershipTransferredEvent,
): void {
    const factory = getFactory();
    factory.owner = event.params.newOwner;
    factory.save();
}

export function handleCreateToken(event: CreateTokenEvent): void {
    const factory = getFactory();
    KPITokenTemplate.create(event.params.token);
    factory.kpiTokensAmount = factory.kpiTokensAmount.plus(BI_1);
    factory.save();
}

export function handleSetPermissionless(event: SetPermissionlessEvent): void {
    const factory = getFactory();
    factory.permissionless = event.params.permissionless;
    factory.save();
}

export function handleUpdateCreatorAllowance(
    event: UpdateCreatorAllowanceEvent,
): void {
    const factory = getFactory();
    const creator = addressToBytes(event.params.creator);
    if (event.params.allowance) {
        factory.allowedCreators.push(creator);
    } else {
        const newAllowedCreators: Bytes[] = [];
        for (let i = 0; i < factory.allowedCreators.length; i++) {
            const allowedCreator = factory.allowedCreators[i];
            if (allowedCreator !== creator)
                newAllowedCreators.push(allowedCreator);
        }
        factory.allowedCreators = newAllowedCreators;
    }
    factory.save();
}

export function handleSetFeeReceiver(event: SetFeeReceiverEvent): void {
    const factory = getFactory();
    factory.feeReceiver = addressToBytes(event.params.feeReceiver);
    factory.save();
}

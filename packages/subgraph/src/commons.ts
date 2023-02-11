import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";

export const ADDRESS_ZERO = Address.fromHexString(
    "0x0000000000000000000000000000000000000000"
);
export const ADDRESS_ONE = Address.fromHexString(
    "0x0000000000000000000000000000000000000001"
);
export const BI_0 = BigInt.fromI32(0);
export const BI_1 = BigInt.fromI32(1);

export const CONTEXT_KEY_KPI_TOKENS_MANAGER_BYTES_ADDRESS =
    "KPI_TOKENS_MANAGER_BYTES_ADDRESS";
export const CONTEXT_KEY_ORACLES_MANAGER_BYTES_ADDRESS =
    "ORACLES_MANAGER_BYTES_ADDRESS";

export function addressToBytes(address: Address): Bytes {
    return Bytes.fromHexString(address.toHex());
}

export function bytesToAddress(bytes: Bytes): Address {
    return Address.fromBytes(bytes);
}

export function i32ToBytes(i32: i32): Bytes {
    return Bytes.fromI32(i32);
}

export function templateId(
    managerAddress: Address,
    onChainId: BigInt,
    onChainVersion: BigInt
): Bytes {
    return Bytes.fromHexString(
        managerAddress
            .toHex()
            .concat(onChainId.toHex().concat(onChainVersion.toHex()))
    );
}

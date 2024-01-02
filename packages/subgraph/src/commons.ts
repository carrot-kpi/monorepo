import { Address, BigInt, Bytes, dataSource } from "@graphprotocol/graph-ts";
import {
    GNOSIS_FACTORY_ADDRESS,
    GNOSIS_KPI_TOKENS_MANAGER_ADDRESS,
    GNOSIS_ORACLES_MANAGER_ADDRESS,
    MUMBAI_FACTORY_ADDRESS,
    MUMBAI_KPI_TOKENS_MANAGER_ADDRESS,
    MUMBAI_ORACLES_MANAGER_ADDRESS,
    SEPOLIA_FACTORY_ADDRESS,
    SEPOLIA_KPI_TOKENS_MANAGER_ADDRESS,
    SEPOLIA_ORACLES_MANAGER_ADDRESS,
} from "./gen/networks";

export const BI_0 = BigInt.fromI32(0);
export const BI_1 = BigInt.fromI32(1);

export function getFactoryAddress(): Bytes {
    const network = dataSource.network();
    if (network == "gnosis") return GNOSIS_FACTORY_ADDRESS;
    if (network == "sepolia") return SEPOLIA_FACTORY_ADDRESS;
    if (network == "mumbai") return MUMBAI_FACTORY_ADDRESS;
    throw new Error("no factory address for unsupported network " + network);
}

export function getKPITokensManagerAddress(): Bytes {
    const network = dataSource.network();
    if (network == "gnosis") return GNOSIS_KPI_TOKENS_MANAGER_ADDRESS;
    if (network == "sepolia") return SEPOLIA_KPI_TOKENS_MANAGER_ADDRESS;
    if (network == "mumbai") return MUMBAI_KPI_TOKENS_MANAGER_ADDRESS;
    throw new Error(
        "no kpi tokens manager address for unsupported network " + network,
    );
}

export function getOraclesManagerAddress(): Bytes {
    const network = dataSource.network();
    if (network == "gnosis") return GNOSIS_ORACLES_MANAGER_ADDRESS;
    if (network == "sepolia") return SEPOLIA_ORACLES_MANAGER_ADDRESS;
    if (network == "mumbai") return MUMBAI_ORACLES_MANAGER_ADDRESS;
    throw new Error(
        "no oracles manager address for unsupported network " + network,
    );
}

export function addressToBytes(address: Address): Bytes {
    return Bytes.fromHexString(address.toHex());
}

export function bytesToAddress(bytes: Bytes): Address {
    return Address.fromBytes(bytes);
}

export function i32ToBytes(i32: i32): Bytes {
    return Bytes.fromI32(i32);
}

export function templateId(onChainId: BigInt, onChainVersion: BigInt): Bytes {
    return Bytes.fromHexString(
        onChainId.toString().concat(onChainVersion.toString()),
    );
}

export function featureId(
    managerAddress: Bytes,
    templateId: BigInt,
    featureId: BigInt,
): Bytes {
    return managerAddress.concat(
        Bytes.fromHexString(
            templateId.toHexString().concat(featureId.toHexString()),
        ),
    );
}

export function allowedFeatureAccountId(
    featureId: Bytes,
    accountAddress: Address,
): Bytes {
    return featureId.concat(addressToBytes(accountAddress));
}

export function cidToSpecificationURI(cid: string): string {
    return cid.endsWith("/")
        ? cid.concat("base.json")
        : cid.concat("/base.json");
}

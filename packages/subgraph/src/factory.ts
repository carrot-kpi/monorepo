import { Address, BigInt, DataSourceContext } from "@graphprotocol/graph-ts";
import {
    CreateToken as CreateTokenEvent,
    Factory as FactoryContract,
    SetKpiTokensManager as SetKpiTokensManagerEvent,
    SetOraclesManager as SetOraclesManagerEvent,
    SetFeeReceiver as SetFeeReceiverEvent,
} from "../generated/Factory/Factory";
import { Factory } from "../generated/schema";
import {
    KPITokensManager as KPITokensManagerTemplate,
    OraclesManager as OraclesManagerTemplate,
    KPIToken as KPITokenTemplate,
} from "../generated/templates";
import {
    addressToBytes,
    ADDRESS_ONE,
    ADDRESS_ZERO,
    BI_1,
    CONTEXT_KEY_KPI_TOKENS_MANAGER_BYTES_ADDRESS,
    CONTEXT_KEY_ORACLES_MANAGER_BYTES_ADDRESS,
} from "./commons";
import { getKPITokensManager } from "./kpi-tokens-manager";
import { getOraclesManager } from "./oracles-manager";

function getFactory(address: Address): Factory {
    const id = addressToBytes(address);
    let factory = Factory.load(id);
    if (factory === null) {
        factory = new Factory(id);
        const factoryContract = FactoryContract.bind(address);
        factory.owner = factoryContract.owner();

        const kpiTokensManagerAddress = factoryContract.kpiTokensManager();
        if (
            !kpiTokensManagerAddress.equals(ADDRESS_ZERO) &&
            !kpiTokensManagerAddress.equals(ADDRESS_ONE)
        ) {
            KPITokensManagerTemplate.create(kpiTokensManagerAddress);
            const kpiTokensManager = getKPITokensManager(
                kpiTokensManagerAddress
            );
            kpiTokensManager.save();
        }
        factory.kpiTokensManager = addressToBytes(kpiTokensManagerAddress);

        const oraclesManagerAddress = factoryContract.oraclesManager();
        if (
            !oraclesManagerAddress.equals(ADDRESS_ZERO) &&
            !oraclesManagerAddress.equals(ADDRESS_ONE)
        ) {
            OraclesManagerTemplate.create(oraclesManagerAddress);
            const oraclesManager = getOraclesManager(oraclesManagerAddress);
            oraclesManager.save();
        }
        factory.oraclesManager = addressToBytes(oraclesManagerAddress);

        factory.feeReceiver = addressToBytes(factoryContract.feeReceiver());
        factory.kpiTokensAmount = BigInt.fromU32(0);
    }
    return factory;
}

export function handleCreateToken(event: CreateTokenEvent): void {
    const factory = getFactory(event.address);
    const context = new DataSourceContext();
    context.setBytes(
        CONTEXT_KEY_KPI_TOKENS_MANAGER_BYTES_ADDRESS,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        factory.kpiTokensManager!
    );
    context.setBytes(
        CONTEXT_KEY_ORACLES_MANAGER_BYTES_ADDRESS,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        factory.oraclesManager!
    );
    KPITokenTemplate.createWithContext(event.params.token, context);
    factory.kpiTokensAmount = factory.kpiTokensAmount.plus(BI_1);
    factory.save();
}

export function handleSetKPITokensManager(
    event: SetKpiTokensManagerEvent
): void {
    const factory = getFactory(event.address);
    const kpiTokensManagerAddress = event.params.kpiTokensManager;
    KPITokensManagerTemplate.create(kpiTokensManagerAddress);
    const kpiTokensManager = getKPITokensManager(kpiTokensManagerAddress);
    kpiTokensManager.save();
    factory.kpiTokensManager = addressToBytes(kpiTokensManagerAddress);
    factory.save();
}

export function handleSetOraclesManager(event: SetOraclesManagerEvent): void {
    const factory = getFactory(event.address);
    const oraclesManagerAddress = event.params.oraclesManager;
    OraclesManagerTemplate.create(oraclesManagerAddress);
    const oraclesManager = getOraclesManager(oraclesManagerAddress);
    oraclesManager.save();
    factory.oraclesManager = addressToBytes(oraclesManagerAddress);
    factory.save();
}

export function handleSetFeeReceiver(event: SetFeeReceiverEvent): void {
    const factory = getFactory(event.address);
    factory.feeReceiver = addressToBytes(event.params.feeReceiver);
    factory.save();
}

import { KPIToken } from "@carrot-kpi/sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { i18n } from "i18next";
import { NamespacedTranslateFunction } from "./components";

export interface BaseCreationFormProps {
    i18n: i18n;
    t: NamespacedTranslateFunction;
}

export interface OracleInitializationBundle {
    data: string;
    value: BigNumber;
}

export type OracleInitializationBundleGetter =
    () => Promise<OracleInitializationBundle>;

export type OracleChangeCallback<T> = (
    internalState: Partial<T>,
    initializationBundleGetter?: OracleInitializationBundleGetter
) => void;

export interface AdditionalOracleCreationFormProps<T> {
    state: Partial<T>;
    kpiToken?: Partial<KPIToken>;
    onChange: OracleChangeCallback<T>;
}

export type OracleCreationFormProps<T> = BaseCreationFormProps &
    AdditionalOracleCreationFormProps<T>;

export interface AdditionalKPITokenCreationFormProps {
    onCreate: () => void;
}

export type KPITokenCreationFormProps = BaseCreationFormProps &
    AdditionalKPITokenCreationFormProps;

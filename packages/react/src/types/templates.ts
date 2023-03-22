import { KPIToken, KPITokenWithData, OracleWithData } from "@carrot-kpi/sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { i18n } from "i18next";
import { NamespacedTranslateFunction } from "../components";
import { Tx, TxType } from "./transactions";
import { NavigateFunction } from "react-router-dom";

export interface BaseTemplateComponentProps {
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
    navigate: NavigateFunction;
    onTx: <T extends TxType>(tx: Tx<T>) => void;
}

export type OracleCreationFormProps<T> = BaseTemplateComponentProps &
    AdditionalOracleCreationFormProps<T>;

export interface AdditionalKPITokenCreationFormProps {
    onCreate: () => void;
    navigate: NavigateFunction;
    onTx: <T extends TxType>(tx: Tx<T>) => void;
}

export type KPITokenCreationFormProps = BaseTemplateComponentProps &
    AdditionalKPITokenCreationFormProps;

export interface AdditionalOraclePageProps {
    oracle?: OracleWithData | null;
    onTx: <T extends TxType>(tx: Tx<T>) => void;
}

export type OraclePageProps = BaseTemplateComponentProps &
    AdditionalOraclePageProps;

export interface AdditionalKPITokenPageProps {
    kpiToken?: KPITokenWithData | null;
    onTx: <T extends TxType>(tx: Tx<T>) => void;
}

export type KPITokenPageProps = BaseTemplateComponentProps &
    AdditionalKPITokenPageProps;

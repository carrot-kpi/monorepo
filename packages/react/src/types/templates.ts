import {
    KPIToken,
    ResolvedKPITokenWithData,
    ResolvedOracleWithData,
} from "@carrot-kpi/sdk";
import { BigNumber } from "@ethersproject/bignumber";
import { i18n } from "i18next";
import { NamespacedTranslateFunction } from "../components";
import { Tx, TxType } from "./transactions";
import { NavigateFunction } from "react-router-dom";
import { ResolvedTemplate } from "@carrot-kpi/sdk";
import { ReactElement, ReactNode } from "react";

export type TemplateEntity = "kpiToken" | "oracle";

export type TemplateType = "creationForm" | "page";

export interface BaseTemplateComponentProps {
    entity: TemplateEntity;
    type: TemplateType;
    template?: ResolvedTemplate;
    fallback: ReactNode;
    error: ReactElement;
    i18n: i18n;
    className?: { root?: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalProps?: any;
}

export type TemplateComponentProps = Omit<
    BaseTemplateComponentProps,
    "entity" | "type" | "additionalProps"
>;

export interface BaseRemoteTemplateComponentProps {
    i18n: i18n;
    template: ResolvedTemplate;
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

export interface AdditionalRemoteOracleCreationFormProps<T> {
    state: Partial<T>;
    kpiToken?: Partial<KPIToken>;
    onChange: OracleChangeCallback<T>;
    navigate: NavigateFunction;
    onTx: <T extends TxType>(tx: Tx<T>) => void;
}

export type OracleRemoteCreationFormProps<T> =
    BaseRemoteTemplateComponentProps &
        AdditionalRemoteOracleCreationFormProps<T>;

export type OracleCreationFormProps<S> = TemplateComponentProps &
    AdditionalRemoteOracleCreationFormProps<S>;

export interface AdditionalRemoteKPITokenCreationFormProps {
    onCreate: () => void;
    navigate: NavigateFunction;
    onTx: <T extends TxType>(tx: Tx<T>) => void;
}

export type KPITokenRemoteCreationFormProps = BaseRemoteTemplateComponentProps &
    AdditionalRemoteKPITokenCreationFormProps;

export type KPITokenCreationFormProps = TemplateComponentProps &
    AdditionalRemoteKPITokenCreationFormProps;

export interface AdditionalRemoteOraclePageProps {
    oracle?: ResolvedOracleWithData | null;
    kpiToken: ResolvedKPITokenWithData;
    onTx: <T extends TxType>(tx: Tx<T>) => void;
}

export type OracleRemotePageProps = BaseRemoteTemplateComponentProps &
    AdditionalRemoteOraclePageProps;

export type OraclePageProps = TemplateComponentProps &
    AdditionalRemoteOraclePageProps;

export interface AdditionalRemoteKPITokenPageProps {
    kpiToken?: ResolvedKPITokenWithData | null;
    onTx: <T extends TxType>(tx: Tx<T>) => void;
}

export type KPITokenRemotePageProps = BaseRemoteTemplateComponentProps &
    AdditionalRemoteKPITokenPageProps;

export type KPITokenPageProps = TemplateComponentProps &
    AdditionalRemoteKPITokenPageProps;

export type RemoteComponentProps<
    E extends TemplateEntity,
    T extends TemplateType
> = E extends "kpiToken"
    ? T extends "creationForm"
        ? KPITokenRemoteCreationFormProps
        : KPITokenRemotePageProps
    : E extends "oracle"
    ? T extends "creationForm"
        ? OracleRemoteCreationFormProps<unknown>
        : OracleRemotePageProps
    : never;

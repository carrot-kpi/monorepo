import {
    KPIToken,
    ResolvedKPITokenWithData,
    ResolvedOracleWithData,
} from "@carrot-kpi/sdk";
import type { i18n } from "i18next";
import type { NamespacedTranslateFunction } from "../components/template-component";
import { type Tx, TxType } from "./transactions";
import type { NavigateFunction } from "react-router-dom";
import { ResolvedTemplate } from "@carrot-kpi/sdk";
import type { ReactElement, ReactNode } from "react";
import type { Hex } from "viem";

export type Serializable =
    | null
    | string
    | number
    | boolean
    | { [key: string | symbol | number]: Serializable }
    | Serializable[];

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
    data: Hex;
    value: bigint;
}

export type OracleInitializationBundleGetter =
    () => Promise<OracleInitializationBundle>;

export type OracleChangeCallback<S extends Serializable = Serializable> = (
    internalState: S,
    initializationBundleGetter?: OracleInitializationBundleGetter,
) => void;

export interface AdditionalRemoteOracleCreationFormProps<
    S extends Serializable = Serializable,
> {
    state: S;
    kpiToken?: Partial<KPIToken>;
    onChange: OracleChangeCallback<S>;
    navigate: NavigateFunction;
    onTx: <T extends TxType>(tx: Tx<T>) => void;
}

export type OracleRemoteCreationFormProps<
    S extends Serializable = Serializable,
> = BaseRemoteTemplateComponentProps &
    AdditionalRemoteOracleCreationFormProps<S>;

export type KPITokenChangeCallback<S extends Serializable = Serializable> = (
    state: S,
) => void;

export type OracleCreationFormProps<S extends Serializable = Serializable> =
    TemplateComponentProps & AdditionalRemoteOracleCreationFormProps<S>;

export interface AdditionalRemoteKPITokenCreationFormProps<
    S extends Serializable = Serializable,
> {
    state: S;
    onChange: KPITokenChangeCallback<S>;
    onCreate: () => void;
    navigate: NavigateFunction;
    onTx: <T extends TxType>(tx: Tx<T>) => void;
}

export type KPITokenRemoteCreationFormProps<
    S extends Serializable = Serializable,
> = BaseRemoteTemplateComponentProps &
    AdditionalRemoteKPITokenCreationFormProps<S>;

export type KPITokenCreationFormProps<S extends Serializable = Serializable> =
    TemplateComponentProps & AdditionalRemoteKPITokenCreationFormProps<S>;

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
    T extends TemplateType,
    S extends Serializable = Serializable,
> = E extends "kpiToken"
    ? T extends "creationForm"
        ? KPITokenRemoteCreationFormProps<S>
        : KPITokenRemotePageProps
    : E extends "oracle"
    ? T extends "creationForm"
        ? OracleRemoteCreationFormProps<S>
        : OracleRemotePageProps
    : never;

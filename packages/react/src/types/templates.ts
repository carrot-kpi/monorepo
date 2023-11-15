import {
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

export type Serializable<T> = T extends
    | string
    | number
    | boolean
    | null
    | undefined
    ? T
    : T extends object
      ? { [K in keyof T]: Serializable<T[K]> }
      : T extends Array<infer U>
        ? Array<Serializable<U>>
        : never;

export type SerializableObject<T extends object> = {
    [K in keyof T]: Serializable<T[K]>;
};

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

export type TemplateComponentStateUpdater<S extends SerializableObject<S>> = (
    previousState: S,
) => S;

export type TemplateComponentStateChangeCallback<
    S extends SerializableObject<S>,
> = (stateOrUpdater: S | TemplateComponentStateUpdater<S>) => void;

export interface OracleInitializationBundle {
    data: Hex;
    value: bigint;
}

export type OracleInitializationBundleGetter =
    () => Promise<OracleInitializationBundle>;

export type OracleInitializationBundleGetterChangeCallback = (
    initializationBundleGetter?: OracleInitializationBundleGetter,
) => void;

export type OracleSuggestedExpirationTimestampChangeCallback = (
    suggestedExpirationDate?: number,
) => void;

export type AdditionalRemoteOracleCreationFormProps<
    S extends SerializableObject<S>,
> = {
    state: S;
    onStateChange: TemplateComponentStateChangeCallback<S>;
    onInitializationBundleGetterChange: OracleInitializationBundleGetterChangeCallback;
    onSuggestedExpirationTimestampChange: OracleSuggestedExpirationTimestampChangeCallback;
    navigate: NavigateFunction;
    onTx: <T extends TxType>(tx: Tx<T>) => void;
};

export type OracleRemoteCreationFormProps<S extends SerializableObject<S>> =
    BaseRemoteTemplateComponentProps &
        AdditionalRemoteOracleCreationFormProps<S>;

export type OracleCreationFormProps<S extends SerializableObject<S>> =
    TemplateComponentProps & AdditionalRemoteOracleCreationFormProps<S>;

export type AdditionalRemoteKPITokenCreationFormProps<
    S extends SerializableObject<S>,
> = {
    state: S;
    onStateChange: TemplateComponentStateChangeCallback<S>;
    onCreate: () => void;
    navigate: NavigateFunction;
    onTx: <T extends TxType>(tx: Tx<T>) => void;
};

export type KPITokenRemoteCreationFormProps<S extends SerializableObject<S>> =
    BaseRemoteTemplateComponentProps &
        AdditionalRemoteKPITokenCreationFormProps<S>;

export type KPITokenCreationFormProps<S extends SerializableObject<S>> =
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
    S extends SerializableObject<S>,
> = E extends "kpiToken"
    ? T extends "creationForm"
        ? KPITokenRemoteCreationFormProps<S>
        : KPITokenRemotePageProps
    : E extends "oracle"
      ? T extends "creationForm"
          ? OracleRemoteCreationFormProps<S>
          : OracleRemotePageProps
      : never;

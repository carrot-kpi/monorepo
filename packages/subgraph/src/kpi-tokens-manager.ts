import { Address, BigInt, Bytes, log, store } from "@graphprotocol/graph-ts";
import {
    Initialize as InitializeEvent,
    AddTemplate as AddTemplateEvent,
    OwnershipTransferred as OwnershipTransferredEvent,
    RemoveTemplate as RemoveTemplateEvent,
    UpdateTemplateSpecification as UpdateTemplateSpecificationEvent,
    UpgradeTemplate as UpgradeTemplateEvent,
    SetFeatureSetOwner as SetFeatureSetOwnerEvent,
    EnableFeatureFor as EnableFeatureForEvent,
    DisableFeatureFor as DisableFeatureForEvent,
    PauseFeature as PauseFeatureEvent,
    UnpauseFeature as UnpauseFeatureEvent,
} from "../generated/KPITokensManager/KPITokensManager";
import {
    KPITokensManager,
    KPITokenTemplate,
    KPITokenTemplateFeature,
    KPITokenTemplateFeatureAllowedAccount,
    KPITokenTemplateSet,
} from "../generated/schema";
import {
    addressToBytes,
    allowedFeatureAccountId,
    BI_0,
    BI_1,
    bytesToAddress,
    cidToSpecificationURI,
    featureId,
    getKPITokensManagerAddress,
    i32ToBytes,
    templateId,
} from "./commons";
import { KPITokenTemplateSpecification } from "../generated/templates";

function cidToSpecification(cid: string): Bytes {
    const specificationBaseJSONCid = cidToSpecificationURI(cid);
    KPITokenTemplateSpecification.create(specificationBaseJSONCid);
    return Bytes.fromUTF8(specificationBaseJSONCid);
}

function createTemplate(
    id: BigInt,
    version: BigInt,
    address: Address,
    specificationCid: string,
): KPITokenTemplate | null {
    const manager = getKPITokensManager();
    manager.save();

    const template = new KPITokenTemplate(templateId(id, version));
    template.address = address;
    template.managerId = id;
    template.version = version;
    template.specificationCid = specificationCid;
    template.specification = cidToSpecification(specificationCid);
    template.templateSet = getTemplateSet(id).id;

    return template;
}

function getTemplateSet(managerId: BigInt): KPITokenTemplateSet {
    const kpiTokensManager = getKPITokensManager();
    const managerAddress = bytesToAddress(kpiTokensManager.id);
    const id = addressToBytes(managerAddress).concat(
        i32ToBytes(managerId.toI32()),
    );
    let templateSet = KPITokenTemplateSet.load(id);
    if (templateSet == null) {
        templateSet = new KPITokenTemplateSet(id);
        templateSet.manager = addressToBytes(managerAddress);
        templateSet.managerId = managerId;
        templateSet.active = true;
        templateSet.featuresOwner = kpiTokensManager.owner;
        templateSet.save();
    }
    return templateSet;
}

export function getTemplate(
    id: BigInt,
    version: BigInt,
): KPITokenTemplate | null {
    return KPITokenTemplate.load(templateId(id, version));
}

function getTemplateFeature(
    templateId: BigInt,
    onChainFeatureId: BigInt,
): KPITokenTemplateFeature {
    const id = featureId(
        getKPITokensManager().id,
        templateId,
        onChainFeatureId,
    );
    let feature = KPITokenTemplateFeature.load(id);
    if (feature == null) {
        feature = new KPITokenTemplateFeature(id);
        feature.featureId = onChainFeatureId;
        feature.paused = false;

        const templateSet = getTemplateSet(templateId);
        if (templateSet === null)
            throw new Error(
                "could not find template set for id " + templateId.toHex(),
            );

        feature.templateSet = templateSet.id;
        feature.save();
    }
    return feature;
}

export function getKPITokensManager(): KPITokensManager {
    const address = getKPITokensManagerAddress();
    const manager = KPITokensManager.load(address);
    if (manager === null)
        throw new Error(
            "could not find kpi tokens manager with address " + address.toHex(),
        );
    return manager;
}

export function handleInitialize(event: InitializeEvent): void {
    const address = getKPITokensManagerAddress();
    if (event.address != address)
        throw new Error(
            "kpi tokens manager address mismatch: got " +
                event.address.toHex() +
                ", expected " +
                address.toHex(),
        );

    const manager = new KPITokensManager(address);
    manager.owner = event.params.owner;
    manager.templatesAmount = BI_0;
    manager.save();
}

export function handleAddTemplate(event: AddTemplateEvent): void {
    const template = createTemplate(
        event.params.id,
        BI_1,
        event.params.template,
        event.params.specification,
    );
    if (template === null) {
        log.error("could not create template with id {}", [
            event.params.id.toString(),
        ]);
        return;
    }
    template.save();

    const manager = getKPITokensManager();
    manager.templatesAmount = manager.templatesAmount.plus(BI_1);
    manager.save();
}

export function handleOwnershipTransferred(
    event: OwnershipTransferredEvent,
): void {
    const manager = getKPITokensManager();
    manager.owner = event.params.newOwner;
    manager.save();
}

export function handleRemoveTemplate(event: RemoveTemplateEvent): void {
    const templateSet = getTemplateSet(event.params.id);
    if (templateSet === null) {
        log.error("could not find removed template set with id {}", [
            event.params.id.toString(),
        ]);
        return;
    }
    templateSet.active = false;
    templateSet.save();

    const manager = getKPITokensManager();
    manager.templatesAmount = manager.templatesAmount.minus(BI_1);
    manager.save();
}

export function handleUpdateTemplateSpecification(
    event: UpdateTemplateSpecificationEvent,
): void {
    const template = getTemplate(event.params.id, event.params.version);
    if (template === null) {
        log.error("could not find updated template with id {} and version", [
            event.params.id.toString(),
            event.params.version.toString(),
        ]);
        return;
    }
    template.specificationCid = event.params.newSpecification;
    template.specification = cidToSpecification(event.params.newSpecification);
    template.save();
}

export function handleUpgradeTemplate(event: UpgradeTemplateEvent): void {
    const newTemplate = createTemplate(
        event.params.id,
        event.params.newVersion,
        event.params.newTemplate,
        event.params.newSpecification,
    );
    if (newTemplate === null) {
        log.error(
            "could not create upgraded template with id {} and version {}",
            [event.params.id.toString(), event.params.newVersion.toString()],
        );
        return;
    }
    newTemplate.save();
}

export function handleSetFeatureSetOwner(event: SetFeatureSetOwnerEvent): void {
    const templateSet = getTemplateSet(event.params.templateId);
    templateSet.featuresOwner = event.params.owner;
    templateSet.save();
}

export function handleEnableFeatureFor(event: EnableFeatureForEvent): void {
    const feature = getTemplateFeature(
        event.params.templateId,
        event.params.featureId,
    );

    const accountId = allowedFeatureAccountId(feature.id, event.params.account);
    let allowed = KPITokenTemplateFeatureAllowedAccount.load(accountId);
    if (allowed !== null) {
        log.warning(
            "tried to double enable feature with id {} on template with id {} for user {}",
            [
                event.params.featureId.toString(),
                templateId.toString(),
                event.params.account.toString(),
            ],
        );
        return;
    }

    allowed = new KPITokenTemplateFeatureAllowedAccount(accountId);
    allowed.feature = feature.id;
    allowed.address = addressToBytes(event.params.account);
    allowed.save();
}

export function handleDisableFeatureFor(event: DisableFeatureForEvent): void {
    const feature = getTemplateFeature(
        event.params.templateId,
        event.params.featureId,
    );
    const accountId = allowedFeatureAccountId(feature.id, event.params.account);
    if (KPITokenTemplateFeatureAllowedAccount.load(accountId) === null) {
        log.warning(
            "tried to disable feature with id {} on template with id {} for user {} that did not have the feature enabled in the first place",
            [
                event.params.featureId.toString(),
                templateId.toString(),
                event.params.account.toString(),
            ],
        );
        return;
    }

    store.remove("KPITokenTemplateFeatureAllowedAccount", accountId.toString());
}

export function handlePauseFeature(event: PauseFeatureEvent): void {
    const feature = getTemplateFeature(
        event.params.templateId,
        event.params.featureId,
    );
    feature.paused = true;
    feature.save();
}

export function handleUnpauseFeature(event: UnpauseFeatureEvent): void {
    const feature = getTemplateFeature(
        event.params.templateId,
        event.params.featureId,
    );
    feature.paused = false;
    feature.save();
}

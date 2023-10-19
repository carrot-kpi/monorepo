import { Bytes, dataSource, json, log } from "@graphprotocol/graph-ts";
import {
    KPITokenDescription,
    KPITokenTemplateSpecification,
    OracleTemplateSpecification,
} from "../generated/schema";

export function handleKPITokenTemplateSpecification(content: Bytes): void {
    const cid = dataSource.stringParam();
    const templateSpecification = new KPITokenTemplateSpecification(
        Bytes.fromUTF8(cid),
    );
    const specificationObject = json.fromBytes(content).toObject();

    const commitHash = specificationObject.get("commitHash");
    if (commitHash === null)
        log.warning("commit hash is null for cid {}", [cid]);
    else templateSpecification.commitHash = commitHash.toString();

    const name = specificationObject.get("name");
    if (name === null) log.warning("name is null for cid {}", [cid]);
    else templateSpecification.name = name.toString();

    const description = specificationObject.get("description");
    if (description === null)
        log.warning("description is null for cid {}", [cid]);
    else templateSpecification.description = description.toString();

    const tags = specificationObject.get("tags");
    if (tags === null) log.warning("tags is null for cid {}", [cid]);
    else {
        const tagsArray = tags.toArray();
        const convertedTagsArray: string[] = [];
        for (let i = 0; i < tagsArray.length; i++) {
            convertedTagsArray.push(tagsArray[i].toString());
        }
        templateSpecification.tags = convertedTagsArray;
    }

    const repository = specificationObject.get("repository");
    if (repository === null)
        log.warning("repository is null for cid {}", [cid]);
    else templateSpecification.repository = repository.toString();

    templateSpecification.save();
}

export function handleOracleTemplateSpecification(content: Bytes): void {
    const cid = dataSource.stringParam();
    const templateSpecification = new OracleTemplateSpecification(
        Bytes.fromUTF8(cid),
    );
    const specificationObject = json.fromBytes(content).toObject();

    const commitHash = specificationObject.get("commitHash");
    if (commitHash === null)
        log.warning("commit hash is null for cid {}", [cid]);
    else templateSpecification.commitHash = commitHash.toString();

    const name = specificationObject.get("name");
    if (name === null) log.warning("name is null for cid {}", [cid]);
    else templateSpecification.name = name.toString();

    const description = specificationObject.get("description");
    if (description === null)
        log.warning("description is null for cid {}", [cid]);
    else templateSpecification.description = description.toString();

    const tags = specificationObject.get("tags");
    if (tags === null) log.warning("tags is null for cid {}", [cid]);
    else {
        const tagsArray = tags.toArray();
        const convertedTagsArray: string[] = [];
        for (let i = 0; i < tagsArray.length; i++) {
            convertedTagsArray.push(tagsArray[i].toString());
        }
        templateSpecification.tags = convertedTagsArray;
    }

    const repository = specificationObject.get("repository");
    if (repository === null)
        log.warning("repository is null for cid {}", [cid]);
    else templateSpecification.repository = repository.toString();

    templateSpecification.save();
}

export function handleKPITokenDescription(content: Bytes): void {
    const cid = dataSource.stringParam();
    const kpiTokenDescription = new KPITokenDescription(Bytes.fromUTF8(cid));
    const descriptionObject = json.fromBytes(content).toObject();

    const title = descriptionObject.get("title");
    if (title === null) log.warning("title is null for cid {}", [cid]);
    else kpiTokenDescription.title = title.toString();

    const description = descriptionObject.get("description");
    if (description === null)
        log.warning("description is null for cid {}", [cid]);
    else kpiTokenDescription.description = description.toString();

    const tags = descriptionObject.get("tags");
    if (tags === null) log.warning("tags is null for cid {}", [cid]);
    else {
        const tagsArray = tags.toArray();
        const convertedTagsArray: string[] = [];
        for (let i = 0; i < tagsArray.length; i++) {
            convertedTagsArray.push(tagsArray[i].toString());
        }
        kpiTokenDescription.tags = convertedTagsArray;
    }

    kpiTokenDescription.save();
}

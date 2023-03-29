export const generateGroupId = (group: string, id: number | string) =>
    `${group}-${id}`;

export const getHtmlDataAttributeAddress = (element: HTMLInputElement) => {
    const id = element.dataset.address;

    if (id !== undefined) {
        return id.toString();
    }
    return "";
};

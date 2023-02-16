import sanitizeHTML from "sanitize-html";

export const getCleanMarkdown = (raw: string) => {
    const cleanHTML = sanitizeHTML(raw);
    const element = document.createElement("div");
    element.innerHTML = cleanHTML;
    if (element.childElementCount > 1) return cleanHTML;
    return element.firstElementChild
        ? element.firstElementChild.innerHTML
        : cleanHTML;
};

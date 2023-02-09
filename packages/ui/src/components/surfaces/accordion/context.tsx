import { createContext, useContext } from "react";

interface AccordionContextShape {
    toggle: (event: React.MouseEvent) => void;
    expanded: boolean;
}

const AccordionContext = createContext<AccordionContextShape>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggle: () => {},
    expanded: false,
});

export const AccordionContextProvider = AccordionContext.Provider;

export const useAccordionContext = () => useContext(AccordionContext);

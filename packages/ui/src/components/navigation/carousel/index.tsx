import React, { ReactElement, ReactNode, useMemo } from "react";
import { useSpringCarousel } from "react-spring-carousel";
import { ButtonProps } from "../../input";
import { cva } from "class-variance-authority";
import { SlideButton } from "./slide-button";

const rootStyles = cva(["cui-w-full", "cui-relative"], {
    variants: {
        disabled: { true: ["cui-pointer-events-none"] },
    },
});

const carouselWrapperStyles = cva([
    "cui-w-full",
    "[&>.use-spring-carousel-main-wrapper]:cui-scrollbar-hidden",
]);

const buttonsWrapperStyles = cva([
    "cui-hidden cui-absolute md:cui-flex",
    "cui-top-1/2 -cui-translate-y-1/2",
    "cui-w-full",
    "cui-justify-between",
    "cui-px-[80px]",
]);

const itemWrapperStyles = cva([], {
    variants: {
        active: { false: ["cui-opacity-25", "cui-pointer-events-none"] },
        first: { true: ["md:cui-pl-[80px]"] },
        last: { true: ["md:cui-pr-[80px]"] },
    },
});

const ITEMS_THRESHOLD_FOR_SLIDER_BUTTONS = 4;

export interface CarouselProps {
    children: ReactNode;
    gutter?: number;
    showSlideButtons?: boolean;
    disabled?: boolean;
    className?: {
        root?: string;
        carouselWrapper?: string;
        buttonsWrapper?: string;
        slideNextButton?: ButtonProps["className"];
        slidePrevButton?: ButtonProps["className"];
    };
}

export const Carousel = ({
    children,
    gutter = 16,
    showSlideButtons,
    disabled,
    className,
}: CarouselProps): ReactElement => {
    const childItems = useMemo(
        () => React.Children.toArray(children),
        [children]
    );
    const itemsCount = useMemo(() => childItems.length, [childItems.length]);
    const derivedShowSlideButtons = useMemo(() => {
        if (showSlideButtons !== undefined)
            return (
                showSlideButtons &&
                itemsCount > ITEMS_THRESHOLD_FOR_SLIDER_BUTTONS
            );
        return itemsCount > ITEMS_THRESHOLD_FOR_SLIDER_BUTTONS;
    }, [showSlideButtons, itemsCount]);

    const { carouselFragment, slideToPrevItem, slideToNextItem } =
        useSpringCarousel({
            gutter,
            slideType: "fluid",
            freeScroll: true,
            enableFreeScrollDrag: true,
            ...(disabled ? { disableGestures: true } : {}),
            items: childItems.map((item, key) => ({
                id: key.toString(),
                renderItem: (
                    <div
                        className={itemWrapperStyles({
                            active: true,
                            first: key === 0,
                            last: key === childItems.length - 1,
                        })}
                    >
                        {item}
                    </div>
                ),
            })),
        });

    return (
        <div className={rootStyles({ className: className?.root, disabled })}>
            <div
                className={carouselWrapperStyles({
                    className: className?.carouselWrapper,
                })}
            >
                {carouselFragment}
            </div>
            {derivedShowSlideButtons && (
                <div
                    className={buttonsWrapperStyles({
                        className: className?.buttonsWrapper,
                    })}
                >
                    <SlideButton
                        disabled={disabled}
                        onClick={slideToPrevItem}
                        direction="left"
                    />
                    <SlideButton
                        disabled={disabled}
                        onClick={slideToNextItem}
                        direction="right"
                    />
                </div>
            )}
        </div>
    );
};

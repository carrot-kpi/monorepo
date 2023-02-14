import React, {
    ReactElement,
    ReactNode,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useSpringCarousel } from "react-spring-carousel";
import { ButtonProps } from "../../input";
import { cva } from "class-variance-authority";
import { SlideButton } from "./slide-button";

const rootStyles = cva(["cui-w-full", "cui-relative"]);

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
    className,
}: CarouselProps): ReactElement => {
    const [freeScroll, setFreeScroll] = useState<boolean>(true);

    const childItems = useMemo(
        () => React.Children.toArray(children),
        [children]
    );
    const itemsCount = useMemo(() => childItems.length, [childItems.length]);

    // disable freeScroll on mobile since it causes issues with the enableFreeScrollDrag
    useEffect(() => {
        const adaptItemsPerSlide = () => {
            if (window.innerWidth < 700) {
                setFreeScroll(false);
                return;
            }

            setFreeScroll(true);
        };

        adaptItemsPerSlide();
        window.addEventListener("resize", adaptItemsPerSlide);

        return () => {
            window.removeEventListener("resize", adaptItemsPerSlide);
        };
    }, []);

    const { carouselFragment, slideToPrevItem, slideToNextItem } =
        useSpringCarousel({
            gutter,
            slideType: "fluid",
            freeScroll,
            enableFreeScrollDrag: true,
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
        <div className={rootStyles({ className: className?.root })}>
            <div
                className={carouselWrapperStyles({
                    className: className?.carouselWrapper,
                })}
            >
                {carouselFragment}
            </div>
            {showSlideButtons !== undefined
                ? showSlideButtons
                : itemsCount > ITEMS_THRESHOLD_FOR_SLIDER_BUTTONS && (
                      <div
                          className={buttonsWrapperStyles({
                              className: className?.buttonsWrapper,
                          })}
                      >
                          <SlideButton
                              onClick={slideToPrevItem}
                              direction="left"
                          />
                          <SlideButton
                              onClick={slideToNextItem}
                              direction="right"
                          />
                      </div>
                  )}
        </div>
    );
};

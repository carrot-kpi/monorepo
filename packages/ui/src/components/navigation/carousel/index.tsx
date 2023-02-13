import React, {
    ReactElement,
    ReactNode,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useSpringCarousel } from "react-spring-carousel";
import { Button, ButtonProps } from "../../input";
import { ReactComponent as ChrevonUp } from "../../../assets/chevron-up.svg";
import { cva } from "class-variance-authority";

const rootStyles = cva(["cui-relative", "cui-overflow-x-hidden"]);

const carouselWrapperStyles = cva(["md:cui-px-24"]);

const buttonsWrapperStyles = cva([
    "cui-hidden cui-absolute md:cui-flex",
    "cui-top-1/3",
    "cui-w-full",
    "cui-justify-between",
    "cui-px-3",
]);

const itemWrapperStyles = cva(
    ["cui-w-full", "cui-transition-opacity", "cui-duration-500"],
    {
        variants: {
            active: { false: ["cui-opacity-25", "cui-pointer-events-none"] },
        },
    }
);

export interface CarouselProps {
    children: ReactNode;
    itemsPerSlide?: number;
    gutter?: number;
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
    itemsPerSlide = 1,
    gutter = 16,
    className,
}: CarouselProps): ReactElement => {
    const [activeItem, setActiveItem] = useState<number>(0);
    const [finalItemsPerSlide, setFinalItemsPerSlide] = useState<number>(1);

    const childItems = useMemo(
        () => React.Children.toArray(children),
        [children]
    );
    const itemsCount = useMemo(() => childItems.length, [childItems.length]);
    const derivedItemsPerSlide = useMemo(
        () => (itemsPerSlide > itemsCount ? 1 : itemsPerSlide),
        [itemsPerSlide, itemsCount]
    );

    useEffect(() => {
        const adaptItemsPerSlide = () => {
            if (window.innerWidth < 700) {
                setFinalItemsPerSlide(1);
                return;
            }

            setFinalItemsPerSlide(derivedItemsPerSlide);
        };

        adaptItemsPerSlide();
        window.addEventListener("resize", adaptItemsPerSlide);

        return () => {
            window.removeEventListener("resize", adaptItemsPerSlide);
        };
    }, [derivedItemsPerSlide, itemsCount]);

    const {
        carouselFragment,
        slideToPrevItem,
        slideToNextItem,
        useListenToCustomEvent,
        getCurrentActiveItem,
    } = useSpringCarousel({
        gutter,
        itemsPerSlide: finalItemsPerSlide,
        items: childItems.map((item, key) => ({
            id: key.toString(),
            renderItem: (
                <div
                    className={itemWrapperStyles({
                        active:
                            key >= activeItem &&
                            key <= activeItem + itemsPerSlide - 1,
                    })}
                >
                    {item}
                </div>
            ),
        })),
    });

    useListenToCustomEvent((event) => {
        if (event.eventName === "onSlideStartChange") {
            setActiveItem(getCurrentActiveItem().index);
        }
    });

    console.log({ itemsCount, activeItem, finalItemsPerSlide });

    return (
        <div className={rootStyles({ className: className?.root })}>
            <div
                className={carouselWrapperStyles({
                    className: className?.carouselWrapper,
                })}
            >
                {carouselFragment}
            </div>
            {itemsCount !== finalItemsPerSlide && (
                <div
                    className={buttonsWrapperStyles({
                        className: className?.buttonsWrapper,
                    })}
                >
                    <Button
                        size="small"
                        icon={ChrevonUp}
                        disabled={activeItem === 0}
                        onClick={slideToPrevItem}
                        className={{
                            ...className?.slidePrevButton,
                            icon: "-cui-rotate-90",
                        }}
                    />
                    <Button
                        size="small"
                        icon={ChrevonUp}
                        disabled={
                            activeItem + finalItemsPerSlide === itemsCount
                        }
                        onClick={slideToNextItem}
                        className={{
                            ...className?.slideNextButton,
                            icon: "cui-rotate-90",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

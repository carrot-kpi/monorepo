import React, {
    ReactElement,
    useState,
    useRef,
    MutableRefObject,
    ReactNode,
    useMemo,
    useLayoutEffect,
    DOMAttributes,
} from "react";
import { register } from "swiper/element/bundle";
import { SwiperOptions } from "swiper/types";
import { SwiperRef } from "swiper/react";
import { SlideButton } from "./slide-button";
import { cva } from "class-variance-authority";

// register swiper custom elements
register();

const rootStyles = cva(["cui-relative"]);

const sliderButtonsWrapperStyles = cva(["cui-hidden", "md:cui-flex"]);

export interface SwiperCarouselProps {
    children: ReactNode | ReactNode[];
    className?: {
        root?: string;
        sliderButtonsWrapper?: string;
    };
}

type CustomElement<T> = Partial<
    T &
        DOMAttributes<T> & {
            children: ReactNode;
            ref: MutableRefObject<unknown>;
            key: string | number;
        }
>;

// typing definition for the swiper web components
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            ["swiper-container"]: CustomElement<SwiperOptions>;
            ["swiper-slide"]: CustomElement<unknown>;
        }
    }
}

export const SwiperCarousel = ({
    children,
    className,
}: SwiperCarouselProps): ReactElement => {
    const [progress, setProgress] = useState<number>(0);

    const swiperElRef = useRef<unknown>(null);
    const childItems = useMemo(
        () => React.Children.toArray(children),
        [children]
    );

    useLayoutEffect(() => {
        (swiperElRef as MutableRefObject<HTMLElement>).current.addEventListener(
            "progress",
            (event: unknown) => {
                const [, progress] = (event as { detail: [unknown, number] })
                    .detail;
                setProgress(progress);
            }
        );
    }, []);

    // update the swiper configuration. The swiper configuration needs to be updated manually
    // by editing the object of the swiper element and then by calling initialize(); this is needed
    // because passing the config directly as attributes to the swiper-container is not working properly.
    useLayoutEffect(() => {
        const swiperEl = (swiperElRef as MutableRefObject<HTMLElement>)
            .current as unknown as Required<
            SwiperOptions & { initialize: () => void }
        >;

        // assign all parameters to swiper element
        Object.assign<SwiperOptions, object>(swiperEl, {
            // TODO: should me make this customizable by props?
            // navigation: false,
            freeMode: true,
            mousewheel: true,
            slidesPerView: 1,
            spaceBetween: 10,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    freeMode: false,
                    grabCursor: true,
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    freeMode: false,
                    grabCursor: true,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                    freeMode: false,
                    grabCursor: true,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    freeMode: true,
                    mousewheel: true,
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    freeMode: true,
                    mousewheel: true,
                },
                1420: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                    freeMode: true,
                    mousewheel: true,
                },
            },
        });

        // initialize swiper element
        swiperEl.initialize();
    }, []);

    return (
        <div className={rootStyles({ className: className?.root })}>
            <div
                className={sliderButtonsWrapperStyles({
                    className: className?.sliderButtonsWrapper,
                })}
            >
                <SlideButton
                    className={{
                        root: "cui-absolute cui-top-1/2 -cui-translate-y-1/2 cui-z-10",
                    }}
                    visible={progress > 0}
                    onClick={() =>
                        (
                            swiperElRef as MutableRefObject<SwiperRef>
                        ).current?.swiper.slidePrev()
                    }
                    direction="left"
                />
                <SlideButton
                    onClick={() =>
                        (
                            swiperElRef as MutableRefObject<SwiperRef>
                        ).current?.swiper.slideNext()
                    }
                    direction="right"
                    visible={progress < 1}
                    className={{
                        root: "cui-absolute cui-top-1/2 cui-right-0 -cui-translate-y-1/2 cui-z-10",
                    }}
                />
            </div>
            <swiper-container
                ref={swiperElRef}
                init={false}
                navigation={false}
                slides-per-view={5}
                space-between={40}
            >
                {childItems.map((childItem, index) => (
                    <swiper-slide key={index.toString()}>
                        {childItem}
                    </swiper-slide>
                ))}
            </swiper-container>
        </div>
    );
};

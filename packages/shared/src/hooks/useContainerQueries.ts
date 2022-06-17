import { RefCallback, useCallback, useLayoutEffect, useRef, useState } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import { TailwindConfig } from 'tailwindcss/tailwind-config.js';

export type QueryBreakpoints = {
    [key: string]: [number, number?];
};

export type ContainerQueryProps = {
    breakpoints?: QueryBreakpoints;
    tailwindConfig?: TailwindConfig;
};

export type ContainerQueryResult<T> = {
    containerRef: RefCallback<T>;
    activeBreakpoint: string;
};

type ContainerQueryState = {
    activeBreakpoint: string;
    width: number;
};

type TailwindBreakpoints = { sm: string; md: string; lg: string; xl: string; '2xl': string };

export function useContainerQueries<T extends HTMLElement>({
    breakpoints,
    tailwindConfig,
}: ContainerQueryProps): ContainerQueryResult<T> {
    if (tailwindConfig) {
        const fullConfig = resolveConfig(tailwindConfig);
        const { sm, md, lg, xl } = fullConfig.theme.screens as TailwindBreakpoints;
        const parsedSm = parseInt(sm);
        const parsedMd = parseInt(md);
        const parsedLg = parseInt(lg);
        const parsedXl = parseInt(xl);

        breakpoints = {
            sm: [0, parsedSm],
            md: [parsedSm + 1, parsedMd],
            lg: [parsedMd + 1, parsedLg],
            xl: [parsedLg + 1, parsedXl],
            '2xl': [parsedXl + 1],
        };
    }

    if (!breakpoints) {
        breakpoints = {
            sm: [0, 300],
            md: [301, 600],
            lg: [601, 900],
            xl: [901],
        };
    }

    const initialBreakpoint = Object.keys(breakpoints)[0];
    const [state, setState] = useState<ContainerQueryState>({
        activeBreakpoint: initialBreakpoint,
        width: 0,
    });

    const observerRef = useRef<ResizeObserver | null>(null);
    const elementRef = useRef<T | null>(null);

    const matchBreakpoint = useCallback(
        (prevActive: string, width: number) => {
            let currentActive;
            for (const [key, [min, max]] of Object.entries(breakpoints || [])) {
                if (width >= min) {
                    if (max === undefined) {
                        currentActive = key;
                        break;
                    } else if (width <= max) {
                        currentActive = key;
                        break;
                    }
                }
            }

            return {
                activeBreakpoint: currentActive || prevActive,
                width,
            };
        },
        [breakpoints]
    );

    const handleResize = useCallback(
        ([entry]: readonly ResizeObserverEntry[]) => {
            const width = Math.round(entry.contentRect.width);
            const { activeBreakpoint } = matchBreakpoint(state.activeBreakpoint, width);

            if (activeBreakpoint !== state.activeBreakpoint) {
                setState((prev) => ({ ...prev, activeBreakpoint }));
            }
        },
        [state.activeBreakpoint, matchBreakpoint]
    );

    useLayoutEffect(() => {
        if (!observerRef.current) {
            observerRef.current = new ResizeObserver(handleResize);
        }

        if (elementRef.current) {
            observerRef.current.observe(elementRef.current, {
                box: 'border-box',
            });
        }

        return () => {
            observerRef.current?.disconnect();
            observerRef.current = null;
        };
    }, [handleResize]);

    const assignRef = useCallback((node: T | null) => {
        if (elementRef.current) {
            observerRef.current?.unobserve(elementRef.current);
        }

        elementRef.current = node;
        if (node) {
            observerRef.current?.observe(node);
        }
    }, []);

    return {
        containerRef: assignRef,
        activeBreakpoint: state.activeBreakpoint,
    } as const;
}

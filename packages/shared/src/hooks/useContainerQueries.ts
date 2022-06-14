import { RefCallback, useCallback, useLayoutEffect, useRef, useState } from 'react';

export type QueryBreakpoints = {
    [key: string]: [number, number?];
};

export type ContainerQueryProps = {
    breakpoints: QueryBreakpoints;
};

export type ContainerQueryResult<T> = {
    ref: RefCallback<T>;
    active: string;
};

type ContainerQueryState = {
    activeBreakpoint: string;
    width: number;
};

export function useContainerQueries<T extends HTMLElement>({
    breakpoints,
}: ContainerQueryProps): ContainerQueryResult<T> {
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
            for (const [key, [min, max]] of Object.entries(breakpoints)) {
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
        ref: assignRef,
        active: state.activeBreakpoint,
    } as const;
}

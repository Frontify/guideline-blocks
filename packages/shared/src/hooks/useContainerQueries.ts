import { RefCallback, useCallback, useLayoutEffect, useRef, useState } from 'react';

export type QueryBreakpoints = {
    [key: string]: [number, number?];
};

export type ContainerQueryProps = {
    breakpoints?: QueryBreakpoints;
};

export type ContainerQueryResult<T> = {
    containerRef: RefCallback<T>;
    activeBreakpoint: string;
};

type ContainerQueryState = {
    activeBreakpoint: string;
    width: number;
};

const defaultBreakpoints: QueryBreakpoints = {
    sm: [0, 640],
    md: [641, 768],
    lg: [769, 1024],
    xl: [1025],
};

export function useContainerQueries<T extends HTMLElement>({
    breakpoints,
}: ContainerQueryProps): ContainerQueryResult<T> {
    if (!breakpoints) {
        breakpoints = defaultBreakpoints;
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
                /* setTimeout is required to prevent error "ResizeObserver loop limit exceeded" 
                from being thrown during cypress component tests */
                setTimeout(() => setState((prev) => ({ ...prev, activeBreakpoint })), 0);
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

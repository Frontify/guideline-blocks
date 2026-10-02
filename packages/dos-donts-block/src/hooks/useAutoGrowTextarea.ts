/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useLayoutEffect } from 'react';

export const supportsFieldSizing = (): boolean =>
    typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('field-sizing', 'content');

const registered = new Set<HTMLTextAreaElement>();
const pending = new Set<HTMLTextAreaElement>();
let frameId: number | null = null;

const flush = () => {
    frameId = null;
    const textareas = [...pending].filter((textarea) => textarea.isConnected);
    pending.clear();

    // Write, then read, then write, so all textareas share a single layout pass.
    for (const textarea of textareas) {
        textarea.style.height = 'auto';
    }
    const heights = textareas.map((textarea) => textarea.scrollHeight + textarea.offsetHeight - textarea.clientHeight);
    for (const [index, textarea] of textareas.entries()) {
        textarea.style.height = `${heights[index]}px`;
    }
};

const scheduleMeasure = (textarea: HTMLTextAreaElement) => {
    pending.add(textarea);
    frameId ??= requestAnimationFrame(flush);
};

const onWindowResize = () => {
    for (const textarea of registered) {
        scheduleMeasure(textarea);
    }
};

const register = (textarea: HTMLTextAreaElement) => {
    if (registered.size === 0) {
        window.addEventListener('resize', onWindowResize);
    }
    registered.add(textarea);
};

const unregister = (textarea: HTMLTextAreaElement) => {
    registered.delete(textarea);
    pending.delete(textarea);
    if (registered.size === 0) {
        window.removeEventListener('resize', onWindowResize);
        if (frameId !== null) {
            cancelAnimationFrame(frameId);
            frameId = null;
        }
    }
};

/**
 * Grows a textarea with its content. Where CSS `field-sizing: content` is supported the
 * textarea's own styles handle it and this hook does nothing; otherwise all registered
 * textareas are measured together in one batched animation frame.
 */
export const useAutoGrowTextarea = (ref: RefObject<HTMLTextAreaElement>, value: string, enabled: boolean) => {
    useLayoutEffect(() => {
        const textarea = ref.current;
        if (!enabled || !textarea || supportsFieldSizing()) {
            return;
        }

        register(textarea);
        return () => unregister(textarea);
    }, [ref, enabled]);

    useLayoutEffect(() => {
        const textarea = ref.current;
        if (enabled && textarea && registered.has(textarea)) {
            scheduleMeasure(textarea);
        }
    }, [ref, value, enabled]);
};

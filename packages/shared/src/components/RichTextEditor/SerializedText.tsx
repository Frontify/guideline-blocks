/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useMemo, useState } from 'react';

import { serializeRawToHtml } from '@frontify/fondue';
import { SerializedTextProps } from './types';

export const SerializedText = ({ value = '', designTokens, gap, columns, show = true }: SerializedTextProps) => {
    const [html, setHtml] = useState<string | null>(null);

    const serializedText = useMemo(async () => {
        return await serializeRawToHtml(value, designTokens, columns, gap);
    }, [value, designTokens, columns, gap]);

    useEffect(() => {
        (async () => {
            setHtml(await serializedText);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serializedText]);

    if (!show || html === '<br />') {
        return null;
    }

    return html !== null ? (
        <div data-test-id="rte-content-html" dangerouslySetInnerHTML={{ __html: html }} />
    ) : (
        <div className="tw-rounded-sm tw-bg-base-alt tw-animate-pulse tw-h-full tw-min-h-[10px] tw-w-full" />
    );
};

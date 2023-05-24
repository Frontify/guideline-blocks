/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';
import { serializeRawToHtmlAsync } from '@frontify/fondue';
import { SerializedTextProps } from './types';

export const SerializedText = ({ value = '', gap, columns, show = true }: SerializedTextProps) => {
    const [html, setHtml] = useState<string | null>(null);
    useEffect(() => {
        (async () => {
            setHtml(await serializeRawToHtmlAsync(value, columns, gap));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, columns, gap]);

    if (!show || html === '<br />') {
        return null;
    }

    return html !== null ? (
        <div data-test-id="rte-content-html" dangerouslySetInnerHTML={{ __html: html }} />
    ) : (
        <div className="tw-rounded-sm tw-bg-base-alt tw-animate-pulse tw-h-full tw-min-h-[10px] tw-w-full" />
    );
};

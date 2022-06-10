/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties, useEffect, useState } from 'react';
import { mapToGuidelineDesignTokens } from '../helpers/mapToGuidelineDesignTokens';

export enum DesignTokenPropertiesEnum {
    family = 'family',
    weight = 'weight',
    size = 'size',
    letterspacing = 'letterspacing',
    line_height = 'line_height',
    margin_top = 'margin_top',
    margin_bottom = 'margin_bottom',
    uppercase = 'uppercase',
    italic = 'italic',
    underline = 'underline',
    color = 'color',
}

export type DesignTokenName =
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'custom1'
    | 'custom2'
    | 'custom3'
    | 'body'
    | 'link'
    | 'quote';
export type DesignTokenProperties = Partial<Record<DesignTokenPropertiesEnum, string>>;
export type DesignTokens = Partial<Record<DesignTokenName, DesignTokenProperties>>;
export type DesignTokenApiResponse = {
    hub: {
        appearance: DesignTokens;
    };
};
export type TransformedDesignTokens = Partial<Record<DesignTokenName, CSSProperties>>;

export const useGuidelineDesignTokens = () => {
    const [styleCategories, setStyleCategories] = useState<TransformedDesignTokens | null>(null);
    const [error, setError] = useState<null | unknown>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const requestParams = {
        hubId: document.body.getAttribute('data-hub'),
        documentId: document.body.getAttribute('data-document'),
    };

    const url = `${window.location.origin}/api/hub/settings/${requestParams.hubId}/${requestParams.documentId}`;

    useEffect(() => {
        window.emitter.on('HubAppearanceUpdated', (data) => {
            const transformedCategories = mapToGuidelineDesignTokens(data.appearance);
            setStyleCategories({ ...styleCategories, ...transformedCategories });
        });

        (async () => {
            try {
                setIsLoading(true);
                const response = await window.fetch(url);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const json = await response.json();
                const transformedCategories = mapToGuidelineDesignTokens(json.hub.appearance);
                setStyleCategories(transformedCategories);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        })();

        return () => {
            window.emitter.off('HubAppearanceUpdated');
        };
    }, []);

    return { styleCategories, error, isLoading };
};

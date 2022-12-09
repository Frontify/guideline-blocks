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
    background_color = 'background_color',
    background_color_hover = 'background_color_hover',
    border_color = 'border_color',
    border_color_hover = 'border_color_hover',
    border_radius = 'border_radius',
    border_width = 'border_width',
    color_hover = 'color_hover',
    frame = 'frame',
    callout = 'callout',
    info = 'info',
    note = 'note',
    tip = 'tip',
    warning = 'warning',
}

export type DesignTokenName =
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'custom1'
    | 'custom2'
    | 'custom3'
    | 'p'
    | 'link'
    | 'quote'
    | 'buttonPrimary'
    | 'buttonSecondary'
    | 'buttonTertiary'
    | 'callout'
    | 'imageCaption';

export type DirectionalCssProperties = {
    top: string;
    right: string;
    bottom: string;
    left: string;
};

export type AccentColorProperties = {
    info: string;
    note: string;
    tip: string;
    warning: string;
};

export type DesignTokenProperties = Partial<
    Record<DesignTokenPropertiesEnum, string | DirectionalCssProperties> | AccentColorProperties
>;
export type DesignTokens = Partial<Record<DesignTokenName, DesignTokenProperties>>;
export type DesignTokenApiResponse = {
    hub: {
        appearance: DesignTokens;
    };
};

export type TokenValues = CSSProperties & { hover?: CSSProperties } & Partial<AccentColorProperties>;
export type TransformedDesignTokens = Partial<Record<DesignTokenName, TokenValues>>;

export const useGuidelineDesignTokens = () => {
    const [designTokens, setDesignTokens] = useState<TransformedDesignTokens | null>(null);
    const [error, setError] = useState<null | unknown>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const requestParams = {
        hubId: document.body.getAttribute('data-hub'),
        documentId: document.body.getAttribute('data-document'),
    };

    const url = `${window.location.origin}/api/hub/settings/${requestParams.hubId}/${requestParams.documentId}`;

    useEffect(() => {
        window.emitter.on('HubAppearanceUpdated', (data) => {
            const transformedDesignTokens = mapToGuidelineDesignTokens(data.appearance);
            setDesignTokens({ ...designTokens, ...transformedDesignTokens });
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
                setDesignTokens(transformedCategories);
            } catch (error_) {
                setError(error_);
            } finally {
                setIsLoading(false);
            }
        })();

        return () => {
            window.emitter.off('HubAppearanceUpdated');
        };
    }, []);

    return { designTokens, error, isLoading };
};

/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties, useEffect, useState } from 'react';
import { provideFallbackTokens } from '../helpers';

export type ApiAppearanceData = Partial<Record<ApiDesignTokenName, ApiProperties>>;
export type HubSettingsApiResponse = {
    hub: {
        appearance: ApiAppearanceData;
    };
};

export type ApiDesignTokenName =
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
    | 'imageTitle'
    | 'imageCaption'
    | 'callout'
    | 'buttonPrimary'
    | 'buttonSecondary'
    | 'buttonTertiary'
    | 'mainFont';

export type CalloutColors = {
    info: string;
    note: string;
    tip: string;
    warning: string;
};

export type ButtonHoverProperties = {
    backgroundColor?: string;
    borderColor?: string;
    color?: string;
};

export type ApiProperties = {
    family?: string;
    weight?: string;
    size?: string;
    letterspacing?: string;
    line_height?: string;
    margin_top?: string;
    margin_bottom?: string;
    uppercase?: string;
    italic?: string;
    underline?: string;
    color?: string;
    background_color?: string;
    background_color_hover?: string;
    border_color?: string;
    border_color_hover?: string;
    border_radius?: string;
    border_width?: string;
    color_hover?: string;
    frame?: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
    };
    hover?: {
        background_color?: string;
        border_color?: string;
        color?: string;
    };
} & Partial<CalloutColors>;

export type DesignTokens = {
    heading1: CSSProperties;
    heading2: CSSProperties;
    heading3: CSSProperties;
    heading4: CSSProperties;
    custom1: CSSProperties;
    custom2: CSSProperties;
    custom3: CSSProperties;
    p: CSSProperties;
    link: CSSProperties;
    quote: CSSProperties;
    imageTitle: CSSProperties;
    imageCaption: CSSProperties;
    callout: CalloutColors;
    buttonPrimary: CSSProperties & { hover?: CSSProperties };
    buttonSecondary: CSSProperties & { hover?: CSSProperties };
    buttonTertiary: CSSProperties & { hover?: CSSProperties };
};

type useGuidelineDesignTokensResponse = {
    designTokens: DesignTokens | null;
    error: null | unknown;
    isLoading: boolean;
};

export const useGuidelineDesignTokens = (): useGuidelineDesignTokensResponse => {
    const [designTokens, setDesignTokens] = useState<DesignTokens | null>(null);
    const [error, setError] = useState<null | unknown>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const requestParams = {
        hubId: document.body.getAttribute('data-hub'),
        documentId: document.body.getAttribute('data-document'),
    };

    const url = `${window.location.origin}/api/hub/settings/${requestParams.hubId}/${requestParams.documentId}`;

    useEffect(() => {
        window.emitter.on('HubAppearanceUpdated', (data) => {
            const transformedDesignTokens = provideFallbackTokens(data.appearance);
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
                const transformedCategories = provideFallbackTokens(json.hub.appearance);
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

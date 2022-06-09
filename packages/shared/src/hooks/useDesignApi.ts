/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties, useEffect, useState } from 'react';
import { useDesignApiTransformer } from './useDesignApiTransformer';

export enum DesignApiPropertiesEnum {
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

export type StyleName =
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
export type DesignApiProperties = Partial<Record<DesignApiPropertiesEnum, string>>;
export type StyleCategories = Partial<Record<StyleName, DesignApiProperties>>;
export type DesignApiResponse = {
    hub: {
        appearance: StyleCategories;
    };
};
export type StyleCategoriesTransformed = Partial<Record<StyleName, CSSProperties>>;

export const useDesignApi = () => {
    const [styleCategories, setStyleCategories] = useState<StyleCategoriesTransformed | null>(null);
    const [error, setError] = useState<null | unknown>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const requestParams = {
        hubId: document.body.getAttribute('data-hub'),
        documentId: document.body.getAttribute('data-document'),
    };

    const url = `/api/hub/settings/${requestParams.hubId}/${requestParams.documentId}`;

    useEffect(() => {
        window.emitter.on('HubAppearanceUpdated', (data) => {
            const transformedCategories = useDesignApiTransformer(data.appearance);
            setStyleCategories({ ...styleCategories, ...transformedCategories });
        });

        (async () => {
            try {
                setIsLoading(true);
                const response = await fetch(url);
                const json = await response.json();
                const transformedCategories = useDesignApiTransformer(json.hub.appearance);
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

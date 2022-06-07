import { useEffect, useState } from 'react';
import { useDesignApiTransformer } from './useDesignApiTransformer';

export interface DesignApiResponse<T> {
    hub: {
        appearance: StyleCategories<T>;
    };
}

export interface StyleCategories<T> {
    heading1?: T;
    heading2?: T;
    heading3?: T;
    heading4?: T;
    custom1?: T;
    custom2?: T;
    custom3?: T;
    body?: T;
    link?: T;
    quote?: T;
}

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

export type DesignApiProperties = {
    [key in DesignApiPropertiesEnum]: string;
};

export const useDesignApi = () => {
    const [styleCategories, setStyleCategories] = useState<StyleCategories<React.CSSProperties> | null>(null);
    const [error, setError] = useState<null | unknown>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const requestParams = {
        hubId: document.body.getAttribute('data-hub'),
        documentId: document.body.getAttribute('data-document'),
    };

    const url = `/api/hub/settings/${requestParams.hubId}/${requestParams.documentId}`;

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await fetch(url);
                const json = await response.json();
                const transformedCategories = useDesignApiTransformer(json);
                setStyleCategories(transformedCategories);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { styleCategories, error, isLoading };
};
